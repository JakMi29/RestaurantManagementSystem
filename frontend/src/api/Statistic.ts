import { OrderMealTableResponse } from "../interfaces/OrderMealsTable";
import { OrderResponse } from "../interfaces/OrdersTable";
import { SortModel } from "../pages/statistic/components/OrdersTables";
import { getAuthToken } from "../services/AuthService";
import { getRestaurantName } from "../services/LocalStorage";

const apiUrl = import.meta.env.VITE_BACKEND_URL;
export async function mealsStatistics(period?: string): Promise<Response> {
    return await fetch(`${apiUrl}/api/restaurantManagementSystem/admin/statistics/meals?restaurantName=${getRestaurantName()}&period=${period}`, {
        headers: {
            'Authorization': 'Bearer ' + getAuthToken()
        }
    });
}

export async function ordersStatistics(period: string): Promise<Response> {
    return await fetch(`${apiUrl}/api/restaurantManagementSystem/admin/statistics/orders?restaurantName=${getRestaurantName()}&period=${period}`, {
        headers: {
            'Authorization': 'Bearer ' + getAuthToken()
        }
    });
}

export async function waitersStatistics(pageNumber?: string, pageSize?: string, period?: string, searchTerm?: string): Promise<Response> {
    return await fetch(`${apiUrl}/api/restaurantManagementSystem/admin/statistics/waiters?restaurantName=${getRestaurantName()}&pageNumber=${pageNumber}&pageSize=${pageSize}${searchTerm ? `&searchTerm=${searchTerm}` : ''}&period=${period}`, {
        headers: {
            'Authorization': 'Bearer ' + getAuthToken()
        }
    });
}

export async function waiterStatistics(email?:string, period?: string): Promise<Response> {
    return await fetch(`${apiUrl}/api/restaurantManagementSystem/admin/statistics/waiter?email=${email}&period=${period}`, {
        headers: {
          'Authorization': 'Bearer ' + getAuthToken()
        }
      });
}

export async function orderDetails(number: string): Promise<Response> {
    return await fetch(`${apiUrl}/api/restaurantManagementSystem/order?number=${number}`, {
        headers: {
            'Authorization': 'Bearer ' + getAuthToken()
        }
    });
}

export async function getOrders(page: number, pageSize: number, period: string, sortModel: SortModel[]): Promise<OrderResponse> {
    const response = await fetch(
        `${apiUrl}/api/restaurantManagementSystem/order/all?restaurantName=${getRestaurantName()}&period=${period}&pageSize=${pageSize}&pageNumber=${page}${sortModel.length > 0 ? `&sortField=${sortModel[0].field}&sortType=${sortModel[0].sort}` : ''}`, {
        headers: {
            'Authorization': 'Bearer ' + getAuthToken(),
        },
    });
    const data: OrderResponse = await response.json();
    return data;
}
export async function getMealsTable(page: number, pageSize: number, period: string, sortModel: SortModel[]): Promise<OrderMealTableResponse> {
    const response = await fetch(
        `${apiUrl}/api/restaurantManagementSystem/admin/statistics/table/meals?restaurantName=${getRestaurantName()}&period=${period}&pageSize=${pageSize}&pageNumber=${page}${sortModel.length > 0 ? `&sortField=${sortModel[0].field}&sortType=${sortModel[0].sort}` : ''}`, {
        headers: {
            'Authorization': 'Bearer ' + getAuthToken()
        },
    });
    const data: OrderMealTableResponse = await response.json();
    return data;
}
