import { useNavigate } from 'react-router-dom';
import classes from '../../pages/restaurant/RestaurantPage.module.css';
import MessageContext from '../../store/MessageContext';
import { useContext, useState } from 'react';
import OrderMeal from './OrderMeal';


function Order({ order }) {
    const messageCtx = useContext(MessageContext);
    const navigate = useNavigate();
    const [edit, setEdit] = useState(false)
    let content;
    const handleChangeStatus = () => {
        fetch(`http://localhost:8080/api/admin/tables?tableName=${table.name}&restaurantName=${"Italiano"}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                if (response.ok) {
                    navigate('/restaurant');
                } else {
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


    const handleConfirm = () => {

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
                                <OrderMeal key={orderMeal.id} orderNumber={order.number} orderMeal={orderMeal} edit={edit} />
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