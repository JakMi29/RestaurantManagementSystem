import { useDispatch } from 'react-redux';
import classes from './EditOrderPage.module.css';
import { editOrderActions } from '../../../store/EditOrderSlice';
import { MealInterface } from '../../../interfaces/Meal';
import { Paper, Typography } from '@mui/material';

const OrderEditMeal = (props:{meal: MealInterface} ) => {
    const dispatch = useDispatch();
    return (
        <Paper  className={classes.meal}
            onClick={() => dispatch(editOrderActions.increaseOrderMealQuantity({ meal: props.meal }))
            }>
            <Typography variant="h6" style={{ textAlign: 'center' }}>{props.meal.name}</Typography>
            <div className={classes.mealImage}>
                <img src={props.meal.image} />
            </div>
        </Paper >
    )
}
export default OrderEditMeal;