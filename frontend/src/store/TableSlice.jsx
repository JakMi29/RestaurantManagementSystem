import { createSlice } from '@reduxjs/toolkit';

const tableSlice = createSlice({
  name: 'table',
  initialState: {
    tables: [],
    pageNumber: 0,
    searchTerm: "",
  },
  reducers: {
    getTables(state, action) {
      state.tables = action.payload.tables.content;
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
        if (updatedOrder.status === 'RELEASED') {
          state.tables[index].order = null;
        } else {
          state.tables[index].order = updatedOrder;
        }
      }
    },
    decreasePageNumber(state) {
      if (state.pageNumber > 0) {
        state.pageNumber = state.pageNumber - 1;
      }
    },
    resetPageNumber(state) {
        state.pageNumber = 0;
    },
    increasePageNumber(state) {
      state.pageNumber = state.pageNumber + 1;
    },
    setSearchTerm(state, action) {
      state.searchTerm = action.payload.searchTerm;
    },
  },
});

export const tableActions = tableSlice.actions;

export default tableSlice;