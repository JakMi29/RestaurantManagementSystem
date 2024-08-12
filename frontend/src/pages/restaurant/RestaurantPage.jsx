import { defer, json, Outlet } from "react-router-dom";
import { getAuthToken } from "../../util/auth";
import TableList from "../../components/restaurant/TableList";

import { Provider } from "react-redux";
import store from "../../store";

function RestaurantPage() {
    return (
        <Provider store={store}>
            <Outlet />
        </Provider>
    );
}
export default RestaurantPage;

async function loadTables() {
    const token = getAuthToken();

    const response = await fetch(`http://localhost:8080/api/admin/tables/orders?restaurantName=${"Italiano"}`, {
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
