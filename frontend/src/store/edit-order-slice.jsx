import { createSlice } from '@reduxjs/toolkit';

const orderMealsSlice = createSlice({
  name: 'orderMeal',
  initialState: {
    meals: []
  },
  reducers: {
    resetOrderMeals(state) {
      state.meals = []
    },
    increaseOrderMealQuantity(state, action) {
      const name = action.payload.name;
      const orderMeal = state.meals.find((orderMeal) => orderMeal.meal.name === name);
      if (orderMeal) {
        orderMeal.quantity = orderMeal.quantity + 1;
      } else {
        state.meals.push(
          {
            meal: {
              name: action.payload.name,
              image: action.payload.image,
            },
            status: "NEW",
            quantity: 1
          }
        )
      }
    },
    decreasemealMealQuantity(state, action) {
      const name = action.payload.name;
      const orderMeal = state.meals.find((orderMeal) => orderMeal.meal.name === name);
      if (orderMeal.quantity > 1) {
        orderMeal.quantity = orderMeal.quantity - 1;
      }
      else {
        state.meals = state.meals.filter((orderMeal) => orderMeal.meal.name !== name);
      }
    },
    addMeals(state, action){
      state.meals=action.payload.meals;
    },
    removeMeal(state, action) {
      const name = action.payload.name;
      state.meals = state.meals.filter((orderMeal) => orderMeal.meal.name !== name);
    },
  },
});

export const orderMealActions = orderMealsSlice.actions;

export default orderMealsSlice;