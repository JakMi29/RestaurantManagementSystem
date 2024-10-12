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
  const { waiters } = useLoaderData();
  const [pageNumber, setPageNumber] = useState(0);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [searchTerm, setSearchTerm] = useState(queryParams.get('search') || '');
  const navigate = useNavigate()
  const [openForm, setOpenForm] = useState(false);

  const handleCloseDialog = () => {
    setOpenForm(false)
  }

  const handleSearchChange = (event) => {
    const search = event.target.value

    setSearchTerm(search);
    search === "" ? navigate(`/waiters&pageNumber=0&pageSize=12`) :
      navigate(`/waiters?pageNumber=${pageNumber}&pageSize=12${search ? `&searchTerm=${search}` : ""}`);
  };

  const handleNextPage = () => {
    const page = pageNumber + 1;
    setPageNumber(page);
    navigate(`/waiters/all/&pageNumber=${page}&pageSize=12`);
  };
  const handlePreviousPage = () => {
    if (pageNumber > 0) {
      const page = pageNumber - 1;
      setPageNumber(page);
      navigate(`/waiters/all?pageNumber=${page}&pageSize=12${searchTerm ? `&searchTerm=${searchTerm}` : ""}`);
    }
  }

  return (
    <>
      <div style={{ display: "flex", marginTop: "20px"}}>
        <form style={{ marginLeft: "auto" }}>
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search by name..."
          />
        </form>
      </div>
      <Suspense fallback={<p style={{ textAlign: 'center' }}><CircularProgress /></p>}>
        <Await resolve={waiters}>
          {(waiters) => (
            <>
              <div className={classes.waitersContainer}>{
                waiters.content.map(waiter => (
                  <WaiterStatistic key={waiter.email} waiter={waiter} />
                ))}
              </div>
              <div>
                {!waiters.first && (
                  <button
                    style={{ position: "absolute", left: "80px", bottom: "30px" }}
                    onClick={handlePreviousPage}
                  >
                    Previous
                  </button>
                )}
                {!waiters.last && (
                  <button
                    style={{ position: "absolute", right: "80px", bottom: "30px" }}
                    onClick={handleNextPage}
                  >
                    Next
                  </button>
                )}
              </div>
            </>
          )}
        </Await>
      </Suspense>
    </>
  );
};

export default WaiterStatisticsPage;

async function loadWaiters(restaurantName,pageNumber, pageSize, searchTerm,period) {

  const response = await fetch(`http://localhost:8080/api/restaurantManagementSystem/admin/statistics/waiters?restaurantName=${restaurantName}&pageNumber=${pageNumber}&pageSize=${pageSize}${searchTerm ? `&searchTerm=${searchTerm}` : ''}&period=${period}`, {
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
  const pageNumber = url.searchParams.get("pageNumber");
  const searchTerm = url.searchParams.get("searchTerm");
  const period = url.searchParams.get("period");
  const restaurantName =getRestaurantName()
  const pageSize = 12;

  return defer({
    waiters: await loadWaiters(restaurantName,pageNumber, pageSize, searchTerm,period),
  });
}