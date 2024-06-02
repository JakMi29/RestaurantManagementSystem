import { Form, json, useNavigation,useNavigate } from 'react-router-dom';
import classes from '../Form.module.css';
import { getAuthToken } from '../../util/auth';

function MealForm({ method, meal }) {
  const navigate = useNavigate();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === 'submitting';

  function cancelHandler() {
    navigate('..');
  }

  return (
    < div className = 'page' >
      <div className={classes.login}>
        <Form method={method} className={classes.form} encType="multipart/form-data">
          <h1>{meal ? "Edit meal" : "Add new meal"}</h1>
          <div className={classes.inputContainer}>
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              name="name"
              required
              defaultValue={meal ? meal.name : ''}
            />
          </div>
          <div className={classes.inputContainer}>
            <label htmlFor="category">Category</label>
            <select
              id="category"
              name="category"
              defaultValue={meal ? meal.category : ''}
              required
            >
              <option value="APPETIZER">Appetizer</option>
              <option value="MAIN_DISH">Main Dish</option>
              <option value="SOUP">Soup</option>
              <option value="DRINK">Drink</option>
              <option value="DESSERT">Dessert</option>
              <option value="ALCOHOLIC_DRINK">Alcoholic Drink</option>
            </select>
          </div>
          <div className={classes.inputContainer}>
            <label htmlFor="image">Image</label>
            <input
              id="image"
              type="file"
              name="image"
              required
            />
          </div>
          <div className={classes.inputContainer}>
            <label htmlFor="price">Price</label>
            <input
              id="price"
              name="price"
              required
              defaultValue={meal ? meal.price : ''}
            />
          </div>
          <div className={classes.inputContainer}>
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              rows="5"
              required
              defaultValue={meal ? meal.description : ''}
            />
          </div>
          <div className={classes.actions}>
            <button type="button" onClick={cancelHandler} className={classes.actions}>
              Cancel
            </button>
            <button type="submit" className={classes.actionButton} disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : (method === 'post' ? 'create' : 'Save')}
            </button>
          </div>
        </Form>
      </div>
    </div >
  );
}

export default MealForm;


export async function action({ request, params }) {
  const data = await request.formData();


  const mealData = {
    name: data.get('name'),
    category: data.get('category'),
    price: data.get('price'),
    description: data.get('description'),
    restaurantName: "Italiano"
  };

  const formData = new FormData();
  const mealBlob = new Blob([JSON.stringify(mealData)], { type: 'application/json' });

  formData.append('meal', mealBlob);
  formData.append('image', data.get('image'));

  let url = 'http://localhost:8080/api/admin/meal';

  const token = getAuthToken();
  const response = await fetch(url, {
    method: { method },
    headers: {
      'Authorization': 'Bearer ' + token
    },
    body: formData,
  });

  if (response.status === 422) {
    return response;
  }
  if (response.status === 400) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: 'Could not save event.' }, { status: 500 });
  }

  return cancelHandler();
}
