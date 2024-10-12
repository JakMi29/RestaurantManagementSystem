import { Form, Link, useActionData, useSearchParams } from 'react-router-dom';
import classes from '../Form.module.css';
import { useEffect, useState } from 'react';

function WaiterFormDialog({ waiter, mode, onClose }) {
  const [error, setError] = useState(false);
  const data = useActionData();

  useEffect(() => {
    if (data) {
      if (data.code === 200) {
        onClose()
      } else {
        setError(true);
      }
    }
  }, [data]);

  const handleChange = (event) => {
    setError(false);
  }

  return (
    <div>
      <Form method="post" >
        {error && <p style={{color:"red"}}>{data.message}</p>}
          <div className={classes.inputContainer}>
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              name="name"
              required
              onChange={handleChange}
              defaultValue={waiter ? waiter.name : ''}
            />
          </div>
          <div className={classes.inputContainer}>
            <label htmlFor="surname">Surname</label>
            <input
              id="surname"
              type="text"
              name="surname"
              required
              onChange={handleChange}
              defaultValue={waiter ? waiter.name : ''}

            />
          </div>
          <div className={classes.inputContainer}>
            <label htmlFor="restaurantName">Restaurant name</label>
            <input
              id="restaurantName"
              type="text"
              name="restaurantName"
              required
              onChange={handleChange}
              defaultValue={waiter ? waiter.name : ''}
            />
          </div>
          <div className={classes.inputContainer}>
            <label htmlFor="phone">Phone</label>
            <input
              id="phone"
              type="text"
              name="phone"
              required
              onChange={handleChange}
              defaultValue={waiter ? waiter.phone : ''}

            />
          </div>
          <div className={classes.inputContainer}>
            <label htmlFor="salary">Salary</label>
            <input
              id="salary"
              type="text"
              name="salary"
              required
              onChange={handleChange}
              defaultValue={waiter ? waiter.salary : ''}
            />
          </div>
        <div className={classes.inputContainer}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            required
            onChange={handleChange}
            defaultValue={waiter ? waiter.email : ''}

          />
        </div>
        <div className={classes.inputContainer}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            required
            onChange={handleChange}
            defaultValue={waiter ? waiter.password : ''}
          />
        </div>
        <input type="hidden" name="oldName" value={waiter.email} />
        <input type="hidden" name="mode" value={mode} />
        <div className={classes.actions}>
          <button className={classes.actionButton}>
            Cancel
          </button>
          <button type="submit" className={classes.actionButton}>
            {create ? "Create" : "Update"}
          </button>
        </div>
      </Form>
    </div>
  );
}

export const action = async ({ request }) => {
  const formData = await request.formData();
  const name = formData.get('name');
  const oldName = formData.get('oldName');
  const restaurantName = getRestaurantName();
  const mode = formData.get('mode');

  const response = await fetch(`http://localhost:8080/api/restaurantManagementSystem/table/admin?tableName=${name}` +
    (mode === "create" ? "" : `&oldTableName=${oldName}`) +
    `&restaurantName=${restaurantName}`, {
    method: mode === "create" ? "POST" : "PUT",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + getAuthToken()
    }
  });


  if (response.status === 422) {
    return response;
  }
  if (response.status === 400) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: 'Could not save waiter.' }, { status: 500 });
  }

  return response;
};

export default WaiterFormDialog;