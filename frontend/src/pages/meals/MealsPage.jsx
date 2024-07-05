import { Await, defer, json, useLocation, useLoaderData, useNavigate } from "react-router-dom";
import classes from './MealPage.module.css';
import MealCategoryContainer from "../../components/meals/MealCategoryContainer";
import { getAuthToken } from "../../util/auth";
import { Suspense, useState } from "react";
import CircularProgress from '@mui/material/CircularProgress';
import MealList from "../../components/meals/MealList";
import { MealPageContextProvider } from "../../store/MealPageContext";
import MealForm from "../../components/meals/MealForm";
function MealsPage() {
    const { meals } = useLoaderData();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const currentCategory = queryParams.get('category');
    const [pageNumber, setPageNumber] = useState(0);
    const navigate = useNavigate()

    const handleNextPage = () => {
        setPageNumber(prevPageNumber => prevPageNumber + 1);
        navigate(`/meals?category=${currentCategory}&pageNumber=${pageNumber + 1}`);
    };

    const handlePreviousPage = () => {
        if (pageNumber > 0) {
            setPageNumber(prevPageNumber => prevPageNumber - 1);
            navigate(`/meals?category=${currentCategory}&pageNumber=${pageNumber - 1}`);
        }
    }

    return (
        <MealPageContextProvider>
            <MealForm />
            <div className={classes.page}>
                <MealCategoryContainer currentCategory={currentCategory} />
                <div style={{ marginRight: "90px" }}>
                    <div className={classes.mealsContainer}>
                        <Suspense fallback={<p style={{ textAlign: 'center' }}><CircularProgress /></p>}>
                            <Await resolve={meals}>
                                {(loadedMeals) => (
                                    <>
                                        <MealList meals={loadedMeals.content} />
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            {!loadedMeals.first && (
                                                <button
                                                    className={classes.categoryButton}
                                                    style={{ left: "0px" }}
                                                    onClick={handlePreviousPage}
                                                    disabled={loadedMeals.first}
                                                >
                                                    Previous
                                                </button>
                                            )}
                                            {!loadedMeals.last && (
                                                <button
                                                    className={classes.categoryButton}
                                                    style={{ right: "0px" }}
                                                    onClick={handleNextPage}
                                                >
                                                    Next
                                                </button>
                                            )}
                                        </div>
                                    </>
                                )}
                            </Await>
                        </Suspense>
                    </div>
                </div>
            </div>
        </MealPageContextProvider>
    );
}
export default MealsPage;

async function loadMeals(category, pageNumber, pageSize) {
    const token = getAuthToken();

    const response = await fetch(`http://localhost:8080/api/admin/meals?restaurantName=Italiano&category=${category}&pageNumber=${pageNumber}&pageSize=${pageSize}`, {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    });
    if (!response.ok) {
        throw json(
            { message: 'Could not fetch meals.' },
            {
                status: 500,
            }
        );
    } else {
        const resData = await response.json();
        console.log(resData)
        return resData;
    }
}

export async function loader({ request }) {
    const url = new URL(request.url);
    const category = url.searchParams.get("category");
    const pageNumber = url.searchParams.get("pageNumber");
    const pageSize = 10;
    return defer({
        meals: await loadMeals(category, pageNumber, pageSize),
    });
}
