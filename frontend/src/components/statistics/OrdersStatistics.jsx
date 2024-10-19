import React from 'react';
import { Box, Grid, Paper, Typography } from '@mui/material';
import ChartComponent from './ChartComponent';

const cardStyle = {
  padding: 3,
  textAlign: "center",
  borderRadius: 2,
};

const chartPaperStyle = {
  padding: 3,
  backgroundColor: "#ffffff",
  borderRadius: 2,
};

const OrdersStatistics = ({ statistics }) => {
  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" sx={{ marginBottom: 3, color: "rgba(60, 60, 211,1)", fontWeight: "bold" }}>
        Orders Statistics
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={4} sx={cardStyle}>
            <Typography variant="h6">Total Orders</Typography>
            <Typography variant="h4">{statistics.totalOrders}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={4} sx={cardStyle}>
            <Typography variant="h6">Average Daily Orders</Typography>
            <Typography variant="h4">{statistics.averageOrdersPerDay}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={4} sx={cardStyle}>
            <Typography variant="h6">Average Order Duration</Typography>
            <Typography variant="h4">{statistics.averageOrderDuration}</Typography>
          </Paper>
        </Grid>
      </Grid>

      <Typography variant="h4" sx={{ marginTop: 5, marginBottom: 3, color: "rgba(60, 60, 211,1)", fontWeight: "bold" }}>
        Customer Statistics
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={4} sx={cardStyle}>
            <Typography variant="h6">Total Customers</Typography>
            <Typography variant="h4">{statistics.totalCustomers}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={4} sx={cardStyle}>
            <Typography variant="h6">Average Daily Customers</Typography>
            <Typography variant="h4">{statistics.averageCustomersPerDay}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={4} sx={cardStyle}>
            <Typography variant="h6">Average Customers Per Order</Typography>
            <Typography variant="h4">{statistics.averageCustomersPerOrder}</Typography>
          </Paper>
        </Grid>
      </Grid>

      <Typography variant="h4" sx={{ marginTop: 5, marginBottom: 3, color: "rgba(60, 60, 211,1)", fontWeight: "bold" }}>
        Income Statistics
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={4} sx={cardStyle}>
            <Typography variant="h6">Total Income</Typography>
            <Typography variant="h4">{statistics.totalIncome} USD</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={4} sx={cardStyle}>
            <Typography variant="h6">Average Daily Income</Typography>
            <Typography variant="h4">{statistics.averageDailyIncome} USD</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={4} sx={cardStyle}>
            <Typography variant="h6">Average Income Per Order</Typography>
            <Typography variant="h4">{statistics.averageOrderIncome} USD</Typography>
          </Paper>
        </Grid>
      </Grid>
      <Typography variant="h4" sx={{ marginTop: 5, marginBottom: 3, color: "rgba(60, 60, 211,1)", fontWeight: "bold" }}>
        Charts
      </Typography>
      <Box sx={{ marginTop: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={chartPaperStyle}>
              <ChartComponent
                dataset={statistics.dailyStatistics}
                xLabel="Date"
                yLabel="Quantity"
                title="Orders Quantity"
                dataKey="totalOrders"
                labelKey="date"
              />
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={chartPaperStyle}>
              <ChartComponent
                dataset={statistics.dailyStatistics}
                title="Customers Quantity"
                xLabel="Date"
                yLabel="Quantity"
                dataKey="totalCustomers"
                labelKey="date"
              />
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>


  );
};

export default OrdersStatistics;