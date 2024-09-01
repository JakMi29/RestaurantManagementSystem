import { Outlet, useLocation } from "react-router-dom";
import StatisticsCategoryContainer from "../../components/statistics/StatisticCategoryContainer";
import classes from './StatisticPage.module.css';


function PeriodStatisticPage() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const currentPeriod = queryParams.get('period');
    const path = location.pathname;
    const category = path.substring(path.lastIndexOf('/') + 1);

    return (
        <div className={classes.page}>
            <StatisticsCategoryContainer currentCategory={category} currentPeriod={currentPeriod} />
            <div className={classes.pageContent}>
                <Outlet />
            </div>
        </div>
    );
}

export default PeriodStatisticPage;


