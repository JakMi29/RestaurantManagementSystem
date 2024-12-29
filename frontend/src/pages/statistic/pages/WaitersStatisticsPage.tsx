import { Await, defer, json, LoaderFunction, useLoaderData, useLocation, useNavigate } from "react-router-dom";
import uiClasses from "../../../components/ux/Ui.module.css"
import classes from "../StatisticPage.module.css"
import { Suspense, useState } from "react";
import { CircularProgress, TextField } from "@mui/material";
import { WaitersLoaderData, WaitersStatisticsData, WaitersStatisticsResponse } from "../../../interfaces/statistics/WaitersStatistics";
import { waitersStatistics } from "../../../api/Statistic";
import WaitersStatistic from "../components/WaitersStatistics";
import Grid from '@mui/material/Grid2';

const WaitersStatisticsPage = () => {
  const { statistics }: { statistics: WaitersStatisticsResponse } = useLoaderData() as { statistics: WaitersStatisticsResponse };
  const [pageNumber, setPageNumber] = useState(0);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [searchTerm, setSearchTerm] = useState(queryParams.get('search') || '');
  const navigate = useNavigate()
  const period = queryParams.get('period')

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const search = event.target.value
    setSearchTerm(search);
    search === "" ? navigate(`/statistics/waiters?pageNumber=0&pageSize=9&period=${period}`) :
      navigate(`/statistics/waiters?pageNumber=${pageNumber}&pageSize=9&period=${period}${search ? `&searchTerm=${search}` : ""}`);
  };
  const handleNextPage = () => {
    const page = pageNumber + 1;
    setPageNumber(page);
    navigate(`/statistics/waiters?pageNumber=${page}&pageSize=9&period=${period}${searchTerm ? `&searchTerm=${searchTerm}` : ""}`);
  };
  const handlePreviousPage = () => {
    if (pageNumber > 0) {
      const page = pageNumber - 1;
      setPageNumber(page);
      navigate(`/statistics/waiters?pageNumber=${page}&pageSize=9&period=${period}${searchTerm ? `&searchTerm=${searchTerm}` : ""}`);
    }
  }

  return (
    <>
      <div style={{ display: "flex", marginLeft: "auto", marginRight: "20px" }}>
        <TextField
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          label="Search by name"
          size="small"
        />
      </div>
      <Suspense fallback={<p style={{ textAlign: 'center' }}><CircularProgress /></p>}>
        <Await resolve={statistics}>
          {(statistics: WaitersStatisticsResponse) => (
            <div className={classes.contentContainer}>
              <Grid container spacing={1} sx={{ width: "100%" }}>
                {
                  statistics.content.map((waiter: WaitersStatisticsData) => (
                    <WaitersStatistic key={waiter.waiter.email} waiter={waiter} period={period} />
                  ))}
              </Grid>
              <div className={classes.paginationContainer}>
                {!statistics.first && (
                  <button
                    className={uiClasses.blueButton}
                    onClick={handlePreviousPage}
                  >
                    Previous
                  </button>
                )}
                {!statistics.last && (
                  <button
                    className={uiClasses.blueButton}
                    style={{ marginLeft: "auto" }}
                    onClick={handleNextPage}
                  >
                    Next
                  </button>
                )}
              </div>
            </div>
          )}
        </Await>
      </Suspense>
    </>
  );
};

export default WaitersStatisticsPage;

async function loadWaiters(pageNumber?: string, pageSize?: string, period?: string, searchTerm?: string): Promise<WaitersStatisticsResponse> {
  const response = await waitersStatistics(pageNumber, pageSize, period, searchTerm)
  if (!response.ok) {
    throw json(
      { message: 'Could not fetch statistics.' },
      { status: 500 }
    );
  }
  return await response.json();
}

export const loader: LoaderFunction<WaitersLoaderData> = async ({ request }) => {
  const url = new URL(request.url);
  const pageNumber = url.searchParams.get("pageNumber") ?? undefined;
  const searchTerm = url.searchParams.get("searchTerm") ?? undefined;
  const period = url.searchParams.get("period") ?? undefined;
  const pageSize = url.searchParams.get("pageSize") ?? undefined;
  return defer({
    statistics: loadWaiters(pageNumber, pageSize, period, searchTerm),
  });
}
