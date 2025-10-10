import { OrderMealInterface } from './../interfaces/Order';
// api/orderApi.js

import { getAuthToken, getRestaurantName } from "../services/LocalStorage";

const apiUrl = import.meta.env.VITE_BACKEND_URL;

export const changeStatus = async (orderNumber: string, orderMeal: OrderMealInterface): Promise<Response> => {
    return await fetch(`${apiUrl}/api/restaurantManagementSystem/order/waiter/meal?mealName=${orderMeal.meal.name}&restaurantName=${getRestaurantName()}&orderNumber=${orderNumber}&status=${orderMeal.status}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + getAuthToken()
        },
    })
};
