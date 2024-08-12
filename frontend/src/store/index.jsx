import { configureStore } from '@reduxjs/toolkit';

import tableSlice from './table-slice';
import orderSlice from './order-slice';

const store = configureStore({
  reducer: { table: tableSlice.reducer, order: orderSlice.reducer },
});

export default store;