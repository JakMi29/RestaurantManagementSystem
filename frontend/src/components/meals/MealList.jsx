import classes from '../../pages/meals/MealPage.module.css';
import Meal from './Meal';
import OrderMeal from './OrderMeal';
function MealList({ meals, order,updateMeal }) {
  return (
    <div className={classes.mealsContainer}>
      {meals.map((meal) => (
        order ?
          <OrderMeal key={meal.name} meal={meal} /> :
          <Meal key={meal.name} meal={meal} updateMeal={updateMeal}/>
      ))}
    </div>
  );
}

export default MealList;