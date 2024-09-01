import { Outlet } from "react-router-dom";
import classes from './StatisticPage.module.css';


function StatisticPage() {

    return (
        <div className={classes.page}>
            <Outlet />
        </div>
    )
}

export default StatisticPage;


