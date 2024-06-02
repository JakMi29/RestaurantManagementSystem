import classes from '../../pages/meals/MealPage.module.css';
import Meal from './Meal';

function MealList({meals}) {
 
  return (
    <div className={classes.mealsContainer}>
        {meals.map((meal) => (
       <Meal key={meal.name} name={meal.name} category={meal.category} price={meal.price} description={meal.description} image={meal.image}/>
        ))}
        </div>
  );
}

export default MealList;