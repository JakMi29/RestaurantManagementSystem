import React, { useCallback, useEffect, useState } from 'react';
import { Container, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useOutletContext } from 'react-router-dom';

const OrdersTable = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(0);

  const [currentPeriod] = useOutletContext();

  const fetchOrders = useCallback(async (page, pageSize) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8080/api/admin/order?restaurantName=Italiano&period=${currentPeriod}&pageSize=${pageSize}&pageNumber=${page}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setRows(data.content.map(order => ({
        id: order.number,
        number: order.number,
        waiterEmail: order.waiter.email,
        tableName: order.tableName,
        price: order.price,
        customerQuantity: order.customerQuantity,
        meals: order.meals.length
      })));
      setTotalRows(data.totalElements);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  }, [currentPeriod]);

  useEffect(() => {
    fetchOrders(page, pageSize);
  }, [page, pageSize, currentPeriod, fetchOrders]);

  const columns = [
    { field: 'number', headerName: 'Order Number', width: 150 },
    { field: 'waiterEmail', headerName: 'Waiter Email', width: 200 },
    { field: 'tableName', headerName: 'Table', width: 200 },
    { field: 'price', headerName: 'Price', width: 150, type: 'number' },
    { field: 'customerQuantity', headerName: 'Customer Quantity', width: 180 },
    { field: 'meals', headerName: 'Meals quantity', width: 180 }
  ];

  return (
      <div style={{ height: 600, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={pageSize}
          rowsPerPageOptions={[10, 20, 30]}
          pagination
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
          loading={loading}
        />
      </div>
  );
};

export default OrdersTable;