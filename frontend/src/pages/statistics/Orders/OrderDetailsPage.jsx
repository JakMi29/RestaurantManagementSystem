import React, { Suspense } from 'react';
import { Await, defer, useLoaderData, useLocation } from 'react-router-dom';
import { CircularProgress, Box } from '@mui/material';
import { getAuthToken } from '../../../util/auth';
import OrderDetails from '../../../components/statistics/OrderDetails';

const OrderDetailsPage = () => {
  const { order } = useLoaderData();
  return (
    <>
      <Suspense fallback={<p style={{ textAlign: 'center' }}><CircularProgress /></p>}>
        <Await resolve={order}>
          {(order) => <OrderDetails order={order} />}
        </Await>
      </Suspense>
    </>
  );
};

export default OrderDetailsPage;

async function loadOrder(number) {
  const token = getAuthToken();

  const response = await fetch(`http://localhost:8080/api/restaurantManagementSystem/order?number=${number}`, {
    headers: {
      'Authorization': 'Bearer ' + token
    }
  });
  if (!response.ok) {
    throw json(
      { message: 'Could not fetch order.' },
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
  const number = url.searchParams.get("number");

  return defer({
    order: loadOrder(number),
  });
}