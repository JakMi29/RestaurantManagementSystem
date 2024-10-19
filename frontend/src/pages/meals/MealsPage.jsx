import { Await, defer, json, useLocation, useLoaderData, useNavigate } from "react-router-dom";
import classes from './MealPage.module.css';
import MealCategoryContainer from "../../components/meals/MealCategoryContainer";
import { getAuthToken } from "../../util/auth";
import { Suspense, useEffect, useState } from "react";
import CircularProgress from '@mui/material/CircularProgress';
import MealList from "../../components/meals/MealList";
import MealModal from "../../components/meals/MealForm";
import DialogComponent from "../../components/dialogs/DialogComponent";

function MealsPage() {
    const { meals } = useLoaderData();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const currentCategory = queryParams.get('category');
    const [pageNumber, setPageNumber] = useState(0);
    const [searchTerm, setSearchTerm] = useState(queryParams.get('search') || '');
    const [openForm, setOpenForm] = useState(false)
    const navigate = useNavigate()
    const [meal, setMeal] = useState()
    const [mode, setMode] = useState()

    const handleCloseDialog = () => {
        setMeal(undefined)
        setOpenForm(false)
    }
    const handleOpenDialog = () => {
        setOpenForm(true)
        setMode("create")
    }

    const handleUpdateMeal = (meal) => {
        setMeal(meal)
        setMode("update")
        setOpenForm(true)
    }

    useEffect(() => {
        setPageNumber(0);
    }, [currentCategory])

    const handleNextPage = () => {
        const page = pageNumber + 1;
        setPageNumber(page);
        navigate(`/meals?category=${currentCategory}&pageNumber=${page}&pageSize=${10}`);
    };
    const handlePreviousPage = () => {
        if (pageNumber > 0) {
            const page = pageNumber - 1;
            setPageNumber(page);
            navigate(`/meals?category=${currentCategory}&pageNumber=${page}&pageSize=${10}${searchTerm ? `&searchTerm=${searchTerm}` : ""}`);
        }
    }

    const handleSearchChange = (event) => {
        const search = event.target.value
        setSearchTerm(search);
        search === "" ? navigate(`/meals?category=${currentCategory}&pageNumber=0&pageSize=10`) :
            navigate(`/meals?category=${currentCategory}&pageNumber=0&pageSize=10&searchTerm=${search} `);
    };


    return (
        <div className={classes.mealPage}>
            <DialogComponent open={openForm} mode={mode} onClose={handleCloseDialog} name={"meal"} object={meal} />
            <MealCategoryContainer currentCategory={currentCategory} order={false} openDialog={handleOpenDialog} />
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <form style={{ marginTop: "20px", marginLeft: "auto" }}>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        placeholder="Search for meals..."
                        className={classes.searchInput}
                    />
                </form>
            </div>
            <Suspense fallback={<p style={{ textAlign: 'center' }}><CircularProgress /></p>}>
                <Await resolve={meals}>
                    {(loadedMeals) => (
                        <>
                            <MealList meals={loadedMeals.content} order={false} updateMeal={handleUpdateMeal} />
                            <div>
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
        </div>
    );
}
export default MealsPage;

async function loadMeals(category, pageNumber, pageSize, searchTerm) {

    const response = await fetch(`http://localhost:8080/api/restaurantManagementSystem/meal/all?restaurantName=Italiano&category=${category}&pageNumber=${pageNumber}&pageSize=${pageSize}${searchTerm ? `&searchTerm=${searchTerm}` : ''}`, {
        headers: {
            'Authorization': 'Bearer ' + getAuthToken()
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
        return resData;
    }
}

export async function loader({ request }) {
    const url = new URL(request.url);
    const category = url.searchParams.get("category");
    const pageNumber = url.searchParams.get("pageNumber");
    const searchTerm = url.searchParams.get("searchTerm");
    const pageSize = 10;
    return defer({
        meals: await loadMeals(category, pageNumber, pageSize, searchTerm),
    });
}
