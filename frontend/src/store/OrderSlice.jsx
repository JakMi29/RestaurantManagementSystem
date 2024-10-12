import { createSlice } from '@reduxjs/toolkit';

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    orders: []
  },
  reducers: {
    resetOrder(state) {
      state.orders = []
    },
    addMeals(state, action) {
      const number = action.payload.number;
      const order = state.orders.find((order) => order.number === number);
      order.meals = [...order.meals.filter(meal => meal.status !== 'PREPARING'), ...action.payload.meals]
      order.price = action.payload.price
    },
    increaseCustomers(state, action) {
      const number = action.payload.number;
      const order = state.orders.find((order) => order.number === number);
      order.customerQuantity = order.customerQuantity + 1;
    },
    decreaseCustomers(state, action) {
      const number = action.payload.number;
      const order = state.orders.find((order) => order.number === number);
      if (order.customerQuantity > 0) {
        order.customerQuantity = order.customerQuantity - 1;
      }
    },
    revertChanges(state, action) {
      state.orders = state.orders.filter(order => order.number !== action.payload.number)
    },
    editOrder(state, action) {
      state.orders.push(action.payload.order)
    },

    increaseOrderMealQuantity(state, action) {
      const number = action.payload.number;
      const mealName = action.payload.mealName;
      const order = state.orders.find((order) => order.number === number);
      const meal = order.meals.find(meal => meal.meal.name === mealName && meal.status === 'PREPARING')
      if (meal) {
        meal.quantity = meal.quantity + 1;
      }
      else {
        const newMeal = {
          ...meal,
          quantity: 1,
          status: 'PREPARING',
          price: meal.meal.price
        };
        order.meals.push(newMeal);
      }
      order.price = order.price + meal.meal.price;
    },

    decreaseOrderMealQuantity(state, action) {
      const number = action.payload.number;
      const mealName = action.payload.mealName;
      const order = state.orders.find((order) => order.number === number);
      const meal = order.meals.find(meal => meal.meal.name === mealName)
      order.price = order.price - meal.meal.price;
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