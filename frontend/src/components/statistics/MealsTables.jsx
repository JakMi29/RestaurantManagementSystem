import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { CircularProgress, Box, Grid, Paper } from '@mui/material';
import DataTable from '../table/DataTable';
import { getAuthToken } from '../../util/auth';
import uiClasses from '../ui/Ui.module.css';


const MealsTable = ({ currentPeriod }) => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(0);
  const navigate = useNavigate();
  const [totalPages, setTotalPages] = useState(0);

  const fetchMeals = useCallback(async (page, pageSize, currentPeriod) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8080/api/restaurantManagementSystem/admin/statistics/table/meals?restaurantName=Italiano&period=${currentPeriod}&pageSize=${pageSize}&pageNumber=${page}`, {
        headers: {
          'Authorization': 'Bearer ' + getAuthToken()
        },
      });
      if (!response.ok) {
        throw new Error('Network response was not ok'); 
      }
      const data = await response.json();
      setRows(data.content.map(orderMeal => ({
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
  }, [currentPeriod]);

  useEffect(() => {
    fetchMeals(page, pageSize, currentPeriod);
  }, [page, pageSize, currentPeriod, fetchMeals]);

  const columns = [
    { field: 'mealName', headerName: 'Meal name', width: 150 },
    { field: 'mealPrice', headerName: 'Meal price', width: 200 },
    { field: 'quantity', headerName: 'Quantity', width: 200 },
    { field: 'totalPrice', headerName: 'Total price', width: 150 },
    { field: 'time', headerName: 'Average meal prepare time', width: 180 },
    {
      field: 'details',
      headerName: 'Details',
      width: 150,
      renderCell: (params) => (
        <button className={uiClasses.blueButton}
          onClick={() => navigate(`/statistics/meal?name=${params.row.id}`)}>
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
    header={"Meals"}
    rows={rows}
    columns={columns}
    totalPages={totalPages}
    loading={loading}
    page={page}
    pageSize={pageSize}
    onPageChange={handlePageChange}
    onPageSizeChange={handlePageSizeChange}
  />
  );
};

export default MealsTable;