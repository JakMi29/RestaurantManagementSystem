import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { IconButton } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import EditOffIcon from '@mui/icons-material/EditOff';
import classes from '../../pages/restaurant/RestaurantPage.module.css';
import MessageContext from '../../store/MessageContext';
import { orderActions } from '../../store/OrderSlice';
import OrderMeal from './OrderMeal';
import { editOrder, updateOrder, changeOrderStatus } from '../../api/OrderApi';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { MessageMode } from '../../constants/MessageMode';
import { OrderInterface, OrderMealInterface, OrderMealStatus } from '../../interfaces/Order';
import { getEmail } from '../../services/LocalStorage';
import uiClasses from '../../components/ux/Ui.module.css';
import { editOrderActions } from '../../store/EditOrderSlice';

const sortMeals = (meals: OrderMealInterface[]) => {
    const statusOrder = [OrderMealStatus.PREPARING, OrderMealStatus.READY, OrderMealStatus.RELEASED];
    return meals.slice().sort((a: OrderMealInterface, b: OrderMealInterface) => {
        const statusComparison = statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status);
        if (statusComparison !== 0) return statusComparison;
        return a.meal.name.localeCompare(b.meal.name);
    });
}

const Order = (props: { order: OrderInterface, admin: boolean }) => {
    const dispatch = useDispatch();
    const messageCtx = useContext(MessageContext);
    const navigate = useNavigate();
    const [navigatePath, setNavigatePath] = useState(null);
    const isDisabled = props.order.edit ? props.order.editor?.email !== getEmail() : false;
    const mealsToDisplay = props.order.edit ? sortMeals(props.order.meals) : props.order.meals;

    useEffect(() => {
        if (navigatePath) {
            navigate(navigatePath);
            setNavigatePath(null);
        }
    }, [navigatePath, navigate]);

    const handleEditAndAddMeals = () => {
        editOrder(props.order.number, true, getEmail())
            .then((response: Response) => {
                if (response.ok) {
                    handleAddMeals();
                } else {
                    messageCtx.showMessage('Something went wrong', MessageMode.ERROR);
                }
            })
    };

    const handleChange = () => {
        editOrder(props.order.number, !props.order.edit, getEmail())
            .then((response: Response) => {
                if (!response.ok) {
                    messageCtx.showMessage('Something went wrong', MessageMode.ERROR);
                    return;
                }
                return response.json();
            })
            .then((data: OrderInterface) => {
                if (props.order.edit) {
                    dispatch(orderActions.revertChanges({ number: data.number }));
                }
            })
    };

    const handleAddMeals = () => {
        dispatch(editOrderActions.addMeals({ meals: props.order.meals, number: props.order.number }));
        navigate(`/restaurant/orderMeals?number=${props.order.number}&category=soup&pageNumber=0&pageSize=12`);
    };

    const handleUpdateOrder = () => {
        updateOrder(props.order)
            .then(response => response.ok ? response.json() : Promise.reject())
            .then(() => messageCtx.showMessage('Successfully updated order', MessageMode.INFO))
            .catch(error => console.error('Error sending request:', error));
    };

    const handleChangeStatus = () => {
        changeOrderStatus(props.order.number)
            .then(response => response.ok ? response.json() : Promise.reject())
            .then(() => messageCtx.showMessage('Successfully updated order status', MessageMode.INFO))
            .catch(error => console.error('Error sending request:', error));
    };

    return (
        <>
            {props.order && (
                <>
                    <div className={classes.customers}>
                        <p style={{ margin: "5px" }}>Customers</p>
                        {props.order.edit && !isDisabled ? (
                            <div className={classes.orderMealActions}>
                                <button className={uiClasses.redButton}
                                    onClick={() => dispatch(orderActions.decreaseCustomers({ number: props.order.number }))}>
                                    -
                                </button>
                                {props.order.customerQuantity}
                                <button className={uiClasses.greenButton}
                                    onClick={() => dispatch(orderActions.increaseCustomers({ number: props.order.number }))}>
                                    +
                                </button>
                            </div>
                        ) : (
                            props.order.customerQuantity
                        )}
                    </div>

                    {props.order.meals && props.order.meals.length > 0 ? (
                        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "200px" }}>
                            <div className={classes.mealsContainer}>
                                {mealsToDisplay.map((orderMeal, index) => (
                                    <OrderMeal
                                        key={`${props.order.number}-${index}`}
                                        orderNumber={props.order.number}
                                        orderMeal={orderMeal}
                                        edit={props.order.edit && !isDisabled}
                                        admin={props.admin}
                                    />
                                ))}
                            </div>
                            {props.order.edit && !props.admin && <button className={classes.addMore} onClick={handleAddMeals}>Add more</button>}
                            <div className={classes.customers}>
                                <p style={{ margin: "5px" }}>Total cost</p>
                                <>{props.order.price.toFixed(2)} USD</>
                            </div>
                        </div>
                    ) : (
                        <div className={classes.imageContainer}>
                            {!isDisabled && (
                                props.admin ? (
                                    <ShoppingCartIcon
                                        sx={{ fontSize: "90px" }}
                                        className={classes.iconButton}
                                    />
                                ) : (
                                    <IconButton onClick={props.order.edit ? handleAddMeals : handleEditAndAddMeals}>
                                        <AddShoppingCartIcon
                                            sx={{ fontSize: "90px" }}
                                            className={classes.iconButton}
                                        />
                                    </IconButton>
                                )
                            )}
                            {isDisabled && !props.admin && (
                                <EditOffIcon sx={{ fontSize: "90px", color: "rgb(60, 60, 211, 0.2)" }} />
                            )}
                        </div>
                    )}


                    {!props.admin && (
                        <div className={classes.actions}>
                            <button
                                disabled={!props.order.edit && props.order.status !== 'RELEASED'}
                                className={uiClasses.greenButton}
                                onClick={props.order.edit ? handleUpdateOrder : handleChangeStatus}>
                                {props.order.edit && !isDisabled ? 'Ok' : 'Paid'}
                            </button>
                            <button className={uiClasses.blueButton} onClick={handleChange}>
                                {props.order.edit && !isDisabled ? 'Cancel' : 'Edit'}
                            </button>
                        </div>
                    )}
                </>
            )}
        </>
    );
}

export default Order;
