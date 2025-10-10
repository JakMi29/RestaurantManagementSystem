import { getAuthToken } from "../../services/AuthService";
import { getRestaurantName } from "../../services/LocalStorage";

export interface MealData {
    name: string;
    category: string;
    price: number;
    description: string;
    restaurantName: string;
    oldName?: string;
}
const apiUrl = import.meta.env.VITE_BACKEND_URL;
export async function manageMeal(method: string, mealData: MealData, image: File): Promise<any> {
    const formData = new FormData();
    const mealBlob = new Blob([JSON.stringify(mealData)], { type: 'application/json' });

    formData.append('meal', mealBlob);
    formData.append('image', image);

    if (method === 'patch') {
        formData.append('oldName', mealData.oldName || '');
    }

    const url = `${apiUrl}/api/restaurantManagementSystem/meal/admin`;
    const response = await fetch(url, {
        method: method.toUpperCase(),
        headers: {
            'Authorization': 'Bearer ' + getAuthToken()
        },
        body: formData,
    });

    if (response.status === 422 || response.status === 400) {
        return Promise.reject(response);
    }

    if (!response.ok) {
        throw new Error('Could not save meal.');
    }
}

export async function mealOfTheDay(mealName: string):Promise<any> {
    const restaurantName = getRestaurantName(); 
    return await fetch(`${apiUrl}/api/restaurantManagementSystem/meal/admin/mealOfTheDay?restaurantName=${restaurantName}&name=${mealName}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + getAuthToken()
        },
    })
}

export async function deleteMeal(mealName: string):Promise<any> {
    const restaurantName = getRestaurantName(); 
    return await fetch(`${apiUrl}/api/restaurantManagementSystem/meal/admin?restaurantName=${restaurantName}&name=${mealName}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + getAuthToken()
        },
    })
}