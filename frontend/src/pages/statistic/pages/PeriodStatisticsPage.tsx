import { Outlet } from "react-router-dom";
import classes from "../StatisticPage.module.css"
import StatisticsCategoryContainer from "../components/StatisticsCategoryContainer";

const PeriodStatisticsPage = () => {
    return (
        <div className={classes.page}>
            <StatisticsCategoryContainer/>
            <Outlet />
        </div>
    );
}

export default PeriodStatisticsPage;


