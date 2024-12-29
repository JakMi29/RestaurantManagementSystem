import { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import uiClasses from '../../../components/ux/Ui.module.css';
import DataTable from '../../../components/ux/DataTable';
import { getOrders } from '../../../api/Statistic';
import { Order, OrderResponse } from '../../../interfaces/OrdersTable';
import { Box, Typography } from '@mui/material';


export interface SortModel {
  field: string;
  sort: 'asc' | 'desc';
}

const OrdersTable = () => {
  const [rows, setRows] = useState<Order[]>([]);
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
    setSortModel(sortModel);
  };

  const fetchOrders = useCallback(async (page: number, pageSize: number, period: string, sortModel: SortModel[]) => {
    setLoading(true);
    try {
      const data: OrderResponse = await getOrders(page, pageSize, period, sortModel)
      setRows(
        data.content.map((order: any) => ({
          id: order.number,
          number: order.number,
          waiterEmail: order.waiter.email,
          tableName: order.tableName,
          price: order.price,
          customerQuantity: order.customerQuantity,
          meals: order.meals.length,
          completedDateTime: order.completedDateTime,
          receivedDateTime: order.receivedDateTime,
          duration: order.durationTime,
        }))
      );
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  }, [period, sortModel]);

  useEffect(() => {
    fetchOrders(page, pageSize, period, sortModel);
  }, [fetchOrders,page, pageSize, period, fetchOrders, sortModel]);

  const columns = [
    { field: 'number', headerName: 'Order Number', width: 150, sortable: false, filterable: false },
    { field: 'waiterEmail', headerName: 'Waiter Email', width: 200, sortable: false, filterable: false },
    { field: 'tableName', headerName: 'Table', width: 200, filterable: false, sortable: false },
    { field: 'price', headerName: 'Price', width: 150, type: 'number', filterable: false, renderCell: (params: any) => (params.value + " USD") },
    { field: 'customerQuantity', headerName: 'Customer Quantity', width: 180, filterable: false },
    { field: 'meals', headerName: 'Meals quantity', width: 180, filterable: false, sortable: false },
    { field: 'completedDateTime', headerName: 'Complete time', width: 180, filterable: false },
    { field: 'receivedDateTime', headerName: 'Receive time', width: 180, filterable: false },
    { field: 'duration', headerName: 'Duration', width: 180, filterable: false, sortable: false, renderCell: (params: any) => (params.value + " min") },
    {
      field: 'details',
      headerName: 'Details',
      width: 150,
      renderCell: (params: any) => (
        <button className={uiClasses.blueButton}
          onClick={() => navigate(`/statistics/order?number=${params.row.id}`)}>
          Details
        </button>
      ),
    },
  ];
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setPage(0);
  };

  return (
    <Box sx={{ padding: 1}}>
      <Typography variant="h4" sx={{ marginBottom: 3, marginTop: 2, color: "rgba(60, 60, 211,1)", fontWeight: "bold" }}>
        Orders
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

export default OrdersTable;
