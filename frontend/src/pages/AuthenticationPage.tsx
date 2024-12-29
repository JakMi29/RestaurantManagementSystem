import { json, redirect } from 'react-router-dom';
import { AuthData, authenticate } from '../api/form/Auth';
import AuthForm from '../components/forms/AuthForm';
import classes from './Pages.module.css';


const AuthenticationPage = () => {
  return (
    <div className={classes.page}>
    <AuthForm />
  </div>)
}

export default AuthenticationPage;

export async function action({ request }: { request: Request }) {
  const searchParams = new URL(request.url).searchParams;
  const mode = (searchParams.get('mode') as 'login' | 'signup') || 'login';

  if (mode !== 'login' && mode !== 'signup') {
    throw json({ message: 'Unsupported mode.' }, { status: 422 });
  }

  const data = await request.formData();
  const authData: AuthData = {
    email: data.get('email') as string,
    password: data.get('password') as string,
    name: mode === 'signup' ? (data.get('name') as string) : undefined,
    surname: mode === 'signup' ? (data.get('surname') as string) : undefined,
    restaurantName: mode === 'signup' ? (data.get('restaurantName') as string) : undefined,
    phone: mode === 'signup' ? (data.get('phone') as string) : undefined,
  };

  try {
    await authenticate(mode, authData);
  } catch (error) {
    return error instanceof Response ? error : json({ message: 'Could not authenticate user.' }, { status: 500 });
  }

  return redirect('/');
}