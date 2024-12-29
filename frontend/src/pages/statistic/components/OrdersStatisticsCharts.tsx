import { Box,Paper, Typography} from '@mui/material';
import Grid from '@mui/material/Grid2';
import ChartComponent from '../../../components/ux/ChartComponent';
import { DailyOrdersStatistic } from '../../../interfaces/statistics/OrdersStatistics';
import { chartPaperStyle } from '../../../theme/theme';

const OrdersStatisticsCharts = (props: { statistics: DailyOrdersStatistic[] }) => {
  return (
    <Box sx={{ marginTop: 4}} >
       <Typography variant="h4" sx={{marginBottom: 3, color: "rgba(60, 60, 211,1)", fontWeight: "bold" }}>
                Charts
              </Typography>
      <Grid container spacing={1} >
        <Grid size={6}>
          <Paper elevation={3} sx={chartPaperStyle}>
            <ChartComponent
              dataset={props.statistics}
              xLabel="Date"
              yLabel="Quantity"
              title="Orders Quantity"
              dataKey="totalOrders"
              labelKey="date"
            />
          </Paper>
        </Grid>
        <Grid size={6} >
          <Paper elevation={3} sx={chartPaperStyle}>
            <ChartComponent
              dataset={props.statistics}
              title="Customers Quantity"
              xLabel="Date"
              yLabel="Quantity"
              dataKey="totalCustomers"
              labelKey="date"
            />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default OrdersStatisticsCharts;