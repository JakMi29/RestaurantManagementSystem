import { createSlice } from '@reduxjs/toolkit';

const orderMealsSlice = createSlice({
  name: 'orderMeal',
  initialState: {
    meals: [],
    price: 0
  },
  reducers: {
    resetOrderMeals(state) {
      state.meals = [];
      state.price = 0;
    },
    increaseOrderMealQuantity(state, action) {
      const meal = action.payload.meal;
      const orderMeal = state.meals.find((orderMeal) => orderMeal.meal.name === meal.name);
      if (orderMeal) {
        orderMeal.quantity = orderMeal.quantity + 1;
        state.price = state.price + meal.price;
      } else {
        state.price = state.price + meal.price
        state.meals.push(
          {
            meal: {
              ...meal
            },
            status: "PREPARING",
            quantity: 1,
            price: meal.price
          }
        )
      }
    },
    decreasemealMealQuantity(state, action) {
      const name = action.payload.name;
      const orderMeal = state.meals.find((orderMeal) => orderMeal.meal.name === name);
      if (orderMeal.quantity > 1) {
        orderMeal.quantity = orderMeal.quantity - 1;
        state.price = state.price - orderMeal.meal.price;
      }
      else {
        state.meals = state.meals.filter((orderMeal) => orderMeal.meal.name !== name);
      }
    },
    addMeals(state, action) {
      state.meals = action.payload.meals.filter(meal => meal.status === 'PREPARING');
      state.price = action.payload.price;
      console.log()
    },
    removeMeal(state, action) {
      const name = action.payload.name;
      state.meals = state.meals.filter((orderMeal) => orderMeal.meal.name !== name);
    },
  },
});

export const orderMealActions = orderMealsSlice.actions;

export default orderMealsSlice;