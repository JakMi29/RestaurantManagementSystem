import { DataGrid, GridSortModel } from '@mui/x-data-grid';
import uiClasses from '../ux/Ui.module.css';
import AssessmentIcon from '@mui/icons-material/Assessment';
import { Box, FormControl, InputLabel, MenuItem, Pagination, Paper, Select } from '@mui/material';
import { SortModel } from "../../pages/statistic/components/OrdersTables";

interface DataTableProps {
  columns: any;
  rows: any[];
  loading: boolean;
  page: number;
  pageSize: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
  onSortModelChange: (sortModel: SortModel[]) => void;
}

const DataTable = ({
  columns,
  rows,
  loading,
  page,
  pageSize,
  totalPages,
  onPageChange,
  onPageSizeChange,
  onSortModelChange
}: DataTableProps) => {

  const CustomNoData = () => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
      <AssessmentIcon sx={{ fontSize: 100, color: 'rgba(60, 60, 211, 1)' }} />
      <h3 style={{ color: 'rgba(60, 60, 211, 1)' }}>No Data Available</h3>
    </div>
  );

  const handleSortModelChange = (model: GridSortModel) => {
    const newSortModel = model.map((item) => ({
      field: item.field,
      sort: item.sort as 'asc' | 'desc',
    }))
    onSortModelChange(newSortModel);
  }
  const handlePageChange = (_: React.ChangeEvent<unknown>, newPage: number) => {
    onPageChange(newPage - 1);
  };

  return (
      <Paper elevation={3} sx={{ padding: 1, borderRadius: 2, height: "600px"}}>
        <DataGrid
        sx={{border:"none"}}
          sortingMode="server"
          onSortModelChange={handleSortModelChange}
          className="table"
          rows={rows}
          rowCount={rows.length}
          loading={loading}
          pageSizeOptions={[10, 25, 50]}
          pagination
          paginationMode="server"
          slots={{
            noRowsOverlay: CustomNoData,
            pagination: () => (
              <Box display="flex" alignItems="center" justifyContent="space-between" padding={2} gap={4}>
                <FormControl variant="outlined" sx={{ minWidth: "200px", marginLeft: 'auto' }}>
                  <InputLabel id="size-label">Items Per Page</InputLabel>
                  <Select
                    labelId="size-label"
                    label="Items Per Page"
                    value={pageSize}
                    onChange={(event) => onPageSizeChange(Number(event.target.value))}
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
                        '&:hover': { backgroundColor: 'rgba(60, 60, 211, 0.2)' },
                        '&.Mui-selected': { backgroundColor: 'rgba(60, 60, 211, 0.2)' },
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
          disableRowSelectionOnClick
          columns={columns}
        />
      </Paper>
  );
};

export default DataTable;
