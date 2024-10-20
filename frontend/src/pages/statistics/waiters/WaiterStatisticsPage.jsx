import React, { Suspense, useState } from 'react';
import { Await, defer, useLoaderData, useLocation, useNavigate } from 'react-router-dom';
import { CircularProgress, Box, Paper, Typography, Grid } from '@mui/material';
import { getAuthToken } from '../../../util/auth';
import MealsStatistics from '../../../components/statistics/MealsStatistics';
import OrdersStatisticsData from '../../../components/statistics/OrdersStatisticsData';
import OrdersStatisticsCharts from '../../../components/statistics/OrdersStatisticsCharts';
import MealsStatisticsData from '../../../components/statistics/MealsStatisticsData';
import MealsStatisticsCharts from '../../../components/statistics/MealsStatisticsCharts';
const cardStyle = {
  padding: 2,
  textAlign: "center",
  borderRadius: 2,
};
const WaiterStatisticsPage = () => {
  const { waiter } = useLoaderData();

  return (
    <>
      <Suspense fallback={<p style={{ textAlign: 'center' }}><CircularProgress /></p>}>
        <Await resolve={waiter}>
          {(waiter) => (
            <>
              <Box sx={{ padding: 4 }}>
                <Typography variant="h4" sx={{ color: "rgba(60, 60, 211,1)", fontWeight: "bold" }}>
                  Waiter
                </Typography>
                <Grid container spacing={3} justifyContent="center">
                  <Grid item xs={12} sm={6} md={4}>
                    <Paper elevation={4} sx={cardStyle}>
                      <Typography variant="h6">Name </Typography>
                      <Typography variant="h4">{waiter.waiter.name} {waiter.waiter.surname}</Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <Paper elevation={4} sx={cardStyle}>
                      <Typography variant="h6">Email</Typography>
                      <Typography variant="h4">{waiter.waiter.email}</Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <Paper elevation={4} sx={cardStyle}>
                      <Typography variant="h6">Salary</Typography>
                      <Typography variant="h4">{waiter.waiter.salary} USD</Typography>
                    </Paper>
                  </Grid>
                </Grid>
                <OrdersStatisticsData statistics={waiter.orderStatistic} />
                <MealsStatisticsData statistics={waiter.mealsStatistic} />
                <Typography variant="h4" sx={{ marginTop: 5, marginBottom: 3, color: "rgba(60, 60, 211,1)", fontWeight: "bold" }}>
                  Charts
                </Typography>
                <OrdersStatisticsCharts statistics={waiter.orderStatistic.dailyStatistics} />
                <MealsStatisticsCharts statistics={waiter.mealsStatistic} />
              </Box>
            </>
          )}
        </Await>
      </Suspense>
    </>
  );
};

export default WaiterStatisticsPage;

async function loadWaiter(email, period) {

  const response = await fetch(`http://localhost:8080/api/restaurantManagementSystem/admin/statistics/waiter?email=${email}&period=${period}`, {
    headers: {
      'Authorization': 'Bearer ' + getAuthToken()
    }
  });
  if (!response.ok) {
    throw json(
      { message: 'Could not fetch statistics.' },
      {
        status: 500,
      }
    );
  } else {
    const resData = await response.json();
    return resData;
  }
}

export async function loader({ request }) {
  const url = new URL(request.url);
  const email = url.searchParams.get("email");
  const period = url.searchParams.get("period");

  return defer({
    waiter: await loadWaiter(email, period),
  });
}