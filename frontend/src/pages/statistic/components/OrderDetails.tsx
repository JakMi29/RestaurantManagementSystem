import { Box, Paper, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import uiClasses from '../../../components/ux/Ui.module.css';
import { useNavigate } from 'react-router-dom';
import { OrderInterface, OrderMealInterface } from '../../../interfaces/Order';
import { paperStyle } from '../../../theme/theme';
import OrderMeal from './OrderMeal';


const OrderDetails = ({ order }: { order: OrderInterface }) => {
  const navigate = useNavigate()
  return (
    <Box sx={{ padding: 0 }}>
      <div style={{ display: "flex", alignItems: "center", paddingRight: "32px", justifyContent: "space-between" }}>
        <Typography variant="h4" sx={{ color: "rgba(60, 60, 211,1)", fontWeight: "bold" }}>
          Orders details
        </Typography>
        <button className={uiClasses.blueButton} style={{ padding: "10px" }} onClick={() => navigate(-1)}>
          Back
        </button>
      </div>
      <Box sx={{ padding: 4 }}>
        <Grid container spacing={3} >
          <Grid size={3}>
            <Paper elevation={4} sx={paperStyle}>
              <Typography variant="subtitle1">Number</Typography>
              <Typography variant="h5">{order.number}</Typography>
            </Paper>
          </Grid>
          <Grid size={3}>
            <Paper elevation={4} sx={paperStyle}>
              <Typography variant="subtitle1">Price</Typography>
              <Typography variant="h5">{order.price} USD</Typography>
            </Paper>
          </Grid>
          <Grid size={3}>
            <Paper elevation={4} sx={paperStyle}>
              <Typography variant="subtitle1">Customers</Typography>
              <Typography variant="h5">{order.customerQuantity}</Typography>
            </Paper>
          </Grid>
          <Grid size={3}>
            <Paper elevation={4} sx={paperStyle}>
              <Typography variant="subtitle1">Meals quantity</Typography>
              <Typography variant="h5">{order.meals?.length}</Typography>
            </Paper>
          </Grid>
          <Grid size={3}>
            <Paper elevation={4} sx={paperStyle}>
              <Typography variant="subtitle1">Received time</Typography>
              <Typography variant="h5">{order.receivedDateTime}</Typography>
            </Paper>
          </Grid>
          <Grid size={3}>
            <Paper elevation={4} sx={paperStyle}>
              <Typography variant="subtitle1">Completed time</Typography>
              <Typography variant="h5">{order.completedDateTime ?? "-"}</Typography>
            </Paper>
          </Grid>
          <Grid size={3}>
            <Paper elevation={4} sx={paperStyle}>
              <Typography variant="subtitle1">Duration</Typography>
              <Typography variant="h5">{order.durationTime} min</Typography>
            </Paper>
          </Grid>
          <Grid size={3}>
            <Paper elevation={4} sx={paperStyle}>
              <Typography variant="subtitle1">Waiter</Typography>
              <Typography variant="h5">{order.waiter?.email}</Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
      <Typography variant="h4" sx={{ color: "rgba(60, 60, 211,1)", fontWeight: "bold" }}>
        Meals
      </Typography>
      <Box sx={{ padding: 4}}>
        <Grid container spacing={1}>
          {order.meals?.map((orderMeal: OrderMealInterface, index) => (
            <Grid size={2.4} key={index}>
              <OrderMeal orderMeal={orderMeal} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box >
  );
};

export default OrderDetails;