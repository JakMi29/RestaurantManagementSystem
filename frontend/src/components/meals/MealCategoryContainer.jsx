import { NavLink } from 'react-router-dom';
import classes from '../../pages/meals/MealPage.module.css';

// eslint-disable-next-line react/prop-types
function MealCategoryContainer({currentCategory}) {
    const isActive = (category) => currentCategory === category;
    return(
    <div className={classes.categoryContainer}>
        <NavLink
            to="/meals?category=appetizer"
            className={
                isActive("appetizer") ? classes.categoryButtonActive : classes.categoryButton
            }
        >
            Appetizer
        </NavLink>
        <NavLink
            to="/meals?category=soup"
            className={isActive("soup") ? classes.categoryButtonActive : classes.categoryButton
            }
        >
            Soup
        </NavLink>
        <NavLink
            to="/meals?category=main_dish"
            className={isActive("main_dish") ? classes.categoryButtonActive : classes.categoryButton
            }
        >
            Main dish
        </NavLink>
        <NavLink
            to="/meals?category=dessert"
            className={isActive("dessert") ? classes.categoryButtonActive : classes.categoryButton
            }
        >
            dessert
        </NavLink>
        <NavLink
            to="/meals?category=drink"
            className={isActive("drink") ? classes.categoryButtonActive : classes.categoryButton
            }
        >
            Drink
        </NavLink>
        <NavLink
            to="new"
            className={classes.newMealButton}
            activeclassname={classes.newMealButtonActive}
        >
            New meal
        </NavLink>
    </div>
    );
}
export default MealCategoryContainer