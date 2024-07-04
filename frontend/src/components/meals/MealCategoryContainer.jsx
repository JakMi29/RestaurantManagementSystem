import { NavLink } from 'react-router-dom';
import classes from '../../pages/meals/MealPage.module.css';
import { useContext } from 'react';
import MealPageContext from '../../store/MealPageContext';

// eslint-disable-next-line react/prop-types
function MealCategoryContainer({currentCategory}) {
    const isActive = (category) => currentCategory === category;
    const mealPageCtx=useContext(MealPageContext);
    return(
    <div className={classes.categoryContainer}>
        <NavLink
            to="/meals?category=appetizer&pageNumber=0&pageSize=10"
            className={
                isActive("appetizer") ? classes.categoryButtonActive : classes.categoryButton
            }
        >
            Appetizer
        </NavLink>
        <NavLink
            to="/meals?category=soup&pageNumber=0&pageSize=10"
            className={isActive("soup") ? classes.categoryButtonActive : classes.categoryButton
            }
        >
            Soup
        </NavLink>
        <NavLink
            to="/meals?category=main_dish&pageNumber=0&pageSize=10"
            className={isActive("main_dish") ? classes.categoryButtonActive : classes.categoryButton
            }
        >
            Main dish
        </NavLink>
        <NavLink
            to="/meals?category=dessert&pageNumber=0&pageSize=10"
            className={isActive("dessert") ? classes.categoryButtonActive : classes.categoryButton
            }
        >
            Dessert
        </NavLink>
        <NavLink
            to="/meals?category=drink&pageNumber=0&pageSize=10"
            className={isActive("drink") ? classes.categoryButtonActive : classes.categoryButton
            }
        >
            Drink
        </NavLink>
        <button
            className={classes.newMealButton}
            onClick={mealPageCtx.create}
        >
            New meal
        </button>
    </div>
    );
}
export default MealCategoryContainer