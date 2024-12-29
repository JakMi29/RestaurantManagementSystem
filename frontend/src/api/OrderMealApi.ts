import { OrderMealInterface } from './../interfaces/Order';
// api/orderApi.js

import { getAuthToken, getRestaurantName } from "../services/LocalStorage";


export const changeStatus = async (orderNumber: string, orderMeal: OrderMealInterface): Promise<Response> => {
    return await fetch(`http://localhost:8080/api/restaurantManagementSystem/order/waiter/meal?mealName=${orderMeal.meal.name}&restaurantName=${getRestaurantName()}&orderNumber=${orderNumber}&status=${orderMeal.status}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + getAuthToken()
        },
    })
};
