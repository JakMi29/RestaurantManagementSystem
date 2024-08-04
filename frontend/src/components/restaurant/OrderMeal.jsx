import { useNavigate } from 'react-router-dom';
import classes from '../../pages/restaurant/RestaurantPage.module.css';
import MessageContext from '../../store/MessageContext';
import { useContext } from 'react';


function OrderMeal({ orderMeal, orderNumber, edit }) {
    const messageCtx = useContext(MessageContext);
    const navigate = useNavigate();
    let content;

    const handleChangeOrderMealStatus = () => {
        fetch(`http://localhost:8080/api/admin/order?mealName=${orderMeal.meal.name}&restaurantName=${"Italiano"}&orderNumber=${orderNumber}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                if (response.ok) {
                    messageCtx.showMessage('Meal was added as meal of the day', 'info')
                    navigate(`/restaurant`)
                } else {
                    messageCtx.showMessage('Something gone wrong', 'error')
                }
            })
            .catch(error => {
                console.error('Wystąpił błąd podczas wysyłania żądania:', error);
            }); ł
    }

    {
        edit ?
            content = (
                <div className={classes.orderMeal}>
                    {orderMeal.meal.name}
                    <div className={classes.orderMealActions}>
                        <button className={classes.redButton}>-</button>
                        {orderMeal.quantity}
                        <button className={classes.greenButton} >+</button>
                    </div>
                </div>
            )
            :
            content = (
                <div className={classes.orderMeal}>
                    {orderMeal.meal.name} : {orderMeal.quantity}
                    {orderMeal.status === 'PREPARING' && <button onClick={handleChangeOrderMealStatus} className={classes.greenButton}>Complete</button>}
                    {orderMeal.status === 'READY' && <button onClick={handleChangeOrderMealStatus} className={classes.greenButton}>Ready</button>}
                    {orderMeal.status === 'RELEASED' && <button onClick={handleChangeOrderMealStatus} className={classes.blueButton} disabled={true}>Released</button>}
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