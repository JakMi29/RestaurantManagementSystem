import { json, useLoaderData,defer } from 'react-router-dom';
import MealForm from '../../components/meals/MealForm';
import { getAuthToken } from '../../util/auth';


function EditMealPage() {
  const {meal}=useLoaderData();
  return (
    <MealForm method="patch" meal={meal}/>
  );
}

export default EditMealPage;

async function loadMeal(name) {
  const token = getAuthToken();
  const response = await fetch('http://localhost:8080/api/admin/meal?restaurantName=Italiano&name=' + name, {
    headers: {
      'Authorization': 'Bearer ' + token
    }
  });
  if (!response.ok) {
    throw json(
      { message: 'Could not fetch meal.' },
      {
        status: 500,
      }
    );
  } else {
  const resData = await response.json();
  return resData;
}
}

export async function loader({ request }) {
  const url = new URL(request.url);
  const name = url.searchParams.get("name");
  return defer({
    meal: await loadMeal(name),
  });
}