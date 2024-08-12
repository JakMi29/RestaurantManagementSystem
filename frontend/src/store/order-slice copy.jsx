import { createSlice } from '@reduxjs/toolkit';

const orderSlice = createSlice({
  name: 'meal',
  initialState: {
    meals: []
  },
  reducers: {
    resetOrder(state) {
      state.meals = []
    },
    increaseOrderMealQuantity(state, action) {
      const number = action.payload.number;
      const mealName = action.payload.mealName;
      const order = state.orders.find((order) => order.number === number);
      const meal = order.meals.find(meal => meal.meal.name === mealName)
      // order.price = state.order.price + meal.price;
      meal.quantity = meal.quantity + 1;
    },
    decreaseOrderMealQuantity(state, action) {
      const number = action.payload.number;
      const mealName = action.payload.mealName;
      const order = state.orders.find((order) => order.number === number);
      const meal = order.meals.find(meal => meal.meal.name === mealName)
      // order.price = state.order.price + meal.price;
      if (meal.quantity > 1) {
        meal.quantity = meal.quantity - 1;
      } else {
        order.meals = order.meals.filter(meal => meal.meal.name !== mealName)
      }
    },
  },
});

export const orderActions = orderSlice.actions;

export default orderSlice;