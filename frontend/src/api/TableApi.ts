import { getAuthToken } from "../services/AuthService";
import { getRestaurantName } from "../services/LocalStorage";

const apiUrl = import.meta.env.VITE_BACKEND_URL;
export const changeTableStatus = async (tableName: string, reverse: boolean): Promise<Response> => {
    return await fetch(`${apiUrl}/api/restaurantManagementSystem/table/waiter?tableName=${tableName}&restaurantName=${getRestaurantName()}&reverse=${reverse}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + getAuthToken()
        },
    })
};
export const deleteTable = async (tableName: string): Promise<Response> => {
    return await fetch(`${apiUrl}/api/restaurantManagementSystem/table/admin?tableName=${tableName}&restaurantName=${getRestaurantName()}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + getAuthToken()
        },
    })
};

export async function getTables(pageNumber: number, pageSize: string, searchTerm?: string): Promise<any> {
    const response = await fetch(`${apiUrl}/api/restaurantManagementSystem/table/orders?restaurantName=${getRestaurantName()}&pageNumber=${pageNumber}&pageSize=${pageSize}${searchTerm ? `&searchTerm=${searchTerm}` : ''}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + getAuthToken()
      },
    });
    return response.json();
  }