import { configureStore } from '@reduxjs/toolkit';

import tableSlice from './TableSlice';
import orderSlice from './OrderSlice';
import orderMealsSlice from './EditOrderSlice';

const store = configureStore({
  reducer: { table: tableSlice.reducer, order: orderSlice.reducer, orderMeal: orderMealsSlice.reducer },
});

export default store;