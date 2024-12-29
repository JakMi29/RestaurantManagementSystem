import { Paper, Typography} from '@mui/material';
import classes from '../../../components/ux/Ui.module.css';
import { useNavigate } from 'react-router-dom';
import { WaitersStatisticsData } from '../../../interfaces/statistics/WaitersStatistics';

const WaitersStatistic = ({ waiter, period }: { waiter: WaitersStatisticsData, period: string | null }) => {
    const navigate = useNavigate()
    return (
        <Paper elevation={3} sx={{ padding: 1, width: "570px", textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>
                {waiter.waiter.name} {waiter.waiter.surname}
            </Typography>
            <Typography variant="body1">
                Email: {waiter.waiter.email}
            </Typography>
            <Typography variant="body2" sx={{ padding: '0px' }}>
                Customers served : {waiter.totalCustomers}
            </Typography>
            <Typography variant="body2" sx={{ padding: '0px' }}>
                Orders released: {waiter.totalOrders}
            </Typography>
            <Typography variant="body2" sx={{ padding: '0px' }}>
                Total served meals : {waiter.totalMeals}
            </Typography>
            <Typography variant="body2">
                Total revenue from orders : {waiter.totalIncome} USD
            </Typography>
            <div style={{ marginTop: 8, display: 'flex', alignContent: "center", width: "100%", justifyContent: 'space-between' }}>
                <button className={classes.blueButton} onClick={() => navigate(`/statistics/waiter?email=${waiter.waiter.email}&period=${period}`)}>
                    Statistics
                </button>
            </div>
        </Paper>
    );
}

export default WaitersStatistic;