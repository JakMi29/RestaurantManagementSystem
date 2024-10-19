import { Form, useFetcher } from 'react-router-dom';
import classes from '../Form.module.css';
import { useContext, useEffect, useRef, useState } from 'react';
import MessageContext from '../../../store/MessageContext';
import { getRestaurantName } from '../../../util/data';
import { getAuthToken } from '../../../util/auth';

function MealFormDialog({ meal, mode, onClose }) {
  const fetcher = useFetcher();
  const [error, setError] = useState(false);
  const [preview, setPreview] = useState(meal ? meal.image : '');
  const formRef = useRef();
  const fileInputRef = useRef();
  const messageCtx = useContext(MessageContext);

  const method = mode === 'create' ? 'post' : 'patch';

  const handleChange = (event) => {
    setError(false);
    if (event.target.name === "image" && event.target.files.length > 0) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
      fileInputRef.current.files = event.dataTransfer.files;
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDragEnter = (event) => {
    event.preventDefault();
  };

  const cancel = () => {
    formRef.current.reset();
    setError(false);
    setPreview(meal ? meal.image : '');
    onClose();
  };

  useEffect(() => {
    if (fetcher.data) {
      if (fetcher.data.code === 200) {
        onClose();
        messageCtx.showMessage(fetcher.data.message, 'info');
        setPreview('');
        setError(false);
      } else {
        setError(true);
      }
    }
  }, [fetcher.data]);

  return (
    <fetcher.Form ref={formRef} method={method} style={{ padding: "0 20px" }} encType="multipart/form-data">
      {error && <p style={{ color: "red" }}>{fetcher.data?.message}</p>}
      <div className={classes.inputContainer} style={{ display: 'none' }}>
        <label htmlFor="oldName">Old Name</label>
        <input
          id="oldName"
          type="text"
          name="oldName"
          defaultValue={meal ? meal.name : ''}
          onChange={handleChange}
        />
      </div>
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
          <option value='APPETIZER'>Appetizer</option>
          <option value='MAIN_DISH'>Main Dish</option>
          <option value='SOUP'>Soup</option>
          <option value='DRINK'>Drink</option>
          <option value='DESSERT'>Dessert</option>
          <option value='ALCOHOLIC_DRINK'>Alcoholic Drink</option>
        </select>
      </div>
      <div className={classes.inputContainer}>
        <label htmlFor="image">Image</label>
        <div
          className={classes.imagePlaceholder}
          onClick={() => fileInputRef.current.click()}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragEnter={handleDragEnter}
          style={{
            backgroundImage: preview ? `url(${preview})` : meal ? `url(${meal.image})` : 'none',
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          {!preview && <p>Click to select photo or drag photo</p>}
        </div>
        <input
          id="image"
          type="file"
          name="image"
          ref={fileInputRef}
          required={method === 'post'}
          style={{ display: 'none' }}
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
        <button type="submit" className={classes.actionButton}>
          {mode === 'create' ? 'Create' : 'Save'}
        </button>
      </div>
    </fetcher.Form>
  );
}

export async function action({ request }) {
  const method = request.method;
  const data = await request.formData();
  const mealData = {
    name: data.get('name'),
    category: data.get('category'),
    price: data.get('price'),
    description: data.get('description'),
    restaurantName: getRestaurantName(),
    oldName: data.get('oldName')
  };

  const formData = new FormData();
  const mealBlob = new Blob([JSON.stringify(mealData)], { type: 'application/json' });

  formData.append('meal', mealBlob);
  formData.append('image', data.get('image'));
  if (method === "patch") {
    formData.append('oldName', data.get('oldName'));
  }

  const url = 'http://localhost:8080/api/restaurantManagementSystem/meal/admin';
  const response = await fetch(url, {
    method: method,
    headers: {
      'Authorization': 'Bearer ' + getAuthToken()
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
    throw new Response(JSON.stringify({ message: 'Could not save meal.' }), { status: 500 });
  }

  return response;
}

export default MealFormDialog;
