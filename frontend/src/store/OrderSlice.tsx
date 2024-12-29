import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OrderInterface, OrderMealInterface, OrderMealStatus } from '../interfaces/Order';
import { MealInterface } from '../interfaces/Meal';


interface OrderState {
  orders: OrderInterface[];
}

const initialState: OrderState = {
  orders: [],
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    resetOrder(state) {
      state.orders = []
    },
    addMeals(state, action: PayloadAction<{ orderNumber: string, price: any, meals: OrderMealInterface[] }>) {
      const number = action.payload.orderNumber;
      const order = state.orders.find((order: OrderInterface) => order.number === number);
      if (!order) {
        return
      }
      order.meals = [...order?.meals.filter((meal: OrderMealInterface) => meal.status !== OrderMealStatus.PREPARING), ...action.payload.meals]
      order.price = action.payload.price
    },
    increaseCustomers(state, action:PayloadAction<{ number: string}>) {
      const number = action.payload.number;
      const order = state.orders.find((order: OrderInterface) => order.number === number);
      if (!order) {
        return
      }
      order.customerQuantity = order.customerQuantity + 1;
    },
    decreaseCustomers(state, action:PayloadAction<{ number: string}>) {
      const number = action.payload.number;
      const order = state.orders.find((order: OrderInterface) => order.number === number);
      if (order && order.customerQuantity > 0) {
        order.customerQuantity = order.customerQuantity - 1;
      }
    },
    revertChanges(state, action:PayloadAction<{ number: string}>) {
      state.orders = state.orders.filter((order: OrderInterface) => order.number !== action.payload.number)
    },
    editOrder(state, action:PayloadAction<{ order: OrderInterface}>) {
      state.orders.push(action.payload.order)
    },

    increaseOrderMealQuantity(state, action: PayloadAction<{ number: string, meal: MealInterface }>) {
      const { number, meal: targetMeal } = action.payload;
      const order = state.orders.find((order: OrderInterface) => order.number === number);
      if (!order) return;

      const existingMeal = order.meals.find((meal: OrderMealInterface) => meal.meal.name === targetMeal.name && meal.status === OrderMealStatus.PREPARING);
      if (existingMeal) {
          existingMeal.quantity += 1;
      } else {
          order.meals.push({
              meal: targetMeal,
              quantity: 1,
              status: OrderMealStatus.PREPARING,
              price: targetMeal.price
          });
      }
      order.price += targetMeal.price;
    },

    decreaseOrderMealQuantity(state, action: PayloadAction<{ number: string, meal: MealInterface }>) {
      const { number, meal: targetMeal } = action.payload;
      const order = state.orders.find((order: OrderInterface) => order.number === number);
      if (!order) return;

      const meal = order.meals.find((meal: OrderMealInterface) => meal.meal.name === targetMeal.name);
      if (!meal) return;

      if (meal.quantity > 1) {
          meal.quantity -= 1;
          order.price -= meal.meal.price;
      } else {
          order.meals = order.meals.filter((meal: OrderMealInterface) => meal.meal.name !== targetMeal.name || meal.status !== OrderMealStatus.PREPARING);
      }
    },
  },
});

export const orderActions = orderSlice.actions;

export default orderSlice;