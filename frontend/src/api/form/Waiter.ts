import { getAuthToken } from "../../services/AuthService";

export interface WaiterData {
    email:  string,
    name:  string,
    surname:  string,
    salary:  string,
    phone:  string,
    restaurantName: string,
    oldEmail: string,
    password:  string
}
const apiUrl = import.meta.env.VITE_BACKEND_URL;

export async function updateWaiter(method: string, waiter: WaiterData):Promise<any> {
    return await fetch(`${apiUrl}/api/restaurantManagementSystem/waiters/admin`, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + getAuthToken()
        },
        body: JSON.stringify(waiter),
      });
}