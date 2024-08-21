import { useContext } from 'react';
import classes from '../../pages/restaurant/EditOrderPage.module.css';
import MealPageContext from '../../store/MealPageContext';
import { useDispatch } from 'react-redux';
import { orderMealActions } from '../../store/edit-order-slice';

function OrderMealEdit({ meal }) {
    const mealPageCtx = useContext(MealPageContext);
    const dispatch = useDispatch();

    return (
        <div className={classes.mealEdit} >
            <div className={classes.contentContainer}>
                <div className={classes.mealContent}>
                    <p>{meal.meal.name}</p>
                </div>
            </div>
            <div className={classes.mealImage}>
                <img src={meal.meal.image} />
            </div>
            <div className={classes.orderMealActions}>
                <button className={classes.redButton} onClick={
                    () => dispatch(orderMealActions.decreasemealMealQuantity({ name: meal.meal.name }))}>-</button>
                <p style={{color:"black"}}>{meal.quantity}</p>
                <button className={classes.greenButton} onClick={
                    () => dispatch(orderMealActions.increaseOrderMealQuantity({ name: meal.meal.name }))}>+</button>
            </div>
        </div>
    )
}
export default OrderMealEdit;