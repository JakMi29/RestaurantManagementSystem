import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { CircularProgress, Box, Grid, Paper } from '@mui/material';
import DataTable from '../table/DataTable';
import { getAuthToken } from '../../util/auth';
import uiClasses from '../ui/Ui.module.css';

const OrdersTableContainer = ({ currentPeriod }) => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(0);
  const navigate = useNavigate();
  const [totalPages, setTotalPages] = useState(0);
  const [sortModel, setSortModel] = useState([]);

  const handleChangeSortModel = (sortModel) => {
    setSortModel(sortModel)
  }

  console.log(sortModel)

  const fetchOrders = useCallback(async (page, pageSize, currentPeriod, sortModel) => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:8080/api/restaurantManagementSystem/order/all?restaurantName=Italiano&period=${currentPeriod}&pageSize=${pageSize}&pageNumber=${page}${sortModel.length > 0 ? `&sortField=${sortModel[0].field}&sortType=${sortModel[0].sort}` : ''}`,
        {
          headers: {
            'Authorization': 'Bearer ' + getAuthToken(),
          },
        }
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setRows(
        data.content.map((order) => ({
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
      setTotalPages(data.totalPages)
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  }, [currentPeriod, setSortModel]);

  useEffect(() => {
    fetchOrders(page, pageSize, currentPeriod, sortModel);
  }, [page, pageSize, currentPeriod, fetchOrders, sortModel]);

  const columns = [
    { field: 'number', headerName: 'Order Number', width: 150, sortable: false, filterable: false },
    { field: 'waiterEmail', headerName: 'Waiter Email', width: 200, sortable: false, filterable: false },
    { field: 'tableName', headerName: 'Table', width: 200, filterable: false,sortable: false, },
    { field: 'price', headerName: 'Price', width: 150, type: 'number', filterable: false, renderCell: (params) => (params.value + " USD") },
    { field: 'customerQuantity', headerName: 'Customer Quantity', width: 180, filterable: false },
    { field: 'meals', headerName: 'Meals quantity', width: 180, filterable: false,sortable: false, },
    { field: 'completedDateTime', headerName: 'Complete time', width: 180, filterable: false },
    { field: 'receivedDateTime', headerName: 'Receive time', width: 180, filterable: false },
    { field: 'duration', headerName: 'Duration', width: 180, filterable: false,sortable: false, renderCell: (params) => (params.value + " min") },
    {
      field: 'details',
      headerName: 'Details',
      width: 150,
      renderCell: (params) => (
        <button className={uiClasses.blueButton}
          onClick={() => navigate(`/statistics/order?number=${params.row.id}`)}>
          Details
        </button>
      ),
    },
  ];

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handlePageSizeChange = (newPageSize) => {
    setPageSize(newPageSize);
    setPage(0);
  };

  return (
    <DataTable
      onSortModelChange={handleChangeSortModel}
      header={"Orders"}
      rows={rows}
      columns={columns}
      totalPages={totalPages}
      loading={loading}
      page={page}
      pageSize={pageSize}
      onPageChange={handlePageChange}
      onPageSizeChange={handlePageSizeChange}
    />
  )
};

export default OrdersTableContainer;
