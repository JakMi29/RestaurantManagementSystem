import React from 'react';
import { Box, Grid, Paper, Typography } from '@mui/material';
import OrderMealDetails from './OrderMealDetails';
import classes from '../../pages/statistics/StatisticPage.module.css';
import uiClasses from '../ui/Ui.module.css';
import { useNavigate } from 'react-router-dom';

const cardStyle = {
  padding: 3,
  textAlign: "center",
  borderRadius: 2,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
};

const OrderDetails = ({ order }) => {
  const navigate = useNavigate()
  return (
    <Box sx={{ padding: 4 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Typography variant="h4" sx={{ color: "rgba(60, 60, 211,1)", fontWeight: "bold" }}>
          Orders details
        </Typography>
        <button className={uiClasses.blueButton} style={{ padding: "10px" }} onClick={() => navigate(-1)}>
          Back
        </button>
      </div>
      <Box sx={{ padding: 4 }}>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} sm={6} md={3}>
            <Paper elevation={4} sx={cardStyle}>
              <Typography variant="subtitle1">Number</Typography>
              <Typography variant="h5">{order.number}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper elevation={4} sx={cardStyle}>
              <Typography variant="subtitle1">Price</Typography>
              <Typography variant="h5">{order.price} USD</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper elevation={4} sx={cardStyle}>
              <Typography variant="subtitle1">Customers</Typography>
              <Typography variant="h5">{order.customerQuantity}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper elevation={4} sx={cardStyle}>
              <Typography variant="subtitle1">Meals quantity</Typography>
              <Typography variant="h5">{order.meals.length}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper elevation={4} sx={cardStyle}>
              <Typography variant="subtitle1">Received time</Typography>
              <Typography variant="h5">{order.receivedDateTime}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper elevation={4} sx={cardStyle}>
              <Typography variant="subtitle1">Completed time</Typography>
              <Typography variant="h5">{order.completedDateTime}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper elevation={4} sx={cardStyle}>
              <Typography variant="subtitle1">Duration</Typography>
              <Typography variant="h5">{order.durationTime} min</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper elevation={4} sx={cardStyle}>
              <Typography variant="subtitle1">Waiter</Typography>
              <Typography variant="h5">{order.waiter.email}</Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
      <Typography variant="h4" sx={{ color: "rgba(60, 60, 211,1)", fontWeight: "bold" }}>
        Meals
      </Typography>
      <Box sx={{ padding: 4 }}>
        <Grid container spacing={1}>
          {order.meals.map(meal => <Grid item xs={2.4} sm={2.4} md={2.4} key={meal.id}>
            <OrderMealDetails meal={meal} />
          </Grid>)}
        </Grid>
      </Box>
    </Box >
  );
};

export default OrderDetails;