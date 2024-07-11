import { useContext } from 'react';
import classes from '../../pages/meals/MealPage.module.css';
import MessageContext from '../../store/MessageContext';
import { useNavigate } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MealPageContext from '../../store/MealPageContext';

function Meal({meal}) {
    const messageCtx = useContext(MessageContext);
    const mealPageCtx = useContext(MealPageContext);
    const navigate = useNavigate()

    const handleConfirmAction = () => {
        messageCtx.showMessage('Are you sure you want to remove the meal?', 'confirmation', (confirmed) => {
            if (confirmed) {
                fetch(`http://localhost:8080/api/admin/meal?restaurantName=${"Italiano"}&name=${meal.name}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                    .then(response => {
                        if (response.ok) {
                            messageCtx.showMessage('The meal has been removed', 'info')
                            navigate(`/meals?category=${meal.category}&pageNumber=0&pageSize=10`)
                        } else {
                            messageCtx.showMessage('The meal can not be remove', 'error')
                        }
                    })
                    .catch(error => {
                        console.error('Wystąpił błąd podczas wysyłania żądania:', error);
                    });
            }
        });
    };

    function handleEditButton() {
        mealPageCtx.edit()
        mealPageCtx.editMeal(meal)
    }

    const handleMealofTheDay = () => {
        fetch(`http://localhost:8080/api/admin/meal/mealOfTheDay?restaurantName=${"Italiano"}&name=${meal.name}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                if (response.ok) {
                    messageCtx.showMessage('Meal was added as meal of the day', 'info')
                    navigate(`/meals?category=${meal.category}&pageNumber=0&pageSize=10`)
                } else {
                    messageCtx.showMessage('Something gone wrong', 'error')
                }
            })
            .catch(error => {
                console.error('Wystąpił błąd podczas wysyłania żądania:', error);
            });
    }

    return (
        <div className={classes.meal} >
            <div className={meal.mealOfTheDay ? classes.mealOfDayTrue : classes.mealOfDayFalse}>
                <FavoriteIcon sx={{ fontSize: 30 }} onClick={handleMealofTheDay} />
            </div>
            <div className={classes.mealImage}>
                <img src={meal.image} />
            </div>
            <div className={classes.contentContainer}>
                <div className={classes.mealContent}>
                    <p>{meal.name}</p>
                    <p>{meal.price} usd</p>
                    <p>{meal.description}</p>
                </div>
                <div className={classes.actions}>
                    <button className={classes.editButton} onClick={handleEditButton}>Edit</button>
                    <button className={classes.deleteButton} onClick={handleConfirmAction}>Delete</button>
                </div>
            </div>
        </div>
    )
}
export default Meal;