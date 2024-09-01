import React, { useState, useEffect, useCallback, Suspense } from 'react';
import { Await, defer, useLoaderData, useLocation, useOutletContext } from 'react-router-dom';
import { Container, Typography, CircularProgress, Box } from '@mui/material';
import { getAuthToken } from '../../../util/auth';
import OrdersTable from '../../../components/statistics/OrdersTables';
import OrdersStatistics from '../../../components/statistics/OrdersStatistics';

const OrdersStatisticsPage = () => {
  const { statistics } = useLoaderData();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const currentPeriod = queryParams.get('period');
  return (
    <>
      <Suspense fallback={<p style={{ textAlign: 'center' }}><CircularProgress /></p>}>
        <Await resolve={statistics}>
      {(statistics)=><OrdersStatistics statistics={statistics}/>}
        </Await>
      </Suspense>
      <OrdersTable currentPeriod={currentPeriod} />
    </>
  );
};

export default OrdersStatisticsPage;

async function loadStatistic(period) {
  const token = getAuthToken();

  const response = await fetch(`http://localhost:8080/api/admin/statistics/orders?restaurantName=Italiano&period=${period}`, {
    headers: {
      'Authorization': 'Bearer ' + token
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
  const period = url.searchParams.get("period");

  return defer({
    statistics: loadStatistic(period),
  });
}