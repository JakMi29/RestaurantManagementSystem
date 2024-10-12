import React, { Suspense, useState } from 'react';
import { Await, defer, useLoaderData, useLocation, useNavigate } from 'react-router-dom';
import { CircularProgress, Box } from '@mui/material';
import { getAuthToken } from '../../util/auth';
import Waiter from '../../components/waiters/Waiter';
import classes from './WaitersPage.module.css';
import DialogComponent from '../../components/dialogs/DialogComponent';
import uiClasses from '../../components/ui/Ui.module.css';
import WaiterStatistic from '../../components/waiters/WaiterStatistics';

const WaitersPage = () => {
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
      <DialogComponent open={openForm} onClose={handleCloseDialog} name={"waiter"} />
      <div style={{ display: "flex", alignItems: "center", marginTop: "20px", justifyContent: "space-between" }}>
        <button className={uiClasses.blueButton} style={{ padding: "10px" }} onClick={() => {setOpenForm(true)}}>
          New
        </button>
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
                  <Waiter key={waiter.email} waiter={waiter} />
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

export default WaitersPage;

async function loadWaiters(pageNumber, pageSize, searchTerm) {

  const response = await fetch(`http://localhost:8080/api/restaurantManagementSystem/waiters/all?restaurantName=${"Italiano"}&pageNumber=${pageNumber}&pageSize=${pageSize}${searchTerm ? `&searchTerm=${searchTerm}` : ''}`, {
    headers: {
      'Authorization': 'Bearer ' + getAuthToken()
    }
  });
  if (!response.ok) {
    throw json(
      { message: 'Could not fetch waiter.' },
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
  const pageSize = 12;

  return defer({
    waiters: await loadWaiters(pageNumber, pageSize, searchTerm),
  });
}