import { createSlice } from '@reduxjs/toolkit';

const tableSlice = createSlice({
  name: 'table',
  initialState: {
    tables: []
  },
  reducers: {
    getTables(state, action) {
      state.tables = action.payload.tables
    },
    updateTable(state, action) {
      const updatedTable = action.payload.table;
      const index = state.tables.findIndex(table => table.name === updatedTable.name);
      if (index !== -1) {
        state.tables[index] = updatedTable;
      } else {
        state.tables.push(updatedTable);
      }
    },
    createOrder(state, action) {
      const index = state.tables.findIndex(table => table.name === action.payload.table);
      if (index !== -1) {
        state.tables[index].new = true;
      }
    },
    confirmOrder(state, action) {
      const index = state.tables.findIndex(table => table.name === action.payload.table);
      if (index !== -1) {
        state.tables[index].edit = false;
      }
    },
    updateOrder(state, action) {
      const updatedOrder = action.payload.order;
      const index = state.tables.findIndex(table => table.name === updatedOrder.tableName);
      if (index !== -1) {
          if(updatedOrder.status==='RELEASED'){
            state.tables[index].order=null;
          }else{
            state.tables[index].order = updatedOrder;
          }
        }
    }
  },
});

export const tableActions = tableSlice.actions;

export default tableSlice;