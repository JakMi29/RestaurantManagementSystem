import { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import uiClasses from '../../../components/ux/Ui.module.css';
import DataTable from '../../../components/ux/DataTable';
import { SortModel } from './OrdersTables';
import { getMealsTable } from '../../../api/Statistic';
import { OrderMealTableInterface, OrderMealTableResponse } from '../../../interfaces/OrderMealsTable';


const MealsTable = () => {
  const [rows, setRows] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [pageSize, setPageSize] = useState<number>(10);
  const [page, setPage] = useState<number>(0);
  const navigate = useNavigate();
  const [totalPages, setTotalPages] = useState<number>(0);
  const [sortModel, setSortModel] = useState<SortModel[]>([]);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const period: string = queryParams.get("period") ?? "";

  const handleChangeSortModel = (sortModel: SortModel[]) => {
    setSortModel(sortModel)
  }
  const fetchMeals = useCallback(async (page: number, pageSize: number, period: string, sortModel: SortModel[]) => {
    setLoading(true);
    try {
      const data: OrderMealTableResponse = await getMealsTable(page, pageSize, period, sortModel)
      setRows(data.content.map((orderMeal: OrderMealTableInterface) => ({
        id: orderMeal.mealName,
        mealName: orderMeal.mealName,
        mealPrice: orderMeal.mealPrice,
        quantity: orderMeal.quantity,
        totalPrice: orderMeal.totalPrice,
        time: orderMeal.time,
      })));
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  }, [period, sortModel]);

  useEffect(() => {
    fetchMeals(page, pageSize, period, sortModel);
  }, [page, pageSize, period, fetchMeals]);

  const columns = [
    { field: 'mealName', headerName: 'Meal name', width: 150, sortable: false, filterable: false },
    { field: 'mealPrice', headerName: 'Meal price', width: 200, sortable: false, filterable: false, renderCell: (params: any) => (params.value + " USD") },
    { field: 'quantity', headerName: 'Quantity', width: 200, sortable: false, filterable: false },
    { field: 'totalPrice', headerName: 'Total price', width: 150, sortable: false, filterable: false, renderCell: (params: any) => (params.value + " USD") },
    { field: 'time', headerName: 'Average meal prepare time', width: 180, sortable: false, filterable: false, renderCell: (params: any) => (params.value + " min") },
  ];

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setPage(0);
  };

  return (
    <Box sx={{ padding: 1 }}>
      <Typography variant="h4" sx={{ marginBottom: 3, marginTop: 2, color: "rgba(60, 60, 211,1)", fontWeight: "bold" }}>
        Meals
      </Typography>
      <DataTable
        onSortModelChange={handleChangeSortModel}
        rows={rows}
        columns={columns}
        totalPages={totalPages}
        loading={loading}
        page={page}
        pageSize={pageSize}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
      />
    </Box>
  );
};

export default MealsTable;