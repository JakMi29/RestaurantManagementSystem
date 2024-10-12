import { defer, json, Outlet } from "react-router-dom";
import { getAuthToken } from "../../util/auth";

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

async function loadTables(pageNumber, pageSize, searchTerm) {
    const response = await fetch(
        `http://localhost:8080/api/restaurantManagementSystem/table/orders?restaurantName=${"Italiano"}&pageNumber=${pageNumber}&pageSize=${pageSize}${searchTerm ? `&searchTerm=${searchTerm}` : ''}`,
        {
            headers: {
                'Authorization': 'Bearer ' + getAuthToken()
            }
        }
    );
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

export async function loader({ request }) {
    const url = new URL(request.url);
    const pageNumber = url.searchParams.get("pageNumber");
    const searchTerm = url.searchParams.get("searchTerm");
    const pageSize = 10;
    return defer({
        tables: await loadTables(pageNumber, pageSize, searchTerm),
    });
}
