import { Suspense} from 'react';
import { Await, defer, json, LoaderFunction, useLoaderData, useNavigate } from 'react-router-dom';
import { CircularProgress, Box, Paper, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import uiClasses from '../../../components/ux/Ui.module.css';
import OrdersStatisticsCharts from '../components/OrdersStatisticsCharts';
import MealsStatisticsCharts from '../components/MealsStatisticsCharts';
import classes from "../StatisticPage.module.css"
import { waiterStatistics } from '../../../api/Statistic';
import { paperStyle } from '../../../theme/theme';
import { WaiterLoaderData, WaiterStatisticsResponse } from '../../../interfaces/statistics/WaiterStatistics';
import OrdersStatistics from '../components/OrdersStatistics';
import { MealsStatistics } from '../components/MealsStatistics';

const WaiterStatisticsPage = () => {
  const { statistics }: { statistics: WaiterStatisticsResponse } = useLoaderData() as { statistics: WaiterStatisticsResponse };
  const navigate = useNavigate()
  return (
    <div className={classes.pageContent}>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button className={uiClasses.blueButton} onClick={() => navigate(-1)}>
          Back
        </button>
      </div>
      <Suspense fallback={<p style={{ textAlign: 'center' }}><CircularProgress /></p>}>
        <Await resolve={statistics}>
          {(statistics:WaiterStatisticsResponse) => (
              <Box sx={{ padding: 4 }}>
                <Typography variant="h4" sx={{ color: "rgba(60, 60, 211,1)", fontWeight: "bold" }}>
                  Waiter
                </Typography>
                <Grid container spacing={3} justifyContent="center">
                  <Grid size={4}>
                    <Paper elevation={4} sx={paperStyle}>
                      <Typography variant="h6">Name </Typography>
                      <Typography variant="h4">{statistics.waiter.name} {statistics.waiter.surname}</Typography>
                    </Paper>
                  </Grid>
                  <Grid size={4}>
                    <Paper elevation={4} sx={paperStyle}>
                      <Typography variant="h6">Email</Typography>
                      <Typography variant="h4">{statistics.waiter.email}</Typography>
                    </Paper>
                  </Grid>
                  <Grid size={4}>
                    <Paper elevation={4} sx={paperStyle}>
                      <Typography variant="h6">Salary</Typography>
                      <Typography variant="h4">{statistics.waiter.salary} USD</Typography>
                    </Paper>
                  </Grid>
                </Grid>
                <OrdersStatistics statistics={statistics.orderStatistic} />
                <MealsStatistics statistics={statistics.mealsStatistic} />
                <OrdersStatisticsCharts statistics={statistics.orderStatistic.dailyStatistics} />
                <MealsStatisticsCharts statistics={statistics.mealsStatistic} />
              </Box>
          )}
        </Await>
      </Suspense>
    </div>
  );
};

export default WaiterStatisticsPage;

async function loadWaiter(email?:string, period?:string): Promise<WaiterStatisticsResponse> {

  const response = await waiterStatistics(email, period)
  if (!response.ok) {
    throw json(
      { message: 'Could not fetch statistics.' },
      {
        status: 500,
      }
    );
  } else {
    return await response.json();
  }
}

export const loader: LoaderFunction<WaiterLoaderData> = async ({ request })=> {
  const url = new URL(request.url);
  const email = url.searchParams.get("email")?? undefined;
  const period = url.searchParams.get("period")?? undefined;

  return defer({
    statistics: await loadWaiter(email, period),
  });
}