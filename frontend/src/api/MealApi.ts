// api/orderApi.js

import { getAuthToken, getRestaurantName } from "../services/LocalStorage";

export interface getMealsProps {
    category?: string;
    pageNumber?: number;
    pageSize?: number;
    searchTerm?: string;
    tags?: string;
}

const apiUrl = import.meta.env.VITE_BACKEND_URL;

export async function getMeals(props: getMealsProps): Promise<Response> {
    const url = `${apiUrl}/api/restaurantManagementSystem/meal/all?restaurantName=${getRestaurantName()}&category=${props.category}&pageNumber=${props.pageNumber}&pageSize=${props.pageSize}${props.searchTerm ? `&searchTerm=${props.searchTerm}` : ''}${props.tags ? `&${props.tags}` : ''}`;
    return await fetch(url, {
        headers: {
            'Authorization': 'Bearer ' + getAuthToken()
        }
    });
};
