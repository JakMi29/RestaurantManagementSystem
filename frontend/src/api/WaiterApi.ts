// api/orderApi.js

import { getAuthToken } from "../services/LocalStorage";

interface getWaitersProps {
    pageNumber: number;
    pageSize: number;
    searchTerm?: string;
}

const apiUrl = import.meta.env.VITE_BACKEND_URL;
export async function getWaiters(props: getWaitersProps): Promise<any> {
    return await fetch(
        `${apiUrl}/api/restaurantManagementSystem/waiters/all?restaurantName=Italiano&pageNumber=${props.pageNumber}&pageSize=${props.pageSize}${props.searchTerm ? `&searchTerm=${props.searchTerm}` : ''}`,
        {
            headers: {
                'Authorization': `Bearer ${getAuthToken()}`,
            },
        }
    )
}
export async function deleteWaiter(email:string): Promise<any> {
    return  await fetch(`${apiUrl}/api/restaurantManagementSystem/waiters/admin?email=${email}`, {
        method: 'PATCH',
        headers: {
            'Authorization': 'Bearer ' + getAuthToken()
        },
    })
}
