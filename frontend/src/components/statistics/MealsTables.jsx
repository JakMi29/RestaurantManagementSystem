import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useOutletContext } from 'react-router-dom';
import { Container, Typography, CircularProgress, Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { getAuthToken } from '../../util/auth';


const MealsTable = ({ currentPeriod }) => {

  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8080/api/restaurantManagementSystem/admin/statistics/table/meals?restaurantName=Italiano&period=${currentPeriod}`, {
        headers: {
          'Authorization': 'Bearer ' + getAuthToken()
        },
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setRows(data.map(orderMeal => ({
        id: orderMeal.mealName,
        mealName: orderMeal.mealName,
        mealPrice: orderMeal.mealPrice,
        quantity: orderMeal.quantity,
        totalPrice: orderMeal.totalPrice,
        time: orderMeal.time,
      })));
      setTotalRows(data.totalElements);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  }, [currentPeriod]);

  useEffect(() => {
    fetchOrders();
  }, [currentPeriod, fetchOrders]);

  const columns = [
    { field: 'mealName', headerName: 'Meal name', width: 150 },
    { field: 'mealPrice', headerName: 'Meal price', width: 200 },
    { field: 'quantity', headerName: 'Quantity', width: 200 },
    { field: 'totalPrice', headerName: 'Total price', width: 150 },
    { field: 'time', headerName: 'Average meal prepare time', width: 180 },
  ];

  return (
    <div style={{ height: 600, width: '70%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        pagination
        loading={loading}
        paginationMode="server"
        rowCount={totalRows}
        onPageSizeChange={(newPageSize) => {
          setPageSize(newPageSize);
          setPage(0);
        }}
        onPageChange={(newPage) => {
          setPage(newPage);
        }}
        disableSelectionOnClick
      />
    </div>
  );
};

export default MealsTable;