import { Paper } from '@mui/material';
import classes from '../../pages/statistics/StatisticPage.module.css';

const cardStyle = {
    padding: 3,
    textAlign: "center",
    borderRadius: 2,
  };

function OrderMealDetails({ meal }) {

    return (
        <Paper elevation={4} sx={cardStyle}>
            <div className={classes.mealImage}>
                <img src={meal.meal.image} />
            </div>
            <div className={classes.contentContainer}>
                <div className={classes.mealContent}>
                    <p>{meal.meal.name}</p>
                    <p>Price: {meal.meal.price} usd</p>
                    <p>Quantity: {meal.quantity}</p>
                </div>
            </div>
        </Paper>
    )
}
export default OrderMealDetails;