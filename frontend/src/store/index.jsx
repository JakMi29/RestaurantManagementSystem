import { configureStore } from '@reduxjs/toolkit';

import tableSlice from './table-slice';
import orderSlice from './order-slice';
import orderMealsSlice from './edit-order-slice';

const store = configureStore({
  reducer: { table: tableSlice.reducer, order: orderSlice.reducer, orderMeal: orderMealsSlice.reducer },
});

export default store;