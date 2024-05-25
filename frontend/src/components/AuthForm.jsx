import {
  Form,
  Link,
  useActionData,
  useSearchParams,
} from 'react-router-dom';

import classes from './AuthForm.module.css';

function AuthForm() {
  const data = useActionData();
  const [searchParams] = useSearchParams();
  const isLogin = searchParams.get('mode') === 'login';

  return (
    <div className='page'>
      <div className={classes.login}>
        <Form method="post" className={classes.form}>
          <h1>{isLogin ? "Login" : "Sign up"}</h1>
          
          {data && data.message && <p>
            Invalid email or password!
            </p>}
          {!isLogin && (
            <>
              <div className={classes.inputContainer}>
                <label htmlFor="name">Name</label>
                <input id="name" type="name" name="name" required />
              </div>
              <div className={classes.inputContainer}>
                <label htmlFor="surname">Surname</label>
                <input id="surname" type="surname" name="surname" required />
              </div>
              <div className={classes.inputContainer}>
                <label htmlFor="restaurantName">Restaurant name</label>
                <input id="restaurantName" type="restaurantName" name="restaurantName" required />
              </div>
              <div className={classes.inputContainer}>
                <label htmlFor="phone">Phone</label>
                <input id="phone" type="phone" name="phone" required />
              </div>
            </>
          )}
          <div className={classes.inputContainer}>
            <label htmlFor="email">Email</label>
            <input id="email" type="email" name="email" required />
          </div>
          <div className={classes.inputContainer}>
            <label htmlFor="password">Password</label>
            <input id="password" type="password" name="password" required />
          </div>
          <div className={classes.actions}>
            <Link to={`?mode=${isLogin ? 'signup' : 'login'}`} className={classes.mode}>
              {isLogin ? 'Create new user' : 'Login'}
            </Link>
            <button type="submit" className={classes.loginButton}>
              {isLogin ? "Login" : "Sign up"}
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default AuthForm;