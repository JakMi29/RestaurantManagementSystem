import { Await, defer, json, LoaderFunction, useLoaderData} from "react-router-dom";
import { mealsStatistics } from "../../../api/Statistic";
import { Box, CircularProgress } from "@mui/material";
import { Suspense } from "react";
import classes from "../StatisticPage.module.css"
import MealsTable from "../components/MealsTables";
import MealsStatisticsCharts from "../components/MealsStatisticsCharts";
import { MealsStatistics } from "../components/MealsStatistics";
import { MealsLoaderData } from "../../../interfaces/Meal";
import { MealsStatisticsData } from "../../../interfaces/statistics/MealsStatistics";

const MealsStatisticPage = () => {
  const { statistics }: { statistics: MealsStatisticsData } = useLoaderData() as { statistics: MealsStatisticsData };
  return (
    <div className={classes.pageContent}>
      <Suspense fallback={<p style={{ textAlign: 'center' }}><CircularProgress /></p>}>
        <Await resolve={statistics}>
          {(statistics: MealsStatisticsData) => 
            <Box sx={{ padding: 1}}>
              <MealsStatistics statistics={statistics}/>
              <MealsStatisticsCharts statistics={statistics} />
            </Box>
          }
        </Await>
      </Suspense>
      <MealsTable/>
    </div>
  );
}

export default MealsStatisticPage;

async function loadStatistic(period?: string): Promise<MealsStatisticsData> {
  if (!period) {
    throw new Error("Period is required");
  }

  const response = await mealsStatistics(period);

  if (!response.ok) {
    throw json(
      { message: 'Could not fetch statistics.' },
      { status: 500 }
    );
  } else {
    return await response.json();
  }
}

export const loader: LoaderFunction<MealsLoaderData> = async ({ request }) => {
  const url = new URL(request.url);
  const period = url.searchParams.get("period");

  if (!period) {
    throw json(
      { message: 'Period query parameter is required.' },
      { status: 400 }
    );
  }

  return defer({
    statistics: loadStatistic(period),
  });
};

