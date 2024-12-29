import { useNavigate } from "react-router-dom";
import classes from './EditOrderPage.module.css';
import uiClasses from '../../../components/ux/Ui.module.css';
import { useCallback, useEffect, useRef, useState } from "react";
import CircularProgress from '@mui/material/CircularProgress';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from '../../../store/indext';
import { editOrderActions } from "../../../store/EditOrderSlice";
import MealCategoryContainer from "../../menu/components/MealCategoryContainer";
import { orderActions } from "../../../store/OrderSlice";
import { MealInterface, MealsResponse } from "../../../interfaces/Meal";
import OrderEditMeal from "./OrderEditMeal";
import { OrderMealInterface } from "../../../interfaces/Order";
import OrderEditOrderMeal from "./OrderEditOrderMeal";
import { Box, TextField } from "@mui/material";
import Grid from '@mui/material/Grid2';
import { mealsBoxStyle } from "../../../theme/theme";
import { getMeals } from "../../../api/MealApi";

const EditOrderPage = () => {
    const dispatch = useDispatch();
    const orderState = useSelector((state: RootState) => state.editOrder);
    const price = useSelector((state: RootState) => state.editOrder.price);
    const tablesState = useSelector((state: RootState) => state.table);

    const navigate = useNavigate();
    const containerRef = useRef(null);
    const [searchTerm, setSearchTerm] = useState<string | undefined>(undefined);
    const [pageNumber, setPageNumber] = useState<number>(0);
    const [category, setCategory] = useState<string>("appetizer");
    const [meals, setMeals] = useState<MealsResponse>();
    const [loading, setLoading] = useState(true);
    const [initialLoad, setInitialLoad] = useState(true);

    useEffect(() => {
        const fetchMeals = async () => {
            setLoading(true);
            const tags = orderState.meals.map(meal => `tags=${encodeURIComponent(meal.meal.name)}`).join('&');
            getMeals({ category, pageNumber, pageSize: 12, searchTerm, tags: tags })
                .then(response => response.json())
                .then(data => setMeals(data))
                .finally(() => {
                    setLoading(false);
                    setInitialLoad(false);
                });
        };
        fetchMeals();
    }, [category, searchTerm, orderState.meals, pageNumber]);

    const handleChangeCategory = (category: string) => {
        setPageNumber(0);
        setCategory(category);
    }

    const handleNextPage = useCallback(() => {
        if (meals?.number !== undefined && meals?.number < meals?.totalPages) {
            setPageNumber(1)
        }
    }, [meals]);

    const handlePreviousPage = useCallback(() => {
        if (meals?.number !== undefined && meals?.number > 0) {
            setPageNumber(meals?.number - 1)
        }
    }, [meals]);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const search = event.target.value;
        setSearchTerm(search);
    };

    const handleCancel = () => {
        dispatch(editOrderActions.resetOrderMeals());
        navigate(`/restaurant/view?&pageNumber=${tablesState.pageNumber}&pageSize=${10}${tablesState.searchTerm !== "" ? `&searchTerm=${tablesState.searchTerm}` : ""}`);
    };

    const handleConfirm = () => {
        dispatch(orderActions.addMeals({ orderNumber: orderState.number, meals: orderState.meals, price: price }));
        navigate(`/restaurant/view?&pageNumber=${tablesState.pageNumber}&pageSize=${10}${tablesState.searchTerm !== "" ? `&searchTerm=${tablesState.searchTerm}` : ""}`);
    };

    const throttle = (func: (...args: any[]) => void, delay: number) => {
        let lastCall = 0;
        return (...args: any[]) => {
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
        if (!container) return;

        const handleWheel = throttle((event: WheelEvent) => {
            if (event.deltaY !== 0) {
                event.preventDefault();
                (container as HTMLDivElement).scrollLeft += event.deltaY;
            }
        }, 50);

        (container as HTMLDivElement).addEventListener('wheel', handleWheel);
        return () => (container as HTMLDivElement).removeEventListener('wheel', handleWheel);
    }, []);


    return (
        <div className={classes.page}>
            <div className={classes.actions}>
                <button onClick={handleCancel} className={uiClasses.redButton}>
                    Cancel
                </button>
                <button onClick={handleConfirm} className={uiClasses.greenButton}>
                    Save
                </button>
            </div>
            <Box sx={mealsBoxStyle} ref={containerRef}>
                {orderState.meals.map((orderMeal: OrderMealInterface) => (
                    <OrderEditOrderMeal orderMeal={orderMeal} />
                ))}
            </Box>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <MealCategoryContainer handleChange={handleChangeCategory} currentCategory={category} />
                <TextField
                    type="text"
                    value={searchTerm}
                    onChange={handleSearch}
                    label="Search meal"
                    size="small"
                />
            </div>
            <div className={classes.mealsContainer}>
                {initialLoad && loading ? (
                    <p style={{ textAlign: 'center' }}>
                        <CircularProgress />
                    </p>
                ) : (
                    <Grid container sx={{ width: "100%", height: "100%" }}>
                        {meals?.content.map((meal: MealInterface) => (
                            <Grid size={2} key={meal.name}>
                                <OrderEditMeal meal={meal} />
                            </Grid>
                        ))}
                    </Grid>
                )}
            </div>
            <div className={classes.paginationContainer}>
                {!meals?.first && (
                    <button
                        className={uiClasses.blueButton}
                        onClick={handlePreviousPage}
                    >
                        Previous
                    </button>
                )}
                {!meals?.last && (
                    <button
                        style={{ marginLeft: "auto" }}
                        className={uiClasses.blueButton}
                        onClick={handleNextPage}
                    >
                        Next
                    </button>
                )}
            </div>
        </div>
    );
    return <>1</>
}

export default EditOrderPage;
