// api/orderApi.js

import { getAuthToken, getRestaurantName } from "../services/LocalStorage";

export interface getMealsProps {
    category?: string;
    pageNumber?: number;
    pageSize?: number;
    searchTerm?: string;
    tags?: string;
}

export async function getMeals(props: getMealsProps): Promise<Response> {
    return await fetch(`http://localhost:8080/api/restaurantManagementSystem/meal/all?restaurantName=${getRestaurantName()}&category=${props.category}&pageNumber=${props.pageNumber}&pageSize=${props.pageSize}${props.searchTerm ? `&searchTerm=${props.searchTerm}` : ''}${props.tags ? `&${props.tags}` : ''}`, {
        headers: {
            'Authorization': 'Bearer ' + getAuthToken()
        }
    });
};
