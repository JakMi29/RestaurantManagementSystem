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

const MealsStatisticsData = ({ statistics }) => {
  return (
    <Box>
      <Typography variant="h4" sx={{ marginBottom: 3, color: "rgba(60, 60, 211,1)", fontWeight: "bold" }}>
        Meals Statistics
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={4} sx={cardStyle}>
            <Typography variant="h6">Average daily sold meals</Typography>
            <Typography variant="h4">{statistics.averageDailySoldMeals}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={4} sx={cardStyle}>
            <Typography variant="h6">Total sold meals</Typography>
            <Typography variant="h4">{statistics.totalSoldMeals}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={4} sx={cardStyle}>
            <Typography variant="h6">Average meals per order</Typography>
            <Typography variant="h4">{statistics.averageMealsPerOrder}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={4} sx={cardStyle}>
            <Typography variant="h6">Average meal preapering time</Typography>
            <Typography variant="h4">{statistics.averagePrepareMealTime}</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>

  );
};

export default MealsStatisticsData;