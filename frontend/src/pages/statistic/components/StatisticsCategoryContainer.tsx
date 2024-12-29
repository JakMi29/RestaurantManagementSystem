import { useLocation, useNavigate } from 'react-router-dom';
import classes from "../StatisticPage.module.css"
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useState } from 'react';

const StatisticsCategoryContainer = () => {
    const [currenCategory, setCurrenCategory] = useState("orders");
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const period: string = queryParams.get('period') ?? "";

    const isActive = (category: string) => category === currenCategory;

    const handlePeriodChange = (event:SelectChangeEvent<string>) => {
        const newPeriod = event.target.value;
        queryParams.set('period', newPeriod);
        navigate(`${location.pathname}?${queryParams.toString()}`);
    };

    return (
        <div className={classes.categoryContainer}>
            <button
                onClick={() => {
                    setCurrenCategory("orders")
                    navigate(`/statistics/orders?period=${period}`);
                }}
                className={isActive("orders") ? classes.categoryButtonActive : classes.categoryButton}
            >
                Orders
            </button>
            <button
                onClick={() => {
                    setCurrenCategory("meals")
                    navigate(`/statistics/meals?period=${period}`);
                }}
                className={isActive("meals") ? classes.categoryButtonActive : classes.categoryButton}
            >
                Meals
            </button>
            <button
                onClick={() => {
                    setCurrenCategory("waiters")
                    navigate(`/statistics/waiters?period=${period}&pageNumber=0&pageSize=9`);
                }}
                className={isActive("waiters") ? classes.categoryButtonActive : classes.categoryButton}
            >
                Waiters
            </button>
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
                    value={period}
                    onChange={handlePeriodChange}
                    label="Period"
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
export default StatisticsCategoryContainer