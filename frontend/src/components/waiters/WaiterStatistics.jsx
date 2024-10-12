import { Paper, Typography, Grid, Button } from '@mui/material';
import classes from '../ui/Ui.module.css';

function WaiterStatistic({ waiter }) {
    return (
        <Paper elevation={3} sx={{ padding: 1, width: "550px", textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>
                {waiter.waiter.name} {waiter.waiter.surname}
            </Typography>
            <Grid container spacing={1} justifyContent="center">
                <Grid item xs={12}>
                    <Typography variant="body2">
                        Email: {waiter.waiter.email}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="body2">
                        Customers served : {waiter.totalCustomers}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="body2">
                        Orders released: {waiter.totalOrders}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="body2">
                        Total served meals : {waiter.totalMeals}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="body2">
                        Total revenue from orders : {waiter.totalIncome} USD
                    </Typography>
                </Grid>
            </Grid>
            <div style={{ marginTop: 8, display: 'flex', alignContent: "center", width: "100%", justifyContent: 'space-between' }}>
                <button className={classes.blueButton}>
                    Statistics
                </button>
            </div>
        </Paper>
    );
}

export default WaiterStatistic;