import React from 'react';
import { Box, Grid, Paper, Typography } from '@mui/material';
import OrdersStatisticsCharts from './OrdersStatisticsCharts';
import OrdersStatisticsData from './OrdersStatisticsData';

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
      <OrdersStatisticsData statistics={statistics} />
      <Typography variant="h4" sx={{ marginTop: 5, marginBottom: 3, color: "rgba(60, 60, 211,1)", fontWeight: "bold" }}>
        Charts
      </Typography>
      <OrdersStatisticsCharts statistics={statistics.dailyStatistics} />
    </Box>

  );
};

export default OrdersStatistics;