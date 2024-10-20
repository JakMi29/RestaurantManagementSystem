// api/orderApi.js

import { getAuthToken } from "../util/auth";


export const editOrder = (orderNumber, edit, editorEmail) => {
    return fetch(`http://localhost:8080/api/restaurantManagementSystem/order/waiter/edit?orderNumber=${orderNumber}&editor=${editorEmail}&edit=${edit}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + getAuthToken(),
        }
    });
};

export const updateOrder = (order) => {
    return fetch(`http://localhost:8080/api/restaurantManagementSystem/order/waiter/update`, {
        method: 'PUT',
        body: JSON.stringify(order),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + getAuthToken(),
        }
    });
};

export const changeOrderStatus = (orderNumber) => {
    return fetch(`http://localhost:8080/api/restaurantManagementSystem/order/waiter/status?orderNumber=${orderNumber}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + getAuthToken(),
        }
    });
};
