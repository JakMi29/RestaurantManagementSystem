import React from 'react';
import { Box, Grid, Paper, Typography } from '@mui/material';
import OrderMealDetails from './OrderMealDetails';
import classes from '../../pages/statistics/StatisticPage.module.css';
import uiClasses from '../ui/Ui.module.css';
import { useNavigate } from 'react-router-dom';

const OrderDetails = ({ order }) => {
  const navigate = useNavigate()
  return (<>
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <Typography variant="h3">Details</Typography>
      <button className={uiClasses.blueButton} style={{ padding: "10px" }} onClick={() => navigate(-1)}>
        Back
      </button>
    </div>
    <Box sx={{ padding: 4 }}>
      <Grid container spacing={2} justifyContent="space-between" alignItems="center">
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} sx={{ padding: 2, textAlign: 'center' }}>
            <Typography variant="subtitle1">Number</Typography>
            <Typography variant="h5">{order.number}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} sx={{ padding: 2, textAlign: 'center' }}>
            <Typography variant="subtitle1">Price</Typography>
            <Typography variant="h5">{order.price} USD</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} sx={{ padding: 2, textAlign: 'center' }}>
            <Typography variant="subtitle1">Customers</Typography>
            <Typography variant="h5">{order.customerQuantity}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} sx={{ padding: 2, textAlign: 'center' }}>
            <Typography variant="subtitle1">Meals quantity</Typography>
            <Typography variant="h5">{order.meals.length}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} sx={{ padding: 2, textAlign: 'center' }}>
            <Typography variant="subtitle1">Received time</Typography>
            <Typography variant="h5">{order.receivedDateTime}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} sx={{ padding: 2, textAlign: 'center' }}>
            <Typography variant="subtitle1">Completed time</Typography>
            <Typography variant="h5">{order.completedDateTime}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} sx={{ padding: 2, textAlign: 'center' }}>
            <Typography variant="subtitle1">Duration</Typography>
            <Typography variant="h5">{order.durationTime}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} sx={{ padding: 2, textAlign: 'center' }}>
            <Typography variant="subtitle1">Waiter</Typography>
            <Typography variant="h5">{order.waiter.email}</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
    <Typography variant="h3">Meals</Typography>
    <div className={classes.mealsContainer}>
      {order.meals.map(meal => <OrderMealDetails meal={meal} />)}
    </div>
  </>
  );
};

export default OrderDetails;