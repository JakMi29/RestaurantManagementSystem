import classes from '../../pages/restaurant/RestaurantPage.module.css';
import MessageContext from '../../store/MessageContext';
import { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { orderActions } from '../../store/OrderSlice';
import { MessageMode } from '../../constants/MessageMode';
import { changeStatus } from '../../api/OrderMealApi';
import { OrderMealInterface, OrderMealStatus } from '../../interfaces/Order';
import uiClasses from '../../components/ux/Ui.module.css';

interface OrderMealProps {
    orderMeal: OrderMealInterface,
    orderNumber: string,
    edit: boolean,
    admin: boolean
}

const OrderMeal = (props: OrderMealProps) => {
    const dispatch = useDispatch();
    const messageCtx = useContext(MessageContext);
    let content;

    const handleChangeOrderMealStatus = () => {
        changeStatus(props.orderNumber, props.orderMeal)
            .then(response => {
                if (!response.ok) {
                    messageCtx.showMessage('Something gone wrong', MessageMode.ERROR)
                }
            })
            .catch(error => {
                console.error('Wystąpił błąd podczas wysyłania żądania:', error);
            });
    }

    const getOrderMealButton = (disabled: boolean) => {
        switch (props.orderMeal.status) {
            case OrderMealStatus.PREPARING:
                return (
                    <button onClick={handleChangeOrderMealStatus} className={uiClasses.greenButton} disabled={disabled}>
                        {props.admin ? 'Preaparing' : 'Complete'}
                    </button>
                );
            case OrderMealStatus.READY:
                return (
                    <button onClick={handleChangeOrderMealStatus} className={uiClasses.greenButton} disabled={disabled}>
                        {props.admin ? 'Ready' : 'Release'}
                    </button>
                );
            case OrderMealStatus.RELEASED:
                return (
                    <button className={uiClasses.blueButton} disabled={true}>
                        {'Released'}
                    </button>
                );
            default:
                return null;
        }
    }

    content = props.edit ? (
        <div className={classes.orderMeal}>
            {props.orderMeal.meal.name}
            <div className={classes.orderMealActions}>
                {props.orderMeal.status === OrderMealStatus.PREPARING ?
                    <>
                        <button
                            className={uiClasses.redButton}
                            onClick={() => dispatch(orderActions.decreaseOrderMealQuantity({ number: props.orderNumber, meal: props.orderMeal.meal }))}
                        >-</button>
                        {props.orderMeal.quantity}
                        <button
                            className={uiClasses.greenButton}
                            onClick={() => dispatch(orderActions.increaseOrderMealQuantity({ number: props.orderNumber, meal: props.orderMeal.meal }))}
                        >+</button>
                    </> :
                    <>
                        <button className={uiClasses.blueButton} disabled={true}>{props.orderMeal.quantity}</button>
                        {getOrderMealButton(true)}
                        <button onClick={() => dispatch(orderActions.increaseOrderMealQuantity({ number: props.orderNumber, meal: props.orderMeal.meal }))} className={uiClasses.greenButton}>+</button>
                    </>
                }
            </div>
        </div>
    ) : (
        <div className={classes.orderMeal}>
            {props.orderMeal.meal.name}
            <div className={classes.orderMealActions}>
                <button className={uiClasses.blueButton} disabled={true}>{props.orderMeal.quantity}</button>
                {getOrderMealButton(props.admin ? true : false)}
            </div>
        </div>
    )

    return (
        <>
            {content}
        </>
    );
}

export default OrderMeal;