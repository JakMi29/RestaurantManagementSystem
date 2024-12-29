import { Await, defer, json, LoaderFunction, useLoaderData} from "react-router-dom";
import { ordersStatistics } from "../../../api/Statistic";
import { Box, CircularProgress} from "@mui/material";
import OrdersStatisticsCharts from "../components/OrdersStatisticsCharts";
import { OrdersLoaderData, OrdersStatisticsData } from "../../../interfaces/statistics/OrdersStatistics";
import { Suspense } from "react";
import OrdersStatistics from "../components/OrdersStatistics";
import classes from "../StatisticPage.module.css"
import OrdersTable from "../components/OrdersTables";

const OrdersStatisticPage = () => {
  const { statistics }: { statistics: OrdersStatisticsData } = useLoaderData() as { statistics: OrdersStatisticsData };

  return (
    <div className={classes.pageContent}>
      <Suspense fallback={<p style={{ textAlign: 'center' }}><CircularProgress /></p>}>
        <Await resolve={statistics}>
          {(statistics: OrdersStatisticsData) => 
            <Box sx={{ padding: 1}}>
              <OrdersStatistics statistics={statistics} />
              <OrdersStatisticsCharts statistics={statistics.dailyStatistics} />
            </Box>
          }
        </Await>
      </Suspense>
      <OrdersTable/>
    </div>
  );
}

export default OrdersStatisticPage;

async function loadStatistic(period: string | null): Promise<OrdersStatisticsData> {
  if (!period) {
    throw new Error("Period is required");
  }

  const response = await ordersStatistics(period);

  if (!response.ok) {
    throw json(
      { message: 'Could not fetch statistics.' },
      { status: 500 }
    );
  }
    return await response.json();
}

export const loader: LoaderFunction<OrdersLoaderData> = async ({ request }) => {
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
