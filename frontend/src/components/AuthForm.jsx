import {
  Form,
  Link,
  useActionData,
  useSearchParams,
} from 'react-router-dom';

import classes from './Form.module.css';
import { useEffect, useState } from 'react';

function AuthForm() {
  const data = useActionData();
  const [error, setError] = useState(false);
  const [searchParams] = useSearchParams();
  const isLogin = searchParams.get('mode') === 'login';
  useEffect(() => {
    if (data) {
      setError(true);
    } else {
      setError(false);
    }
  }, [data]);

  function handleChange() {
    setError(false);
  }

  return (
      <div className={classes.login}>
        <Form method="post" className={classes.form}>
          <h1>{isLogin ? "Login" : "Sign up"}</h1>
          {error && (
            <p>{data.message}</p>
          )}
          {!isLogin && (
            <>
              <div className={classes.inputContainer}>
                <label htmlFor="name">Name</label>
                <input id="name" type="text" name="name" required onChange={handleChange} />
              </div>
              <div className={classes.inputContainer}>
                <label htmlFor="surname">Surname</label>
                <input id="surname" type="text" name="surname" required onChange={handleChange} />
              </div>
              <div className={classes.inputContainer}>
                <label htmlFor="restaurantName">Restaurant name</label>
                <input id="restaurantName" type="text" name="restaurantName" required onChange={handleChange} />
              </div>
              <div className={classes.inputContainer}>
                <label htmlFor="phone">Phone</label>
                <input id="phone" type="text" name="phone" required onChange={handleChange} />
              </div>
            </>
          )}
          <div className={classes.inputContainer}>
            <label htmlFor="email">Email</label>
            <input id="email" type="email" name="email" required onChange={handleChange} />
          </div>
          <div className={classes.inputContainer}>
            <label htmlFor="password">Password</label>
            <input id="password" type="password" name="password" required onChange={handleChange} />
          </div>
          <div className={classes.actions}>
            <Link to={`?mode=${isLogin ? 'signup' : 'login'}`} className={classes.mode}>
              {isLogin ? 'Sign up' : 'Login'}
            </Link>
            <button type="submit" className={classes.actionButton}>
              {isLogin ? "Login" : "Sign up"}
            </button>
          </div>
        </Form>
      </div>
  );
}

export default AuthForm;
