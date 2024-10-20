import React from 'react';
import { Box, Grid, Paper, Typography } from '@mui/material';
import ChartComponent from './ChartComponent';

const chartPaperStyle = {
  padding: 3,
  backgroundColor: "#ffffff",
  borderRadius: 2,
};

const OrdersStatisticsCharts = ({statistics}) => {
  return (
      <Box sx={{ marginTop: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={chartPaperStyle}>
              <ChartComponent
                dataset={statistics}
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
                dataset={statistics}
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
  );
};

export default OrdersStatisticsCharts;