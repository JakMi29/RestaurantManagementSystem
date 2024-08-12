import { useNavigate } from 'react-router-dom';
import classes from '../../pages/restaurant/RestaurantPage.module.css';
import MessageContext from '../../store/MessageContext';
import { useContext, useEffect, useState } from 'react';
import OrderMeal from './OrderMeal';
import { orderActions } from '../../store/order-slice';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useDispatch } from 'react-redux';
import { Button, IconButton } from '@mui/material';


function Order({ order }) {
    const dispatch = useDispatch();
    const messageCtx = useContext(MessageContext);
    const navigate = useNavigate();

    const [navigatePath, setNavigatePath] = useState(null);

    useEffect(() => {
        if (navigatePath) {
            navigate(navigatePath);
            setNavigatePath(null);
        }
    }, [navigatePath, navigate]);

    const handleChange = () => {
        if (order.edit) {
            fetch(`http://localhost:8080/api/admin/order/edit?orderNumber=${order.number}`, {
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
            fetch(`http://localhost:8080/api/admin/order/edit?orderNumber=${order.number}`, {
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

    return (
        <>
            {order && (
                <>
                    <div className={classes.customers}>
                        {order.edit ? (
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
                                    {order.meals.map(orderMeal => (
                                        <OrderMeal
                                            key={orderMeal.name}
                                            orderNumber={order.number}
                                            orderMeal={orderMeal}
                                            edit={order.edit}
                                        />
                                    ))}
                                </div>
                                <button className={classes.addMore} onClick={() => setNavigatePath(`/restaurant/orderMeals?category=soup&pageNumber=0&pageSize=10`)}
                                >Add more</button>
                            </div>
                            <div className={classes.customers}>
                                <>
                                    <p>Total cost</p> {order.price}
                                </>
                            </div>
                        </>
                    ) : (
                        <div className={classes.imageContainer}>
                            <AddShoppingCartIcon
                                sx={{ fontSize: "90px" }}
                                className={classes.iconButton}
                                onClick={() => setNavigatePath(`/restaurant/orderMeals?category=soup&pageNumber=0&pageSize=10`)}
                            />
                        </div>
                    )}
                    <div className={classes.actions}>
                        <button
                            className={classes.greenButton}
                            disabled={order.status !== 'RELEASED'}>
                            {order.edit ? 'Ok' : 'Paid'}
                        </button>
                        <button
                            onClick={handleChange}
                            className={classes.blueButton}>
                            {order.edit ? 'Cancel' : 'Edit'}
                        </button>
                    </div>
                </>
            )}
        </>
    );
}

export default Order;