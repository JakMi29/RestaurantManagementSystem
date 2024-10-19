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

const MealsStatistics = ({ statistics }) => {
  console.log(statistics)
  return (
    <Box sx={{ padding: 4 }}>
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
      <Typography variant="h4" sx={{ marginTop: 5, marginBottom: 3, color: "rgba(60, 60, 211,1)", fontWeight: "bold" }}>
        Charts
      </Typography>
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
    </Box>
  );
};

export default MealsStatistics;