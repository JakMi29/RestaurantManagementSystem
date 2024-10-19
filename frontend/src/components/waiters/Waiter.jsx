import { Paper, Typography, Grid, Button } from '@mui/material';
import classes from '../ui/Ui.module.css';
import { getAuthToken } from '../../util/auth';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import MessageContext from '../../store/MessageContext';

function Waiter({ waiter, handleEdit }) {
    const messageCtx = useContext(MessageContext);
    const navigate = useNavigate()

    const deleteWaiter = () => {
        const token = getAuthToken();
        fetch(`http://localhost:8080/api/restaurantManagementSystem/waiters/admin?email=${waiter.email}`, {
            method: 'PATCH',
            headers: {
                'Authorization': 'Bearer ' + token
            },
        })
            .then(response => {
                if (response.ok) {
                    messageCtx.showMessage('Successfully delete waiter', 'info')
                    navigate(0)
                } else {
                    messageCtx.showMessage('Something gone wrong', 'error')
                }
            })
            .catch(error => {
                console.error('Wystąpił błąd podczas wysyłania żądania:', error);
            });
    }

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
            <div style={{ marginTop: 8, display: 'flex', alignContent: "center", width: "100%", justifyContent: 'space-between' }}>
                <button className={classes.redButton} onClick={() => deleteWaiter(waiter)}>
                    Delete
                </button >
                <div style={{ display: "flex", gap: "20px" }}>
                    <button onClick={() => handleEdit(waiter)} className={classes.greenButton}>
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