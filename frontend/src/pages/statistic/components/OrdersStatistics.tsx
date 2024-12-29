import { Box, Paper, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { paperStyle } from '../../../theme/theme';
import { OrdersStatisticsData } from '../../../interfaces/statistics/OrdersStatistics';


const OrdersStatistics = ({statistics}: {statistics:OrdersStatisticsData}) => {
  return (
    <Box >
      <Typography variant="h4" sx={{ marginBottom: 3, color: "rgba(60, 60, 211,1)", fontWeight: "bold" }}>
        Orders Statistics
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        <Grid size={4}>
          <Paper elevation={4} sx={paperStyle}>
            <Typography variant="h6">Total Orders</Typography>
            <Typography variant="h4">{statistics.totalOrders}</Typography>
          </Paper>
        </Grid>
        <Grid size={4}>
          <Paper elevation={3} sx={paperStyle}>
            <Typography variant="h6">Average Daily Orders</Typography>
            <Typography variant="h4">{statistics.averageOrdersPerDay}</Typography>
          </Paper>
        </Grid>
        <Grid size={4}>
          <Paper elevation={3} sx={paperStyle}>
            <Typography variant="h6">Average Order Duration</Typography>
            <Typography variant="h4">{statistics.averageOrderDuration} min</Typography>
          </Paper>
        </Grid>
      </Grid>

      <Typography variant="h4" sx={{ marginTop: 5, marginBottom: 3, color: "rgba(60, 60, 211,1)", fontWeight: "bold" }}>
        Customer Statistics
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        <Grid size={4}>
          <Paper elevation={3} sx={paperStyle}>
            <Typography variant="h6">Total Customers</Typography>
            <Typography variant="h4">{statistics.totalCustomers}</Typography>
          </Paper>
        </Grid>
        <Grid size={4}>
          <Paper elevation={3} sx={paperStyle}>
            <Typography variant="h6">Average Daily Customers</Typography>
            <Typography variant="h4">{statistics.averageCustomersPerDay}</Typography>
          </Paper>
        </Grid>
        <Grid size={4}>
          <Paper elevation={3} sx={paperStyle}>
            <Typography variant="h6">Average Customers Per Order</Typography>
            <Typography variant="h4">{statistics.averageCustomersPerOrder}</Typography>
          </Paper>
        </Grid>
      </Grid>

      <Typography variant="h4" sx={{ marginTop: 5, marginBottom: 3, color: "rgba(60, 60, 211,1)", fontWeight: "bold" }}>
        Income Statistics
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        <Grid size={4}>
          <Paper elevation={3} sx={paperStyle}>
            <Typography variant="h6">Total Income</Typography>
            <Typography variant="h4">{statistics.totalIncome} USD</Typography>
          </Paper>
        </Grid>
        <Grid size={4}>
          <Paper elevation={3} sx={paperStyle}>
            <Typography variant="h6">Average Daily Income</Typography>
            <Typography variant="h4">{statistics.averageDailyIncome} USD</Typography>
          </Paper>
        </Grid>
        <Grid size={4}>
          <Paper elevation={3} sx={paperStyle}>
            <Typography variant="h6">Average Income Per Order</Typography>
            <Typography variant="h4">{statistics.averageOrderIncome} USD</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default OrdersStatistics;