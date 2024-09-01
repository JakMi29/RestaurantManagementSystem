import { useNavigate } from 'react-router-dom';
import classes from '../../pages/restaurant/RestaurantPage.module.css';
import MessageContext from '../../store/MessageContext';
import { useContext, useEffect, useState } from 'react';
import OrderMeal from './OrderMeal';
import { orderActions } from '../../store/order-slice';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useDispatch } from 'react-redux';
import EditOffIcon from '@mui/icons-material/EditOff';
import { orderMealActions } from '../../store/edit-order-slice';
import { getAuthToken } from '../../util/auth';

function sortMeals(meals) {
    const statusOrder = ['PREPARING', 'READY', 'RELEASED'];

    return meals.slice().sort((a, b) => {
        const statusComparison = statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status);
        if (statusComparison !== 0) return statusComparison;

        return a.meal.name.localeCompare(b.meal.name);
    });
};

function Order({ order }) {
    const dispatch = useDispatch();
    const messageCtx = useContext(MessageContext);
    const navigate = useNavigate();
    const isDisabled = order.edit ? order.editor.email !== localStorage.getItem("email") : false
    const mealsToDisplay = order.edit ? sortMeals(order.meals) : order.meals;
    const [navigatePath, setNavigatePath] = useState(null);

    useEffect(() => {
        if (navigatePath) {
            navigate(navigatePath);
            setNavigatePath(null);
        }
    }, [navigatePath, navigate]);

    const handleChange = () => {
        if (order.edit) {
            fetch(`http://localhost:8080/api/admin/order/edit?orderNumber=${order.number}&editor=${localStorage.getItem('email')}&edit=${false}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        messageCtx.showMessage('Something went wrong', 'error');
                    }
                })
                .then(data => {
                    dispatch(orderActions.revertChanges({ number: data.number }));
                })
                .catch(error => {
                    console.error('Error sending request:', error);
                });
        } else {
            fetch(`http://localhost:8080/api/admin/order/edit?orderNumber=${order.number}&editor=${localStorage.getItem('email')}&edit=${true}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        messageCtx.showMessage('Something went wrong', 'error');
                    }
                })
                .then(data => {
                    // dispatch(orderActions.editOrder({ order: data }));
                })
                .catch(error => {
                    console.error('Error sending request:', error);
                });
        }
    };
    const handleAddMeals = () => {
        dispatch(orderMealActions.addMeals({ meals: order.meals, price: order.price }));
        navigate(`/restaurant/orderMeals?number=${order.number}&category=soup&pageNumber=0&pageSize=12`)
    }

    const handleUpdateOrder = () => {
        const token = getAuthToken();
        fetch(`http://localhost:8080/api/admin/order/update`, {
            method: 'PUT',
            body: JSON.stringify(order),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    messageCtx.showMessage('Something went wrong', 'error');
                }
            })
            .then(
                messageCtx.showMessage('Successfuly update order')
            )
            .catch(error => {
                console.error('Error sending request:', error);
            });
    }

    const handleChangeStatus = (status) => {
        const token = getAuthToken();
        fetch(`http://localhost:8080/api/admin/order/status?orderNumber=${order.number}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    messageCtx.showMessage('Something went wrong', 'error');
                }
            })
            .then(
                messageCtx.showMessage('Successfuly update order')
            )
            .catch(error => {
                console.error('Error sending request:', error);
            });
    }

    return (
        <>
            {order && (
                <>
                    <div className={classes.customers}>
                        {order.edit && !isDisabled ? (
                            <>
                                <p>Customers</p>
                                <div className={classes.orderMealActions}>
                                    <button className={classes.redButton}
                                        onClick={() => dispatch(orderActions.decreaseCustomers({ number: order.number }))}>
                                        -
                                    </button>
                                    {order.customerQuantity}
                                    <button className={classes.greenButton}
                                        onClick={() => dispatch(orderActions.increaseCustomers({ number: order.number }))}>
                                        +
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <p>Customers</p>
                                {order.customerQuantity}
                            </>
                        )}
                    </div>
                    {order.meals && order.meals.length > 0 ? (
                        <>
                            <div style={{ display: "flex", flexDirection: "column" }}>
                                <div className={classes.mealsContainer}>
                                    {mealsToDisplay.map(orderMeal => (
                                        <OrderMeal
                                            key={orderMeal.name}
                                            orderNumber={order.number}
                                            orderMeal={orderMeal}
                                            edit={order.edit && !isDisabled}
                                        />
                                    ))}
                                </div>
                                {order.edit && <button
                                    className={classes.addMore}
                                    onClick={handleAddMeals}
                                >Add more</button>}
                            </div>
                            <div className={classes.customers}>
                                <>
                                    <p>Total cost</p>
                                    <>{order.price.toFixed(2)} USD</>
                                </>
                            </div>
                        </>
                    ) : (
                        <div className={classes.imageContainer}>
                            {!isDisabled && (
                                <AddShoppingCartIcon
                                    sx={{ fontSize: "90px" }}
                                    className={classes.iconButton}
                                    onClick={handleAddMeals}
                                />
                            )}
                        </div>
                    )}
                    <div className={classes.actions}>
                        <button
                            disabled={order.edit ? false : order.status !== 'RELEASED'}
                            className={classes.greenButton}
                            onClick={order.edit ? handleUpdateOrder : handleChangeStatus}>
                            {order.edit && !isDisabled ? 'Ok' : 'Paid'}
                        </button>
                        <button
                            onClick={handleChange}
                            className={classes.blueButton}>
                            {order.edit && !isDisabled ? 'Cancel' : 'Edit'}
                        </button>
                    </div>
                    {isDisabled && (
                        <div className={classes.overlay}>
                            <EditOffIcon sx={{ fontSize: "80px", color: "rgb(60, 60, 211, 0.2)" }} />
                        </div>
                    )}
                </>
            )}
        </>
    );
}

export default Order;