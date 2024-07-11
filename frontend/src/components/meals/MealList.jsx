import classes from '../../pages/meals/MealPage.module.css';
import Meal from './Meal';

function MealList({ meals }) {
  
  return (
    <div className={classes.mealsContainer}>
      {meals.map((meal) => (
        <Meal key={meal.name} meal={meal}/>
      ))}
    </div>
  );
}

export default MealList;