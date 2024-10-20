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

const MealsStatisticsCharts = ({ statistics }) => {
  return (
      <Box sx={{ marginTop: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={chartPaperStyle}>
            <ChartComponent
              dataset={statistics.dailyStatistics}
              xLabel="date"
              yLabel="quantity"
              title="Ordered meals"
              dataKey="quantity"
              labelKey="date"
            />
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={chartPaperStyle}>
            <ChartComponent
              dataset={statistics.dailyStatistics}
              xLabel="date"
              yLabel="time"
              title="Average preapare meal time"
              dataKey="duration"
              labelKey="date"
            />
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={chartPaperStyle}>
            <ChartComponent
              dataset={statistics.mostSalesMeal}
              xLabel="name"
              yLabel="quantity"
              title="Most sales meal"
              dataKey="quantity"
              labelKey="name"
            />
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={chartPaperStyle}>
            <ChartComponent
              dataset={statistics.highestIncomeMeal}
              xLabel="name"
              yLabel="price"
              title="Highest income meal"
              dataKey="price"
              labelKey="name"
            />
            </Paper>
          </Grid>
        </Grid>
      </Box>
  );
};

export default MealsStatisticsCharts;