import React from 'react';
import "./Table.module.css";
import { DataGrid } from '@mui/x-data-grid';
import uiClasses from '../ui/Ui.module.css';
import AssessmentIcon from '@mui/icons-material/Assessment';
import { Box, FormControl, InputLabel, MenuItem, Pagination, Paper, Select } from '@mui/material';
const DataTable = ({ columns, rows, loading, page, pageSize, totalPages, onPageChange, onPageSizeChange }) => {

  const CustomNoData = () => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
        <AssessmentIcon sx={{ fontSize: 100, color: 'rgba(60, 60, 211, 1)' }} />
        <h3 style={{ color: 'rgba(60, 60, 211, 1)' }}>No Data Available</h3>
      </div>
    );
  };

  const handlePageChange = (event, newPage) => {
    onPageChange(newPage - 1);
  };

  return (
    <Box sx={{ padding: 4, borderRadius: 2 }}>
      <Paper elevation={3} sx={{ padding: 2, borderRadius: 2, height: 600, overflowY: 'auto' }}>
        <DataGrid
          sx={{
            border: 0,
          }}
          className="table"
          rows={rows}
          rowCount={rows.length}
          loading={loading}
          rowsPerPageOptions={[10, 25, 50]}
          pagination
          page={page}
          pageSize={pageSize}
          paginationMode="server"
          slots={{
            noRowsOverlay: CustomNoData,
            pagination: () => (
              <Box display="flex" alignItems="center" justifyContent="space-between" padding={2} gap={4}>
                <FormControl
                  variant="outlined"
                  sx={{
                    minWidth: 200,
                    marginLeft: 'auto',
                  }}
                >
                  <InputLabel
                    id="size-label"
                  >
                    Items Per Page
                  </InputLabel>
                  <Select
                    labelId="size-label"
                    label="Items Per Page"
                    value={pageSize}
                    onChange={(event) => onPageSizeChange(event.target.value)}
                    sx={{ minWidth: 120, height: '40px', marginRight: 2 }}
                  >
                    {[10, 25, 50].map((size) => (
                      <MenuItem key={size} value={size}>
                        {size}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Box display="flex" alignItems="center">
                  <button
                    className={uiClasses.blueButton}
                    onClick={() => onPageChange(page - 1)}
                    disabled={page === 0}
                    style={{ marginRight: '8px' }}
                  >
                    Previous
                  </button>
                  <Pagination
                    sx={{
                      '& .MuiPaginationItem-root': {
                        '&:hover': {
                          backgroundColor: 'rgba(60, 60, 211, 0.2)',
                        },
                      },
                      '& .Mui-selected': {
                        backgroundColor: 'rgba(60, 60, 211)',
                        '&:hover': {
                          backgroundColor: 'rgba(60, 60, 211)',
                        },
                      },
                    }}
                    count={totalPages}
                    page={page + 1}
                    siblingCount={1}
                    boundaryCount={1}
                    shape="rounded"
                    color="primary"
                    onChange={handlePageChange}
                    hideNextButton
                    hidePrevButton
                  />
                  <button
                    className={uiClasses.blueButton}
                    onClick={() => onPageChange(page + 1)}
                    disabled={page >= totalPages - 1}
                    style={{ marginLeft: '8px' }}
                  >
                    Next
                  </button>
                </Box>
              </Box>
            ),
          }}
          disableSelectionOnClick
          columns={columns}
        />
      </Paper>
    </Box>
  );
};

export default DataTable;
