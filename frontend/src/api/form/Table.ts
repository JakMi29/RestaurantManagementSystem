import { getAuthToken } from "../../services/AuthService";
import { getRestaurantName } from "../../services/LocalStorage";

export interface TableData {
  name: string,
  restaurantName: string,
  oldName: string,
}

export async function updateTable(method: string, table: TableData): Promise<any> {
  return await fetch('http://localhost:8080/api/restaurantManagementSystem/table/admin', {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + getAuthToken()
    },
    body: JSON.stringify(table),
  });
}

