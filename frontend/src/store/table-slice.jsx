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
      console.log(action)
      const updatedTable = action.payload.table;
      const index = state.tables.findIndex(table => table.name === updatedTable.name);
      if (index !== -1) {
        state.tables[index] = updatedTable;
      } else {
        state.tables.push(updatedTable);
      }
    }
  },
});

export const tableActions = tableSlice.actions;

export default tableSlice;