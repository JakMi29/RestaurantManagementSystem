import { NavLink } from 'react-router-dom';
import classes from '../../pages/meals/MealPage.module.css';
import { useContext, useState } from 'react';
import MealPageContext from '../../store/MealPageContext';
import DialogComponent from '../dialogs/DialogComponent';

// eslint-disable-next-line react/prop-types
function MealCategoryContainer({ currentCategory, order,openDialog }) {
    const isActive = (category) => currentCategory === category;
    return (
        <div className={classes.categoryContainer}>
            <NavLink
                to={`/${order ? "restaurant/orderMeals" : "meals"}?category=appetizer&pageNumber=0&pageSize=${order ? 12 : 10}`}
                className={isActive("appetizer") ? classes.categoryButtonActive : classes.categoryButton}
            >
                Appetizer
            </NavLink>
            <NavLink
                to={`/${order ? "restaurant/orderMeals" : "meals"}?category=soup&pageNumber=0&pageSize=${order ? 12 : 10}`}
                className={isActive("soup") ? classes.categoryButtonActive : classes.categoryButton
                }
            >
                Soup
            </NavLink>
            <NavLink
                to={`/${order ? "restaurant/orderMeals" : "meals"}?category=main_dish&pageNumber=0&pageSize=${order ? 12 : 10}`}
                className={isActive("main_dish") ? classes.categoryButtonActive : classes.categoryButton
                }
            >
                Main dish
            </NavLink>
            <NavLink
                to={`/${order ? "restaurant/orderMeals" : "meals"}?category=dessert&pageNumber=0&pageSize=${order ? 12 : 10}`}
                className={isActive("dessert") ? classes.categoryButtonActive : classes.categoryButton
                }
            >
                Dessert
            </NavLink>
            <NavLink
                to={`/${order ? "restaurant/orderMeals" : "meals"}?category=drink&pageNumber=0&pageSize=${order ? 12 : 10}`}
                className={isActive("drink") ? classes.categoryButtonActive : classes.categoryButton
                }
            >
                Drink
            </NavLink>
            <NavLink
                to={`/${order ? "restaurant/orderMeals" : "meals"}?category=alcoholic_drink&pageNumber=0&pageSize=${order ? 12 : 10}`}
                className={isActive("alcoholic_drink") ? classes.categoryButtonActive : classes.categoryButton
                }
            >
                Alcoholic drink
            </NavLink>
            {order !== true && <button
                className={classes.newMealButton}
                onClick={openDialog}
            >
                New meal
            </button>}
        </div>
    );
}
export default MealCategoryContainer