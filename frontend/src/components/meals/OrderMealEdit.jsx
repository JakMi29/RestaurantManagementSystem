import classes from '../../pages/restaurant/EditOrderPage.module.css';
import { useDispatch } from 'react-redux';
import { orderMealActions } from '../../store/EditOrderSlice';
import uiClasses from '../ui/Ui.module.css';
function OrderMealEdit({ meal }) {
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
                <button className={uiClasses.redButton} onClick={
                    () => dispatch(orderMealActions.decreasemealMealQuantity({ name: meal.meal.name }))}>-</button>
                <p style={{ color: "black",padding:"0px", margin:"0px" }}>{meal.quantity}</p>
                <button className={uiClasses.greenButton} onClick={
                    () => dispatch(orderMealActions.increaseOrderMealQuantity({ meal: meal.meal }))}>+</button>
            </div>
        </div>
    )
}
export default OrderMealEdit;