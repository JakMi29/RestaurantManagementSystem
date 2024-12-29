import classes from './EditOrderPage.module.css';
import { useDispatch } from 'react-redux';
import uiClasses from '../../../components/ux/Ui.module.css';
import { OrderMealInterface } from '../../../interfaces/Order';
import { editOrderActions } from '../../../store/EditOrderSlice';
import { Paper, Typography } from '@mui/material';

const OrderEditOrderMeal = (props: { orderMeal: OrderMealInterface }) => {
    const dispatch = useDispatch();

    return (
        <Paper className={classes.orderMeal}>
            <div className={classes.orderMealContentContainer}>
                <Typography variant="h6" style={{ textAlign: 'center' }}>{props.orderMeal.meal.name}</Typography>
                <div className={classes.mealImage}>
                    <img style={{ height: "100%" }} src={props.orderMeal.meal.image} />
                </div>
            </div>
            <div className={classes.orderMealActions}>
                <button className={uiClasses.redButton} onClick={
                    () => dispatch(editOrderActions.decreaseOrderMealQuantity({ name: props.orderMeal.meal.name }))}>-</button>
                <Typography variant="h6">{props.orderMeal.quantity}</Typography>
                <button className={uiClasses.greenButton} onClick={
                    () => dispatch(editOrderActions.increaseOrderMealQuantity({ meal: props.orderMeal.meal }))}>+</button>
            </div>
        </Paper>
    )
}
export default OrderEditOrderMeal;