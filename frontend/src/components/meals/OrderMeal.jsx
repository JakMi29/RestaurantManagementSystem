import { useDispatch } from 'react-redux';
import classes from '../../pages/restaurant/EditOrderPage.module.css';
import { orderMealActions } from '../../store/edit-order-slice';

function OrderMeal({ meal }) {
    const dispatch = useDispatch();
    return (
        <button style={{ padding: "0px" }}   
        onClick={() => dispatch(orderMealActions.increaseOrderMealQuantity({ name: meal.name, image: meal.image}))
    }>
            <div className={classes.meal} >
                <div className={classes.contentContainer}>
                    <div className={classes.mealContent}>
                        <p>{meal.name}</p>
                    </div>
                    <div className={classes.mealImage}>
                        <img src={meal.image} />
                    </div>
                </div>
            </div>
        </button>
    )
}
export default OrderMeal;