import { Outlet } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../../store/indext";

const RestaurantPage = () => {
    return (
        <Provider store={store}>
            <Outlet />
        </Provider>
    );
}

export default RestaurantPage;

