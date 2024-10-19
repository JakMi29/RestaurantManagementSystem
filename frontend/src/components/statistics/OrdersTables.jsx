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

  const fetchOrders = useCallback(async (page, pageSize, currentPeriod) => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:8080/api/restaurantManagementSystem/order/all?restaurantName=Italiano&period=${currentPeriod}&pageSize=${pageSize}&pageNumber=${page}`,
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
          durationTime: order.durationTime,
        }))
      );
      setTotalPages(data.totalPages)
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  }, [currentPeriod]);

  useEffect(() => {
    fetchOrders(page, pageSize, currentPeriod);
  }, [page, pageSize, currentPeriod, fetchOrders]);

  const columns = [
    { field: 'number', headerName: 'Order Number', width: 150 },
    { field: 'waiterEmail', headerName: 'Waiter Email', width: 200 },
    { field: 'tableName', headerName: 'Table', width: 200 },
    { field: 'price', headerName: 'Price', width: 150, type: 'number' },
    { field: 'customerQuantity', headerName: 'Customer Quantity', width: 180 },
    { field: 'meals', headerName: 'Meals quantity', width: 180 },
    { field: 'completedDateTime', headerName: 'Complete time', width: 180 },
    { field: 'receivedDateTime', headerName: 'Receive time', width: 180 },
    { field: 'durationTime', headerName: 'Duration', width: 180 },
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
