import { useNavigate } from 'react-router-dom';
import classes from '../../pages/restaurant/RestaurantPage.module.css';
import MessageContext from '../../store/MessageContext';
import { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { orderActions } from '../../store/OrderSlice';
import { getAuthToken } from '../../util/auth';


function OrderMeal({ orderMeal, orderNumber, edit,admin }) {
    const dispatch = useDispatch();
    const messageCtx = useContext(MessageContext);
    const navigate = useNavigate();
    let content;

    const handleChangeOrderMealStatus = () => {
        fetch(`http://localhost:8080/api/restaurantManagementSystem/order/waiter/meal?mealName=${orderMeal.meal.name}&restaurantName=${"Italiano"}&orderNumber=${orderNumber}&status=${orderMeal.status}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + getAuthToken()
            },
        })
            .then(response => {
                if (!response.ok){
                    messageCtx.showMessage('Something gone wrong', 'error')
                }
            })
            .catch(error => {
                console.error('Wystąpił błąd podczas wysyłania żądania:', error);
            });
    }

    function getOrderMealButton(disabled) {
        switch (orderMeal.status) {
            case 'PREPARING':
                return (
                    <button onClick={handleChangeOrderMealStatus} className={classes.greenButton} disabled={disabled}>
                        {admin?'Preaparing':'Complete'}
                    </button>
                );
            case 'READY':
                return (
                    <button onClick={handleChangeOrderMealStatus} className={classes.greenButton} disabled={disabled}>
                          {admin?'Ready':'Release'}
                    </button>
                );
            case 'RELEASED':
                return (
                    <button className={classes.blueButton} disabled={true}>
                        {'Released'}
                    </button>
                );
            default:
                return null;
        }
    }

    {
        edit ?
            content = (
                <div className={classes.orderMeal}>
                    {orderMeal.meal.name}
                    <div className={classes.orderMealActions}>
                        {orderMeal.status === 'PREPARING' ?
                            <>
                                <button
                                    className={classes.redButton}
                                    onClick={() => dispatch(orderActions.decreaseOrderMealQuantity({ number: orderNumber, mealName: orderMeal.meal.name }))}
                                >-</button>
                                {orderMeal.quantity}
                                <button
                                    className={classes.greenButton}
                                    onClick={() => dispatch(orderActions.increaseOrderMealQuantity({ number: orderNumber, mealName: orderMeal.meal.name }))}
                                >+</button>
                            </> :
                            <>
                                <button className={classes.blueButton} disabled={true}>{orderMeal.quantity}</button>
                                {getOrderMealButton(true)}
                                <button onClick={() => dispatch(orderActions.increaseOrderMealQuantity({ number: orderNumber, mealName: orderMeal.meal.name }))} className={classes.greenButton}>+</button>
                            </>
                        }
                    </div>
                </div>
            ):
            content = (
                <div className={classes.orderMeal}>
                    {orderMeal.meal.name}
                    <div className={classes.orderMealActions}>
                        <button className={classes.blueButton} disabled={true}>{orderMeal.quantity}</button>
                        {getOrderMealButton(admin?true:false)}
                    </div>
                </div>
            )
    }

    return (
        <>
            {content}
        </>
    );
}

export default OrderMeal;