import { Await, defer, json, useLoaderData,  } from "react-router-dom";
import classes from '../restaurant/RestaurantPage.module.css';
import { getAuthToken } from "../../util/auth";
import { Suspense } from "react";
import CircularProgress from '@mui/material/CircularProgress';
import TableList from "../../components/restaurant/TableList";
function MealsPage() {
    const { tables } = useLoaderData();


    
    return (
        <div className={classes.restaurantPage}>
                <Suspense fallback={<p style={{ textAlign: 'center' }}><CircularProgress /></p>}>
                    <Await resolve={tables}>
                        {(loadedTables) => (
                                <div className={classes.tablesContainer}>
                                    <TableList tables={loadedTables}/>
                                </div>
                        )}
                    </Await>
                </Suspense>
        </div>
    );
}
export default MealsPage;

async function loadTables() {
    const token = getAuthToken();

    const response = await fetch(`http://localhost:8080/api/admin/tables?restaurantName=Italiano`, {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    });
    if (!response.ok) {
        throw json(
            { message: 'Could not fetch tables.' },
            {
                status: 500,
            }
        );
    } else {
        const resData = await response.json();
        return resData;
    }
}

export async function loader() {
    return defer({
        tables: await loadTables(),
    });
}
