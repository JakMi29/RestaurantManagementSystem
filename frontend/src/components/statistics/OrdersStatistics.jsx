import React from 'react';
import { Box, Grid, Paper, Typography } from '@mui/material';
import ChartComponent from './ChartComponent';



const OrdersStatistics = ({ statistics }) => {
  return (
    <Box sx={{ padding: 4 }}>
      <Grid container spacing={2} justifyContent="space-between" alignItems="center">
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} sx={{ padding: 2, textAlign: 'center' }}>
            <Typography variant="subtitle1">Average daily income</Typography>
            <Typography variant="h5">{statistics.averageIncome} USD</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} sx={{ padding: 2, textAlign: 'center' }}>
            <Typography variant="subtitle1">Total Income</Typography>
            <Typography variant="h5">{statistics.totalIncome} USD</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} sx={{ padding: 2, textAlign: 'center' }}>
            <Typography variant="subtitle1">Total Customers</Typography>
            <Typography variant="h5">{statistics.totalCustomers}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} sx={{ padding: 2, textAlign: 'center' }}>
            <Typography variant="subtitle1">Average daily customers</Typography>
            <Typography variant="h5">{statistics.averageCustomers}</Typography>
          </Paper>
        </Grid>
      </Grid>

      <Box sx={{ marginTop: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <ChartComponent
              dataset={statistics.dailyStatistics}
              xLabel="date"
              yLabel="Total Orders"
              title="Orders Chart"
              dataKey="totalOrders"
              labelKey="date"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <ChartComponent
              dataset={statistics.dailyStatistics}
              xLabel="date"
              yLabel="Total Customers"
              title="Customers Chart"
              dataKey="totalCustomers"
              labelKey="date"
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default OrdersStatistics;