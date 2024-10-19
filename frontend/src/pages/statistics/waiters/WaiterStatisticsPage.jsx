import React, { Suspense, useState } from 'react';
import { Await, defer, useLoaderData, useLocation, useNavigate } from 'react-router-dom';
import { CircularProgress, Box } from '@mui/material';
import { getAuthToken } from '../../../util/auth';
import classes from '../../waiters/WaitersPage.module.css';
import DialogComponent from '../../../components/dialogs/DialogComponent';
import uiClasses from '../../../components/ui/Ui.module.css';
import WaiterStatistic from '../../../components/waiters/WaiterStatistics';
import { getEmail, getRestaurantName, getRole } from '../../../util/data';

const WaiterStatisticsPage = () => {
  const { waiter } = useLoaderData();
  const [pageNumber, setPageNumber] = useState(0);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [searchTerm, setSearchTerm] = useState(queryParams.get('search') || '');
  const navigate = useNavigate()


  return (
    <>
      <Suspense fallback={<p style={{ textAlign: 'center' }}><CircularProgress /></p>}>
        <Await resolve={waiter}>
          {(waiter) => (
            <>
            </>
          )}
        </Await>
      </Suspense>
    </>
  );
};

export default WaiterStatisticsPage;

async function loadWaiter(email,period) {

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
    waiters: await loadWaiter(email,period),
  });
}