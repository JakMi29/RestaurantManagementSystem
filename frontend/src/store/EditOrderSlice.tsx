import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MealInterface } from '../interfaces/Meal';
import { OrderMealInterface, OrderMealStatus } from '../interfaces/Order';

interface EditOrder {
  meals: OrderMealInterface[];
  price: number;
  number:string;

}

const initialState: EditOrder = {
  meals: [],
  price: 0,
  number:""

};

const editOrder = createSlice({
  name: 'editOrder',
  initialState,
  reducers: {
      resetOrderMeals(state) {
          state.meals = [];
          state.price = 0;
      },
      increaseOrderMealQuantity(state, action: PayloadAction<{ meal: MealInterface }>) {
          const { meal } = action.payload;
          const orderMeal = state.meals.find((orderMeal) => orderMeal.meal.name === meal.name);
          if (orderMeal) {
              orderMeal.quantity += 1;
              state.price += meal.price;
          } else {
              state.price += meal.price;
              state.meals.push({
                  meal: { ...meal },
                  status: OrderMealStatus.PREPARING,
                  quantity: 1,
                  price: meal.price
              });
          }
      },
      decreaseOrderMealQuantity(state, action: PayloadAction<{ name: string }>) {
          const { name } = action.payload;
          const orderMeal = state.meals.find((orderMeal) => orderMeal.meal.name === name);
          if (orderMeal) {
              if (orderMeal.quantity > 1) {
                  orderMeal.quantity -= 1;
                  state.price -= orderMeal.meal.price;
              } else {
                  state.meals = state.meals.filter((orderMeal) => orderMeal.meal.name !== name);
              }
          }
      },
      addMeals(state, action: PayloadAction<{ meals: OrderMealInterface[],number:string }>) {
        state.number=action.payload.number;  
        state.meals = action.payload.meals.filter(meal => meal.status ===  OrderMealStatus.PREPARING);
      }
  }
});

export const editOrderActions = editOrder.actions;

export default editOrder;