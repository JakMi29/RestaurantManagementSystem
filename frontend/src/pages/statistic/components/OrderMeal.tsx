import { Paper, Typography } from "@mui/material";
import { OrderMealInterface } from "../../../interfaces/Order";
import { paperStyle } from "../../../theme/theme";
import classes from "../StatisticPage.module.css"

const apiUrl = import.meta.env.VITE_BACKEND_URL;
const OrderMeal = ({ orderMeal }: { orderMeal: OrderMealInterface }) => {
    return (
        <Paper sx={{ ...paperStyle }}>
            <div className={classes.mealImage}>
                <img src={orderMeal.meal.image.includes("https://") ? orderMeal.meal.image : `${apiUrl}/api/restaurantManagementSystem/meal/image?image=${orderMeal.meal.image}`} />
            </div>
            <Typography variant="h6">{orderMeal.meal.name}</Typography>
            <Typography variant="body1">Price: {orderMeal.meal.price} USD</Typography>
            <Typography variant="body1">Quantity: {orderMeal.quantity}</Typography>
        </Paper>
    )
}

export default OrderMeal;