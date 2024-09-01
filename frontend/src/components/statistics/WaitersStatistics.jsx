import React from 'react';
import { Box, Grid, Paper, Typography } from '@mui/material';
import ChartComponent from './ChartComponent';



const MealsStatistics = ({ statistics }) => {
  console.log(statistics)
  return (
    <Box sx={{ padding: 4 }}>
      <Grid container spacing={2} justifyContent="space-between" alignItems="center">
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} sx={{ padding: 2, textAlign: 'center' }}>
            <Typography variant="subtitle1">Average daily sold meals</Typography>
            <Typography variant="h5">{statistics.averageDailySoldMeals}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} sx={{ padding: 2, textAlign: 'center' }}>
            <Typography variant="subtitle1">Total sold meals</Typography>
            <Typography variant="h5">{statistics.totalSoldMeals}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} sx={{ padding: 2, textAlign: 'center' }}>
            <Typography variant="subtitle1">Average meals per order</Typography>
            <Typography variant="h5">{statistics.averageMealsPerOrder}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} sx={{ padding: 2, textAlign: 'center' }}>
            <Typography variant="subtitle1">Average meal preapering time</Typography>
            <Typography variant="h5">{statistics.averagePrepareMealTime}</Typography>
          </Paper>
        </Grid>
      </Grid>

      <Box sx={{ marginTop: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <ChartComponent
              dataset={statistics.dailyStatistics}
              xLabel="date"
              yLabel="quantity"
              title="Ordered meals"
              dataKey="quantity"
              labelKey="date"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <ChartComponent
              dataset={statistics.dailyStatistics}
              xLabel="date"
              yLabel="time"
              title="Average preapare meal time"
              dataKey="duration"
              labelKey="date"
            />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <ChartComponent
              dataset={statistics.mostSalesMeal}
              xLabel="name"
              yLabel="quantity"
              title="Most sales meal"
              dataKey="quantity"
              labelKey="name"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <ChartComponent
              dataset={statistics.highestIncomeMeal}
              xLabel="name"
              yLabel="price"
              title="Highest income meal"
              dataKey="price"
              labelKey="name"
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default MealsStatistics;