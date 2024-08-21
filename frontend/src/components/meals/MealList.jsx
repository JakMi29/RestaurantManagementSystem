import classes from '../../pages/meals/MealPage.module.css';
import Meal from './Meal';
import OrderMeal from './OrderMeal';
function MealList({ meals, order }) {
  return (
    <div className={classes.mealsContainer}>
      {meals.map((meal) => (
        order ?
          <OrderMeal key={meal.name} meal={meal} /> :
          <Meal key={meal.name} meal={meal} />
      ))}
    </div>
  );
}

export default MealList;