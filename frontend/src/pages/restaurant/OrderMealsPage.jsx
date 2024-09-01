import { Await, defer, json, useLocation, useLoaderData, useNavigate } from "react-router-dom";
import classes from './EditOrderPage.module.css';
import { getAuthToken } from "../../util/auth";
import { Suspense, useEffect, useRef, useState } from "react";
import CircularProgress from '@mui/material/CircularProgress';
import MealList from "../../components/meals/MealList";
import MealCategoryContainer from "../../components/meals/MealCategoryContainer";
import { useDispatch, useSelector } from "react-redux";
import OrderMealEdit from "./OrderMealEdit";
import { orderMealActions } from "../../store/edit-order-slice";
import { orderActions } from "../../store/order-slice";

function OrderMealsPage() {
    const dispatch = useDispatch();
    const orderMeals = useSelector((state) => state.orderMeal.meals);
    const price = useSelector((state) => state.orderMeal.price);
    const location = useLocation();
    const navigate = useNavigate();
    const containerRef = useRef(null);

    const queryParams = new URLSearchParams(location.search);
    const currentCategory = queryParams.get('category');
    const number = queryParams.get('number');
    const [pageNumber, setPageNumber] = useState(Number(queryParams.get('pageNumber')) || 0);
    const [searchTerm, setSearchTerm] = useState(queryParams.get('searchTerm') || '');
    const [pageSize, setPageSize] = useState(queryParams.get('pageSize') || 12);
    const [meals, setMeals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [initialLoad, setInitialLoad] = useState(true);

    useEffect(() => {
        const fetchMeals = async () => {
            setLoading(true);
            try {
                const tagsParam = orderMeals.map(meal => `tags=${encodeURIComponent(meal.meal.name)}`).join('&');
                const response = await fetch(
                    `http://localhost:8080/api/admin/meals?restaurantName=Italiano` +
                    `&category=${currentCategory}` +
                    `&pageNumber=${pageNumber}` +
                    `&pageSize=${pageSize}` +
                    `${searchTerm ? `&searchTerm=${searchTerm}` : ''}` +
                    `${tagsParam ? `&${tagsParam}` : ''}`, {
                    headers: {
                        'Authorization': 'Bearer ' + getAuthToken()
                    }
                });

                if (!response.ok) {
                    throw new Error('Could not fetch meals.');
                }

                const data = await response.json();
                setMeals(data);
            } catch (error) {
                console.error('Error fetching meals:', error);
            } finally {
                setLoading(false);
                setInitialLoad(false);
            }
        };

        fetchMeals();
    }, [currentCategory, pageNumber, searchTerm, orderMeals]);

    const handleNextPage = () => {
        const page = pageNumber + 1;
        setPageNumber(page);
    };

    const handlePreviousPage = () => {
        if (pageNumber > 0) {
            const page = pageNumber - 1;
            setPageNumber(page);
        }
    };

    const handleSearchChange = (event) => {
        const search = event.target.value;
        setSearchTerm(search);
    };

    const handleCancel = () => {
        dispatch(orderMealActions.resetOrderMeals());
        navigate(`/restaurant/tables`);
    };
    const handleConfirm = () => {
        dispatch(orderActions.addMeals({ number: number, meals: orderMeals, price: price }));
        navigate(`/restaurant/tables`);
    };

    const throttle = (func, delay) => {
        let lastCall = 0;
        return (...args) => {
            const now = new Date().getTime();
            if (now - lastCall < delay) {
                return;
            }
            lastCall = now;
            return func(...args);
        };
    };

    useEffect(() => {
        const container = containerRef.current;
        const handleWheel = throttle((event) => {
            if (event.deltaY !== 0) {
                event.preventDefault();
                container.scrollLeft += event.deltaY;
            }
        }, 50);
        container.addEventListener('wheel', handleWheel);
        return () => container.removeEventListener('wheel', handleWheel);
    }, []);

    useEffect(() => {
        setPageNumber(0);
    }, [currentCategory]);

    return (
        <div className={classes.mealPage}>
            <div className={classes.actions}>
                <button onClick={handleCancel} className={classes.redButton}>
                    Cancel
                </button>

                <button onClick={handleConfirm} className={classes.greenButton}>
                    Save
                </button>
            </div>
            <div className={classes.orderMealContainer} ref={containerRef}>
                {orderMeals.map((orderMeal) => (
                    <OrderMealEdit key={orderMeal.name} meal={orderMeal} />
                ))}
            </div>
            <MealCategoryContainer currentCategory={currentCategory} order={true} />
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <form style={{ marginTop: "-50px", marginLeft: "auto" }}>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        placeholder="Search for meals..."
                        className={classes.searchInput}
                    />
                </form>
            </div>

            <div className={classes.mealsContainer}>
                {initialLoad && loading ? (
                    <p style={{ textAlign: 'center' }}><CircularProgress /></p>
                ) : (
                    <MealList meals={meals.content || []} order={true} />
                )}
            </div>
            <div className={classes.paginationContainer}>
                {!meals.first && (
                    <button
                        className={classes.categoryButton}
                        style={{ position: "absolute", left: "80px", bottom: "30px" }}
                        onClick={handlePreviousPage}
                        disabled={meals.first}
                    >
                        Previous
                    </button>
                )}
                {!meals.last && (
                    <button
                        className={classes.categoryButton}
                        style={{ position: "absolute", right: "80px", bottom: "30px" }}
                        onClick={handleNextPage}
                    >
                        Next
                    </button>
                )}
            </div>
        </div>
    );
}

export default OrderMealsPage;

// async function loadOrderMeals(category, pageNumber, pageSize, searchTerm) {
//     const token = getAuthToken();

//     const response = await fetch(
//         `http://localhost:8080/api/admin/meals?restaurantName=Italiano
//         &category=${category}
//         &pageNumber=${pageNumber}
//         &pageSize=${pageSize}
//         ${searchTerm ? `&searchTerm=${searchTerm}` : ''}`, {
//         headers: {
//             'Authorization': 'Bearer ' + token
//         }
//     });
//     if (!response.ok) {
//         throw json(
//             { message: 'Could not fetch meals.' },
//             {
//                 status: 500,
//             }
//         );
//     } else {
//         const resData = await response.json();
//         return resData;
//     }
// }

// export async function loader({ request }) {
//     const url = new URL(request.url);
//     const category = url.searchParams.get("category");
//     const pageNumber = url.searchParams.get("pageNumber");
//     const searchTerm = url.searchParams.get("searchTerm");
//     const pageSize = 10;
//     return defer({
//         meals: await loadOrderMeals(category, pageNumber, pageSize, searchTerm, orderMeals),
//     });
// }
