import { useNavigate } from 'react-router-dom';
import classes from '../../pages/restaurant/RestaurantPage.module.css';
import MessageContext from '../../store/MessageContext';
import { useContext, useState } from 'react';
import OrderMeal from './OrderMeal';
import { getAuthToken } from '../../util/auth';


function Order({ order, tableName }) {
    const messageCtx = useContext(MessageContext);
    const navigate = useNavigate();
    const [edit, setEdit] = useState(false)


    const handleChangeStatus = () => {
        const token=getAuthToken();
        fetch(`http://localhost:8080/api/restaurantManagementSystem/table/waiter?tableName=${tableName}&restaurantName=${"Italiano"}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
        })
            .then(response => {
                if (!response.ok) {
                    messageCtx.showMessage('Something went wrong', 'error');
                }
            })
            .catch(error => {
                console.error('An error occurred while sending the request:', error);
            });
    };

    const handleChange = () => {
        setEdit(prev => !prev)
    }


    return (
        <>
            {order && (
                <>
                    <div >
                        {edit ? (
                            <div className={classes.orderMeal}>
                                Customers:
                                <div className={classes.orderMealActions}>
                                    <button className={classes.redButton}>-</button>
                                    {order.customers}
                                    <button className={classes.greenButton}>+</button>
                                </div>
                            </div>
                        ) : (
                            <p>Customers: {order.customers}</p>
                        )}
                    </div>
                    <div className={classes.mealsContainer}>
                        {order.meals && order.meals.length > 0 && (
                            order.meals.map(orderMeal => (
                                <OrderMeal key={orderMeal.name} orderNumber={order.number} orderMeal={orderMeal} edit={edit} />
                            ))
                        )}
                    </div>
                    <p>Total cost: {order.price}</p>
                    <div className={classes.actions}>
                        <button
                            onClick={handleChangeStatus}
                            className={classes.greenButton}
                            disabled={order.status !== 'RELEASED'}>
                            {edit ? 'Ok' : 'Paid'}
                        </button>
                        <button
                            onClick={handleChange}
                            className={classes.blueButton}>
                            {edit ? 'Cancel' : 'Edit'}
                        </button>
                    </div>
                </>
            )}
        </>
    );
}

export default Order;