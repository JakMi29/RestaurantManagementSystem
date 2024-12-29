import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TableInterface } from '../interfaces/Table';
import { OrderInterface } from '../interfaces/Order';

interface TableState {
  tables: TableInterface[];
  pageNumber: number;
  searchTerm: string;
}

const initialState: TableState = {
  tables: [],
  pageNumber: 0,
  searchTerm: "",
};

const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    getTables(state, action: PayloadAction<{ tables:TableInterface[] }>) {
      state.tables = action.payload.tables;
    },
    updateTable(state, action: PayloadAction<{ table: TableInterface }>) {
      const updatedTable = action.payload.table;
      const index = state.tables.findIndex(table => table.name === updatedTable.name);
      if (index !== -1) {
        state.tables[index] = updatedTable;
      } else {
        state.tables.push(updatedTable);
      }
    },
    createOrder(state, action: PayloadAction<{ table: string }>) {
      const index = state.tables.findIndex(table => table.name === action.payload.table);
      if (index !== -1) {
        state.tables[index].new = true;
      }
    },
    confirmOrder(state, action: PayloadAction<{ table: string }>) {
      const index = state.tables.findIndex(table => table.name === action.payload.table);
      if (index !== -1) {
        state.tables[index].edit = false;
      }
    },
    updateOrder(state, action: PayloadAction<{ order: OrderInterface }>) {
      const updatedOrder = action.payload.order;
      const index = state.tables.findIndex(table => table.name === updatedOrder.tableName);
      if (index !== -1) {
        if (updatedOrder.status === 'PAID') {
          state.tables[index].order = undefined;
        } else {
          state.tables[index].order = updatedOrder;
        }
      }
    },
    decreasePageNumber(state) {
      if (state.pageNumber > 0) {
        state.pageNumber -= 1;
      }
    },
    resetPageNumber(state) {
      state.pageNumber = 0;
    },
    increasePageNumber(state) {
      state.pageNumber += 1;
    },
    setSearchTerm(state, action: PayloadAction<{ searchTerm: string }>) {
      state.searchTerm = action.payload.searchTerm;
    },
  },
});

export const tableActions = tableSlice.actions;

export default tableSlice;