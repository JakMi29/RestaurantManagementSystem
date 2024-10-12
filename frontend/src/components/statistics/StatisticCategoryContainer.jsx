import { NavLink, useNavigate } from 'react-router-dom';
import classes from '../../pages/statistics/StatisticPage.module.css';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';

function StatisticsCategoryContainer({ currentCategory, currentPeriod }) {
    const navigate = useNavigate();

    const isActive = (category) => currentCategory === category;

    const handlePeriodChange = (event) => {
        const newPeriod = event.target.value;
        navigate(`/statistics/${currentCategory}?period=${newPeriod}${currentCategory === "waiters" ? "&pageNumber=0&pageSize=12" : ""}`);
    };

    return (
        <div className={classes.categoryContainer}>
            <NavLink
                to={`/statistics/orders?period=${currentPeriod}`}
                className={isActive("orders") ? classes.categoryButtonActive : classes.categoryButton}
            >
                Orders
            </NavLink>
            <NavLink
                to={`/statistics/meals?period=${currentPeriod}`}
                className={isActive("meals") ? classes.categoryButtonActive : classes.categoryButton}
            >
                Meals
            </NavLink>
            <NavLink
                to={`/statistics/waiters?period=${currentPeriod}&pageNumber=0&pageSize=12`}
                className={isActive("waiters") ? classes.categoryButtonActive : classes.categoryButton}
            >
                Waiters
            </NavLink>
            <FormControl
                variant="outlined"
                sx={{
                    minWidth: 200,
                    marginLeft: 'auto',
                }}
            >
                <InputLabel
                    id="period-label"
                >
                    Period
                </InputLabel>
                <Select
                    labelId="period-label"
                    value={currentPeriod}
                    onChange={handlePeriodChange}
                    label="Period"
                    sx={{
                        padding: '0px 10px',
                        border: 'none',
                        fontSize: '16px',
                        height: '40px',
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    <MenuItem value="today">Today</MenuItem>
                    <MenuItem value="3days">3 days</MenuItem>
                    <MenuItem value="7days">7 days</MenuItem>
                    <MenuItem value="1month">1 month</MenuItem>
                    <MenuItem value="3months">3 months</MenuItem>
                    <MenuItem value="1year">1 year</MenuItem>
                    <MenuItem value="all">All</MenuItem>
                </Select>
            </FormControl>
        </div>
    );
}

export default StatisticsCategoryContainer;