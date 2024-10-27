import { Outlet, useLocation } from "react-router-dom";
import StatisticsCategoryContainer from "../../components/statistics/StatisticCategoryContainer";
import classes from './StatisticPage.module.css';
import { useState } from "react";


function PeriodStatisticPage() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const currentPeriod = queryParams.get('period');
    const [category, setCategory] = useState("orders");

    const handleChangeCtegory = (category) => {
        setCategory(category)
    }

    return (
        <>
            <StatisticsCategoryContainer currentCategory={category} currentPeriod={currentPeriod} handleChangeCategory={handleChangeCtegory} />
            <Outlet />
        </>
    );
}

export default PeriodStatisticPage;


