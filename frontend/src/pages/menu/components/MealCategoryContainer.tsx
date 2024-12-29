import { useLocation } from 'react-router-dom';
import classes from '../MenuPage.module.css';
import uiClasses from "../../../components/ux/Ui.module.css";

interface MealCategoryContainerProps {
    handleChange: (category: string) => void;
    currentCategory: string;
}

const MealCategoryContainer = ({ handleChange, currentCategory }: MealCategoryContainerProps) => {

    return (
        <div className={classes.categoryContainer}>
            <button
                onClick={() => handleChange('appetizer')}
                className={`${uiClasses.blueButton} ${currentCategory === 'appetizer' ? uiClasses.active : ''}`}
            >
                Appetizer
            </button>
            <button
                onClick={() => handleChange('soup')}
                className={`${uiClasses.blueButton} ${currentCategory === 'soup' ? uiClasses.active : ''}`}
            >
                Soup
            </button>
            <button
                onClick={() => handleChange('main_dish')}
                className={`${uiClasses.blueButton} ${currentCategory === 'main_dish' ? uiClasses.active : ''}`}
            >
                Main dish
            </button>
            <button
                onClick={() => handleChange('dessert')}
                className={`${uiClasses.blueButton} ${currentCategory === 'dessert' ? uiClasses.active : ''}`}
            >
                Dessert
            </button>
            <button
                onClick={() => handleChange('drink')}
                className={`${uiClasses.blueButton} ${currentCategory === 'drink' ? uiClasses.active : ''}`}
            >
                Drink
            </button>
            <button
                onClick={() => handleChange('alcoholic_drink')}
                className={`${uiClasses.blueButton} ${currentCategory === 'alcoholic_drink' ? uiClasses.active : ''}`}
            >
                Alcoholic drink
            </button>
        </div>
    );
};

export default MealCategoryContainer;