import { tableActions } from './TableSlice';
import { getAuthToken } from '../util/auth';

export const fetchData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const url = new URL(request.url);
      const pageNumber = url.searchParams.get("pageNumber");
      const searchTerm = url.searchParams.get("searchTerm");
      const pageSize = 10;
      const response = await fetch(`http://localhost:8080/api/restaurantManagementSystem/table/orders?restaurantName=${"Italiano"}&pageNumber=${pageNumber}&pageSize=${pageSize}${searchTerm ? `&searchTerm=${searchTerm}` : ''}`, {
        headers: {
          'Authorization': 'Bearer ' + getAuthToken()
        }
      });

      if (!response.ok) {
        throw new Error('Could not fetch tables!');
      }

      const data = await response.json();

      return data;
    };

    const tables = await fetchData();
    dispatch(
      tableActions.getTables({
        tables: tables.content ?? [],
      })
    );
  };
};
