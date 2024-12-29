import { Form, NavLink, useActionData, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import classes from './Form.module.css';
import uiClasses from '../ux/Ui.module.css';
import { TextField } from '@mui/material';

interface ActionData {
  message?: string;
}

const AuthForm = () => {
  const data = useActionData() as ActionData | undefined;
  const [error, setError] = useState<boolean>(false);
  const [searchParams] = useSearchParams();
  const isLogin = searchParams.get('mode') === 'login';

  useEffect(() => {
    if (data && data.message) {
      setError(true);
    } else {
      setError(false);
    }
  }, [data]);

  const handleChange = () => {
    setError(false);
  };

  return (
    <Form method="post" className={classes.form} style={{ boxShadow: "0px 5px 5px rgba(0, 0, 0, 0.1)", padding: "40px" }}>
      <h1>{isLogin ? "Login" : "Sign up"}</h1>
      {error && data && (
        <span style={{ color: 'red' }}>{data.message}</span>
      )}
      {!isLogin && (
        <>
          <TextField
            id="name"
            type="text"
            name="name"
            label="Name"
            onChange={handleChange}
          />
          <TextField
            id="surname"
            type="text"
            name="surname"
            label="Surname"
            onChange={handleChange}
          />
          <TextField
            id="restaurantName"
            label="Restaurant Name"
            type="text"
            name="restaurantName"
            onChange={handleChange}
          />
          <TextField
            id="phone"
            type="text"
            name="phone"
            label="Phone"
            onChange={handleChange}
          />
        </>
      )}
      <TextField
        id="email"
        type="email"
        name="email"
        label="Email"
        onChange={handleChange}
      />
      <TextField
        id="password"
        type="password"
        name="password"
        label="Password"
        onChange={handleChange}
      />
      <div className={classes.actions}>
        <NavLink className={uiClasses.navLinkLogin} to={`?mode=${isLogin ? 'signup' : 'login'}`}>
          {isLogin ? 'Sign up' : 'Login'}
        </NavLink>
        <button className={uiClasses.blueButton}>
          {isLogin ? "Login" : "Sign up"}
        </button>
      </div>
    </Form>
  );
}

export default AuthForm;
