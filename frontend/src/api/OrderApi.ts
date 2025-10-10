// api/orderApi.js

import { OrderInterface } from "../interfaces/Order";
import { getAuthToken, getEmail, getRestaurantName } from "../services/LocalStorage";

const apiUrl = import.meta.env.VITE_BACKEND_URL;

export const getOrder = async (orderNumber: string): Promise<Response> => {
    return await fetch(`${apiUrl}/api/restaurantManagementSystem/order?number=${orderNumber}`, {
        headers: {
            'Authorization': 'Bearer ' + getAuthToken()
        }
    });
};

export const editOrder = async (orderNumber: string, edit: boolean, editorEmail?: string): Promise<Response> => {
    return await fetch(`${apiUrl}/api/restaurantManagementSystem/order/waiter/edit?orderNumber=${orderNumber}&editor=${editorEmail}&edit=${edit}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + getAuthToken(),
        }
    });
};

export const updateOrder = async (order: OrderInterface): Promise<Response> => {
    return await fetch(`${apiUrl}/api/restaurantManagementSystem/order/waiter/update`, {
        method: 'PUT',
        body: JSON.stringify(order),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + getAuthToken(),
        }
    });
};

export const changeOrderStatus = async (orderNumber: string): Promise<Response> => {
    return await fetch(`${apiUrl}/api/restaurantManagementSystem/order/waiter/status?orderNumber=${orderNumber}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + getAuthToken(),
        }
    });
};

export const createOrder = async (tableName: string): Promise<Response> => {
    return await fetch(`${apiUrl}/api/restaurantManagementSystem/order/waiter`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + getAuthToken()
        },
        body: JSON.stringify({
            tableName: tableName,
            restaurantName: getRestaurantName(),
            waiterEmail: getEmail()
        })
    })
};
