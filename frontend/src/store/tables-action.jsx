import { tableActions } from './table-slice';
import { getAuthToken } from '../util/auth';

export const fetchData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:8080/api/admin/tables/orders?restaurantName=${"Italiano"}`, {
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
          tables: tables || [],
        })
      );
  };
};
