import { Await, defer, json, useLocation, useLoaderData } from "react-router-dom";
import classes from './MealPage.module.css';
import MealCategoryContainer from "../../components/meals/MealCategoryContainer";

import { getAuthToken } from "../../util/auth";
import { Suspense } from "react";
import CircularProgress from '@mui/material/CircularProgress';
import MealList from "../../components/meals/MealList";
function MealsPage() {
    const {meals} = useLoaderData();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const currentCategory = queryParams.get('category');

    return (
        <div className={classes.page}>
            <MealCategoryContainer currentCategory={currentCategory} />
                <Suspense fallback={<p style={{ textAlign: 'center' }}>{<CircularProgress/>}</p>}>
                    <Await resolve={meals}>
                       {(loadedMeals)=><MealList meals={loadedMeals}/>}
                    </Await>
                </Suspense>
                    </div>
    );
}

export default MealsPage;

async function loadMeals(category) {
    const token = getAuthToken();
    
    const response = await fetch('http://localhost:8080/api/admin/meals?restaurantName=Italiano&category=' + category, {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    });
console.log(response)
    if (!response.ok) {
        throw json(
            { message: 'Could not fetch events.' },
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
    return defer({
        meals: await loadMeals(category),
    });
}
