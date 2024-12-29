import { useState, Suspense } from 'react';
import MealCategoryContainer from './components/MealCategoryContainer';
import classes from './MenuPage.module.css';
import uiClasses from '../../components/ux/Ui.module.css';
import { CircularProgress, TextField } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { getRole } from '../../services/LocalStorage';
import { getMeals } from '../../api/MealApi';
import { Await, defer, json, LoaderFunction, useLoaderData, useLocation, useNavigate } from 'react-router-dom';
import { MealInterface, MealsLoaderData, MealsResponse } from '../../interfaces/Meal';
import DialogComponent from '../../components/ux/dialogs/DialogComponent';
import { Mode } from '../../constants/Mode';
import Role from '../../constants/Role';
import { DialogMode } from '../../constants/DialogMode';
import Meal from './components/Meal';

const MealPage = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const category = queryParams.get("category") ?? "appetizer"
    const [openForm, setOpenForm] = useState<boolean>(false);
    const [meal, setMeal] = useState<MealInterface>();
    const [mode, setMode] = useState<Mode>();
    const [searchTerm, setSearchTerm] = useState<string | undefined>(undefined);
    const navigate = useNavigate();
    const { meals }: { meals: MealsResponse } = useLoaderData() as { meals: MealsResponse };

    const handleCloseDialog = () => {
        setOpenForm(false);
    };

    const handleUpdateMeal = (meal: MealInterface) => {
        setOpenForm(true);
        setMeal(meal);
        setMode(Mode.EDIT);
    };

    const handleChangeCategory = (category: string) => {
        navigateToPage({ category: category, pageNumber: '0', pageSize: '10', search: searchTerm || '' });
    }

    const handleOpenDialog = () => {
        setOpenForm(true);
        setMode(Mode.CREATE);
    };

    const role = getRole();

    const navigateToPage = (newParams: Record<string, string>) => {
        const updatedParams = new URLSearchParams(location.search);
        Object.entries(newParams).forEach(([key, value]) => {
            if (value) {
                updatedParams.set(key, value);
            } else {
                updatedParams.delete(key);
            }
        });
        navigate(`/meals?${updatedParams.toString()}`);
    };

    const handleNextPage = () => {
        const pageNumber = (parseInt(queryParams.get('pageNumber') || '0', 10) + 1).toString();
        navigateToPage({ category: category, pageNumber, pageSize: '10', search: searchTerm || '' });
    };

    const handlePreviousPage = () => {
        const pageNumber = (parseInt(queryParams.get('pageNumber') || '1', 10) - 1).toString();
        navigateToPage({ category: category, pageNumber, pageSize: '10', search: searchTerm || '' });
    };

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const search = event.target.value;
        setSearchTerm(search);
        navigateToPage({ category: category, pageNumber: '0', pageSize: '10', search });
    };

    return (
        <div className={classes.page}>
            <DialogComponent open={openForm} mode={mode ?? Mode.READ} onClose={handleCloseDialog} type={DialogMode.MEAL} object={meal} />
            <div className={classes.headerContainer}>
                <MealCategoryContainer handleChange={handleChangeCategory} currentCategory={category} />
                <div className={classes.actionContainer}>
                    {role === Role.ADMIN && (
                        <button className={uiClasses.greenButton} onClick={handleOpenDialog}>
                            New meal
                        </button>
                    )}
                    <TextField
                        type="text"
                        value={searchTerm}
                        onChange={handleSearch}
                        label="Search meal"
                        size="small"
                    />
                </div>
            </div>
            <Suspense fallback={<p style={{ textAlign: 'center' }}><CircularProgress /></p>}>
                <Await resolve={meals}>
                    {(mealsResponse: MealsResponse) => (
                        <>
                            <Grid container sx={{ width: "100%", height: "100%" }}>
                                {mealsResponse?.content.map((meal) => (
                                    <Grid size={2.4} key={meal.name}>
                                        <Meal meal={meal} updateMeal={handleUpdateMeal} />
                                    </Grid>
                                ))}
                            </Grid>

                            <div className={classes.paginationContainer}>
                                {!mealsResponse?.first && (
                                    <button
                                        className={uiClasses.blueButton}
                                        onClick={handlePreviousPage}
                                    >
                                        Previous
                                    </button>
                                )}
                                {!mealsResponse?.last && (
                                    <button
                                        style={{ marginLeft: "auto" }}
                                        className={uiClasses.blueButton}
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
};

export default MealPage;

async function loadMeals(category?: string, pageNumber?: number, pageSize?: number, searchTerm?: string): Promise<MealsResponse> {

    const response = await getMeals({ category, pageNumber, pageSize, searchTerm });
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
export const loader: LoaderFunction<MealsLoaderData> = async ({ request }) => {
    const url = new URL(request.url);
    const category = url.searchParams.get("category") || undefined;
    const pageNumber = Number(url.searchParams.get("pageNumber")??0);
    const searchTerm = url.searchParams.get("search") || undefined;
    const pageSize = 10;
    return defer({
        meals: await loadMeals(category, pageNumber, pageSize, searchTerm),
    });
}
