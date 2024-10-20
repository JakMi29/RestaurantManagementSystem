import React from 'react';
import { Box, Grid, Paper, Typography } from '@mui/material';
import ChartComponent from './ChartComponent';
import MealsStatisticsData from './MealsStatisticsData';
import MealsStatisticsCharts from './MealsStatisticsCharts';

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

const MealsStatistics = ({ statistics }) => {
  return (
    <Box sx={{ padding: 4 }}>
       <MealsStatisticsData statistics={statistics}/>
      <Typography variant="h4" sx={{ marginTop: 5, marginBottom: 3, color: "rgba(60, 60, 211,1)", fontWeight: "bold" }}>
        Charts
      </Typography>
      <MealsStatisticsCharts statistics={statistics}/>
    </Box>
  );
};

export default MealsStatistics;