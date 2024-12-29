import { Box, Paper, Typography } from '@mui/material';
import uiClasses from '../../../components/ux/Ui.module.css';
import classes from '../WaitersPage.module.css'
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import MessageContext from '../../../store/MessageContext';
import { MessageMode } from '../../../constants/MessageMode';
import { deleteWaiter } from '../../../api/WaiterApi';

function Waiter({ waiter, onEdit }: { waiter: any, onEdit: (waiter: any) => void }) {
    const messageCtx = useContext(MessageContext);
    const navigate = useNavigate()

    const handleDelate = () => {
        deleteWaiter(waiter.email)
            .then(response => {
                if (response.ok) {
                    messageCtx.showMessage('Successfully delete waiter', MessageMode.INFO)
                    navigate(0)
                } else {
                    messageCtx.showMessage('Something gone wrong', MessageMode.ERROR)
                }
            })
            .catch(error => {
                console.error('Wystąpił błąd podczas wysyłania żądania:', error);
            });
    }

    return (
        <Paper elevation={3} sx={{ padding: 1, textAlign: 'center', gap: "10px" }}>
            <Typography variant="h6" gutterBottom>
                {waiter.name} {waiter.surname}
            </Typography>
            <Typography variant="body2">
                Email: {waiter.email}
            </Typography>
            <Typography variant="body2">
                Salary: {waiter.salary} USD
            </Typography>
            <Typography variant="body2">
                Employment Date: {waiter.employmentDate}
            </Typography>
            <div className={classes.actions}>
                <button className={uiClasses.redButton} onClick={() => handleDelate()}>
                    Delete
                </button >
                <div style={{ display: "flex", gap: "20px" }}>
                    <button onClick={() => onEdit(waiter)} className={uiClasses.greenButton}>
                        Edit
                    </button>
                    <button className={uiClasses.blueButton}>
                        Statistics
                    </button>
                </div>
            </div>
        </Paper>
    );
}

export default Waiter;