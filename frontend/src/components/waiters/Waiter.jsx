import { Paper, Typography, Grid, Button } from '@mui/material';
import classes from '../ui/Ui.module.css';

function Waiter({ waiter }) {
    return (
        <Paper elevation={3} sx={{ padding: 1, width: "550px", textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>
                {waiter.name} {waiter.surname}
            </Typography>
            <Grid container spacing={1} justifyContent="center">
                <Grid item xs={12}>
                    <Typography variant="body2">
                        Email: {waiter.email}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="body2">
                        Salary: {waiter.salary} USD
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="body2">
                        Employment Date: {waiter.employmentDate}
                    </Typography>
                </Grid>
            </Grid>
            <div style={{ marginTop: 8,display: 'flex',alignContent:"center", width:"100%", justifyContent: 'space-between' }}>
                <button className={classes.redButton}>
                    Delete
                </button >
                <div style={{ display: "flex", gap: "20px" }}>
                <button className={classes.greenButton}>
                    Edit
                </button>
                <button className={classes.blueButton}>
                    Statistics
                </button>
                </div>
            </div>
        </Paper>
    );
}

export default Waiter;