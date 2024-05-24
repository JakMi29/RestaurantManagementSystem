import {
  Form,
  useActionData,
} from 'react-router-dom';

import classes from './AuthForm.module.css';

function AuthForm() {
  const data = useActionData();

  return (
    <div className={classes.page}>
      <Form method="post" className={classes.form}>
        <h1>Login</h1>
        <div className={classes.errorContainer}>
          {data && data.message && <p className={classes.successMessage}>{data.message}</p>}
        </div>
        <div className={classes.inputContainer}>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" required />
        </div>
        <div className={classes.inputContainer}>
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" required />
        </div>
        <div className={classes.actions}>
          <button type="submit" className={classes.loginButton}>
            Login
          </button>
        </div>
      </Form>
    </div>
  );
}

export default AuthForm;