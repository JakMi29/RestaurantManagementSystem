import classes from '../../pages/statistics/StatisticPage.module.css';


function OrderMealDetails({ meal }) {

    return (
        <div className={classes.meal} >
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
        </div>
    )
}
export default OrderMealDetails;