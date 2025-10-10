import { Paper, Typography } from "@mui/material";
import { MealInterface } from "../../../interfaces/Meal";
import classes from "../MenuPage.module.css"
import uiClasses from "../../../components/ux/Ui.module.css"
import { deleteMeal, mealOfTheDay } from "../../../api/form/Meal";
import { useContext } from "react";
import MessageContext from "../../../store/MessageContext";
import { MessageMode } from "../../../constants/MessageMode";
import { useNavigate } from "react-router-dom";
import Role from "../../../constants/Role";
import { getRole } from "../../../services/LocalStorage";
import FavoriteIcon from '@mui/icons-material/Favorite';

const Meal = (props: { meal: MealInterface, updateMeal: (meal: MealInterface) => void }) => {
    const messageCtx = useContext(MessageContext);
    const navigate = useNavigate()
    const admin = getRole() === Role.ADMIN;
    const { meal } = props;
    const apiUrl = import.meta.env.VITE_BACKEND_URL;

    const handleEditButton = () => {
        props.updateMeal(meal)
    }
    const handleDeleteMeal = () => {
        messageCtx.showMessage('Are you sure you want to remove the meal?', MessageMode.CONFIRM, (confirmed) => {
            if (confirmed) {
                deleteMeal(meal.name)
                    .then(response => {
                        if (response.ok) {
                            messageCtx.showMessage('The meal has been removed', MessageMode.INFO)
                            navigate(`/meals?category=${meal.category.toLowerCase()}&pageNumber=0&pageSize=10`)
                        } else {
                            messageCtx.showMessage('The meal can not be remove', MessageMode.ERROR)
                        }
                    })
            }
        });
    };

    const handleMealOfTheDay = () => {
        mealOfTheDay(meal.name).then(response => {
            if (response.ok) {
                messageCtx.showMessage('Meal was added as meal of the day', MessageMode.INFO)
                navigate(`/meals?category=${meal.category.toLowerCase()}&pageNumber=0&pageSize=10`)
            } else {
                messageCtx.showMessage('Something gone wrong', MessageMode.ERROR)
            }
        })
    }

    return (
        <Paper elevation={4} sx={{ borderRadius: 2 }} className={classes.meal}>
            {admin ? (
                <div className={`${classes.mealOfDayBase} ${meal.mealOfTheDay ? classes.mealOfDayTrue : classes.mealOfDayFalse}`}>
                    <FavoriteIcon sx={{ fontSize: 30 }} onClick={handleMealOfTheDay} />
                </div>
            ) : (
                meal.mealOfTheDay && <div className={classes.mealOfDay}>
                    <FavoriteIcon sx={{ fontSize: 30 }} />
                </div>
            )}
            <Typography variant="h6">{meal.name}</Typography>
            <div className={classes.mealContent}>
                <div className={classes.image}>
                    <img src={meal.image.includes("https://") ? meal.image : `${apiUrl}/api/restaurantManagementSystem/meal/image?image=${meal.image}`} />
                </div>
                <Typography variant="body1">{meal.price} usd</Typography>
                <Typography variant="body1">{meal.description}</Typography>
            </div>
            {admin && (
                <div className={classes.actions}>
                    <button className={uiClasses.redButton} onClick={handleDeleteMeal}>Delete</button>
                    <button className={uiClasses.greenButton} onClick={handleEditButton}>Edit</button>
                </div>
            )}
        </Paper>
    )
}

export default Meal;