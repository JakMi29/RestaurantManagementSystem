import { Form, json, useActionData } from 'react-router-dom';
import classes from '../Form.module.css';
import { useContext, useEffect, useRef, useState } from 'react';
import MealPageContext from '../../store/MealPageContext';
import MessageContext from '../../store/MessageContext';
import { getAuthToken } from '../../util/auth';

function MealModal() {
  const mealPageCtx = useContext(MealPageContext);
  const messageCtx = useContext(MessageContext);
  const [error, setError] = useState(false);
  const method = (mealPageCtx.progress === 'create' ? 'post' : 'patch');
  const meal = mealPageCtx.meal;
  const data = useActionData();
  const formRef = useRef();
  const dialog = useRef();

  function handleChange() {
    setError(false);
  }

  function cancel() {
    mealPageCtx.hide();
    formRef.current.reset();
  }

  useEffect(() => {
    if (data) {
      if (data.success) {
        mealPageCtx.hide();
        messageCtx.showMessage("Meal added successfully", 'info');
        formRef.current.reset();
      } else if (data.error) {
        setError(true);
      }
    }
  }, [data, mealPageCtx, messageCtx]);

  useEffect(() => {
    const modal = dialog.current;
    if (mealPageCtx.progress !== '') {
      modal.showModal();
    } else {
      modal.close();
      formRef.current.reset();
    }
    return () => {
      modal.close();
    };
  }, [mealPageCtx.progress]);

  return (
    <dialog ref={dialog} className="modal-dialog">
      <Form ref={formRef} method={method} className={classes.form} encType="multipart/form-data">
        <h1>{meal ? "Edit meal" : "Add new meal"}</h1>
        {error && (
          <p>{data.message}</p>
        )}
        <div className={classes.inputContainer}>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            name="name"
            required
            defaultValue={meal ? meal.name : ''}
            onChange={handleChange}
          />
        </div>
        <div className={classes.inputContainer}>
          <label htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            defaultValue={meal ? meal.category : ''}
            required
            onChange={handleChange}
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
            onChange={handleChange}
          />
        </div>
        <div className={classes.inputContainer}>
          <label htmlFor="price">Price</label>
          <input
            id="price"
            name="price"
            type="number"
            required
            defaultValue={meal ? meal.price : ''}
            onChange={handleChange}
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
            onChange={handleChange}
          />
        </div>
        <div className={classes.actions}>
          <button type="button" onClick={cancel} className={classes.cancelButton}>
            Cancel
          </button>
          <button type="submit" className={classes.actionButton} onClick={handleChange}>
            {method === 'post' ? 'Create' : 'Save'}
          </button>
        </div>
      </Form>
    </dialog>
  );
}

export default MealModal;


export async function action({ request }) {
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
    method: 'post',
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
    throw json({ message: 'Could not save meal.' }, { status: 500 });
  }

  return { success: true };
}
