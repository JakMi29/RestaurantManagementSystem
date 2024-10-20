import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { IconButton } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import EditOffIcon from '@mui/icons-material/EditOff';
import classes from '../../pages/restaurant/RestaurantPage.module.css';
import MessageContext from '../../store/MessageContext';
import { orderActions } from '../../store/OrderSlice';
import { orderMealActions } from '../../store/EditOrderSlice';
import OrderMeal from './OrderMeal';
import { editOrder, updateOrder,changeOrderStatus } from '../../api/OrderApi';

function sortMeals(meals) {
    const statusOrder = ['PREPARING', 'READY', 'RELEASED'];
    return meals.slice().sort((a, b) => {
        const statusComparison = statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status);
        if (statusComparison !== 0) return statusComparison;
        return a.meal.name.localeCompare(b.meal.name);
    });
}

function Order({ order, admin }) {
    const dispatch = useDispatch();
    const messageCtx = useContext(MessageContext);
    const navigate = useNavigate();
    const [navigatePath, setNavigatePath] = useState(null);
    const isDisabled = order.edit ? order.editor.email !== localStorage.getItem("email") : false;
    const mealsToDisplay = order.edit ? sortMeals(order.meals) : order.meals;

    useEffect(() => {
        if (navigatePath) {
            navigate(navigatePath);
            setNavigatePath(null);
        }
    }, [navigatePath, navigate]);

    const handleEditAndAddMeals = () => {
        const editorEmail = localStorage.getItem('email');
        editOrder(order.number, true, editorEmail)
            .then(response => {
                if (response.ok) {
                    navigate(`/restaurant/orderMeals?number=${order.number}&category=soup&pageNumber=0&pageSize=12`);
                } else {
                    messageCtx.showMessage('Something went wrong', 'error');
                }
            })
            .catch(error => console.error('Error sending request:', error));
    };

    const handleChange = () => {
        const editorEmail = localStorage.getItem('email');
        editOrder(order.number, !order.edit, editorEmail)
            .then(response => response.ok ? response.json() : Promise.reject())
            .then(data => {
                if (order.edit) {
                    dispatch(orderActions.revertChanges({ number: data.number }));
                }
            })
            .catch(error => console.error('Error sending request:', error));
    };

    const handleAddMeals = () => {
        dispatch(orderMealActions.addMeals({ meals: order.meals, price: order.price }));
        navigate(`/restaurant/orderMeals?number=${order.number}&category=soup&pageNumber=0&pageSize=12`);
    };

    const handleUpdateOrder = () => {
        updateOrder(order)
            .then(response => response.ok ? response.json() : Promise.reject())
            .then(() => messageCtx.showMessage('Successfully updated order'))
            .catch(error => console.error('Error sending request:', error));
    };

    const handleChangeStatus = () => {
        changeOrderStatus(order.number)
            .then(response => response.ok ? response.json() : Promise.reject())
            .then(() => messageCtx.showMessage('Successfully updated order status'))
            .catch(error => console.error('Error sending request:', error));
    };

    return (
        <>
            {order && (
                <>
                    <div className={classes.customers}>
                        <p style={{ margin: "5px" }}>Customers</p>
                        {order.edit && !isDisabled ? (
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
                        ) : (
                            order.customerQuantity
                        )}
                    </div>

                    {order.meals && order.meals.length > 0 ? (
                        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "175px" }}>
                            <div className={classes.mealsContainer}>
                                {mealsToDisplay.map(orderMeal => (
                                    <OrderMeal
                                        key={orderMeal.name}
                                        orderNumber={order.number}
                                        orderMeal={orderMeal}
                                        edit={order.edit && !isDisabled}
                                        admin={admin}
                                    />
                                ))}
                            </div>
                            {order.edit && <button className={classes.addMore} onClick={handleAddMeals}>Add more</button>}
                            <div className={classes.customers}>
                                <p style={{ margin: "5px" }}>Total cost</p>
                                <>{order.price.toFixed(2)} USD</>
                            </div>
                        </div>
                    ) : (
                        <div className={classes.imageContainer}>
                            {!isDisabled && (
                                <IconButton onClick={order.edit ? handleAddMeals : handleEditAndAddMeals}>
                                    <AddShoppingCartIcon sx={{ fontSize: "90px" }} className={classes.iconButton} />
                                </IconButton>
                            )}
                        </div>
                    )}

                    {!admin && (
                        <div className={classes.actions}>
                            <button
                                disabled={!order.edit && order.status !== 'RELEASED'}
                                className={classes.greenButton}
                                onClick={order.edit ? handleUpdateOrder : handleChangeStatus}>
                                {order.edit && !isDisabled ? 'Ok' : 'Paid'}
                            </button>
                            <button className={classes.blueButton} onClick={handleChange}>
                                {order.edit && !isDisabled ? 'Cancel' : 'Edit'}
                            </button>
                        </div>
                    )}

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
