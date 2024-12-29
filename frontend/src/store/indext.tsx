import { configureStore } from '@reduxjs/toolkit';
import tableSlice from './TableSlice';
import orderSlice from './OrderSlice';
import editOrder from './EditOrderSlice';

const store = configureStore({
  reducer: {
    table: tableSlice.reducer,
    order: orderSlice.reducer,
    editOrder: editOrder.reducer 
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
