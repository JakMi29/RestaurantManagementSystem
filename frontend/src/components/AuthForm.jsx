import {
  Form,
  Link,
  useActionData,
  useSearchParams,
} from 'react-router-dom';

import classes from './Form.module.css';
import { useState } from 'react';

function AuthForm() {
  const data = useActionData();
  const [error, setError] = useState(true);
  const [searchParams] = useSearchParams();
  const isLogin = searchParams.get('mode') === 'login';

  function handleChange() {
    setError(false);
  }

  return (
    <div className='page' style={{ marginLeft: "5px" }}>
      <div className={classes.login}>
        <Form method="post" className={classes.form}>
          <h1>{isLogin ? "Login" : "Sign up"}</h1>
          {(data && error) && (<p>
            {data}
          </p>)}
          {!isLogin && (
            <>
              <div className={classes.inputContainer}>
                <label htmlFor="name">Name</label>
                <input id="name" type="name" name="name" required onChange={handleChange} />
              </div>
              <div className={classes.inputContainer}>
                <label htmlFor="surname">Surname</label>
                <input id="surname" type="surname" name="surname" required onChange={handleChange} />
              </div>
              <div className={classes.inputContainer}>
                <label htmlFor="restaurantName">Restaurant name</label>
                <input id="restaurantName" type="restaurantName" name="restaurantName" required onChange={handleChange} />
              </div>
              <div className={classes.inputContainer}>
                <label htmlFor="phone">Phone</label>
                <input id="phone" type="phone" name="phone" required onChange={handleChange} />
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
              {isLogin ? 'Create new user' : 'Login'}
            </Link>
            <button type="submit" className={classes.actionButton} onClick={() => { setError(true) }}>
              {isLogin ? "Login" : "Sign up"}
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default AuthForm;