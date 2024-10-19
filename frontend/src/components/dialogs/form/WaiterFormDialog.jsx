import { Form, useFetcher } from 'react-router-dom';
import classes from '../Form.module.css';
import { useContext, useEffect, useState } from 'react';
import { getRestaurantName } from '../../../util/data';
import { getAuthToken } from '../../../util/auth';
import MessageContext from '../../../store/MessageContext';

function WaiterFormDialog({ waiter, mode, onClose}) {
  const fetcher = useFetcher();
  const [error, setError] = useState(false);
  const messageCtx = useContext(MessageContext);
  const method = mode === 'create' ? 'post' : 'put';

  useEffect(() => {
    if (fetcher.data) {
      if (fetcher.data.code === 200) {
        messageCtx.showMessage(fetcher.data.message, 'info');
        onClose();
      } else {
        setError(true);
      }
    }
  }, [fetcher.data]);

  const handleChange = (event) => {
    setError(false);
  };

  return (
    <div>
      <fetcher.Form method={method}>
        {error && <p style={{ color: "red" }}>{fetcher.data?.message}</p>}
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
            defaultValue={waiter ? waiter.surname : ''}
          />
        </div>
        <div className={classes.inputContainer}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="text"
            name="email"
            required
            onChange={handleChange}
            defaultValue={waiter ? waiter.email : ''}
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
        <input type="hidden" name="oldEmail" value={waiter ? waiter.email : ''} />
        <div className={classes.actions}>
          <button type="button" onClick={onClose} className={classes.actionButton}>
            Cancel
          </button>
          <button type="submit" className={classes.actionButton}>
            {mode === "create" ? "Create" : "Update"}
          </button>
        </div>
      </fetcher.Form>
    </div>
  );
}

export async function action({ request }) {
  const method = request.method;
  const data = await request.formData();
  const waiterData = {
    email: data.get('email'),
    name: data.get('name'),
    surname: data.get('surname'),
    salary: data.get('salary'),
    phone: data.get('phone'),
    restaurantName: getRestaurantName(),
    oldEmail: data.get('oldEmail'),
    password: data.get('password')
  };
  const url = 'http://localhost:8080/api/restaurantManagementSystem/waiters/admin';
  const response = await fetch(url, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + getAuthToken()
    },
    body: JSON.stringify(waiterData),
  });
  
  if (response.status === 422) {
    return response;
  }
  if (response.status === 400) {
    return response;
  }

  if (!response.ok) {
    throw new Response(JSON.stringify({ message: 'Could not save waiter.' }), { status: 500 });
  }

  return response;
}

export default WaiterFormDialog;