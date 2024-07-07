import { Await, defer, json, useLocation, useLoaderData, useNavigate } from "react-router-dom";
import classes from './MealPage.module.css';
import MealCategoryContainer from "../../components/meals/MealCategoryContainer";
import { getAuthToken } from "../../util/auth";
import { Suspense, useEffect, useState } from "react";
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
    const [searchTerm, setSearchTerm] = useState(queryParams.get('search') || '');
    const navigate = useNavigate()

    useEffect(()=>{
        setPageNumber(0);
    },[currentCategory])

    const handleNextPage = () => {
        const page = pageNumber + 1;
        setPageNumber(page);
        navigate(`/meals?category=${currentCategory}&pageNumber=${page}&pageSize=${10}`);
    };

    const handlePreviousPage = () => {
        if (pageNumber > 0) {
            const page = pageNumber - 1;
            setPageNumber(page);
            navigate(`/meals?category=${currentCategory}&pageNumber=${page}&pageSize=${10}`);
        }
    }

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        setPageNumber(0);
        navigate(`/meals?category=${currentCategory}&pageNumber=0&pageSize=10&search=${searchTerm}`);
    };

    return (
        <MealPageContextProvider>
            <MealForm />
            <MealCategoryContainer currentCategory={currentCategory} />
            <form style={{ marginTop: "20px", right:"0px" }} onSubmit={handleSearchSubmit}>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    placeholder="Search for meals..."
                    className={classes.searchInput}
                />
                <button type="submit" className={classes.searchButton}>Search</button>
            </form>
            <Suspense fallback={<p style={{ textAlign: 'center' }}><CircularProgress /></p>}>
                <Await resolve={meals}>
                    {(loadedMeals) => (
                        <>
                            <div className={classes.mealsContainer}>
                                <MealList meals={loadedMeals.content} />
                            </div>
                            <div className={classes.paginationContainer}>
                                {!loadedMeals.first && (
                                    <button
                                        className={classes.categoryButton}
                                        style={{ position: "absolute", left: "80px", bottom: "30px" }}
                                        onClick={handlePreviousPage}
                                        disabled={loadedMeals.first}
                                    >
                                        Previous
                                    </button>
                                )}
                                {!loadedMeals.last && (
                                    <button
                                        className={classes.categoryButton}
                                        style={{ position: "absolute", right: "80px", bottom: "30px" }}
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
