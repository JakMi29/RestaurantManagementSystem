import { Outlet } from "react-router-dom";
import StatisticsCategoryContainer from "../../components/statistics/StatisticCategoryContainer";
import classes from './StatisticPage.module.css';
import {useState } from "react";


function StatisticPage() {
    const [currentPeriod, setCurrentPeriod] = useState("today");

    const handlePeriodChange = (event) => {
        setCurrentPeriod(event.target.value);
    }

    return (
        <div className={classes.mealPage}>
            <StatisticsCategoryContainer currentCategory={"orders"} currentPeriod={currentPeriod} handlePeriodChange={handlePeriodChange} />
            <Outlet context={[currentPeriod]} />
        </div>
    );
}

export default StatisticPage;
