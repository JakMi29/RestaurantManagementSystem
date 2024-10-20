import { json, redirect } from 'react-router-dom';

import AuthForm from '../components/AuthForm';

function AuthenticationPage() {
  return <AuthForm />;
}

export default AuthenticationPage;

export async function action({ request }) {
  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get('mode') || 'login';
  
  if (mode !== 'login' && mode !== 'signup') {
    throw json({ message: 'Unsupported mode.' }, { status: 422 });
  }
  
  const data = await request.formData();
 let authData;

  if (mode === 'signup') {
    authData = {
      email: data.get('email'),
      password: data.get('password'),
      name: data.get('name'),
      surname: data.get('surname'),
      restaurantName: data.get('restaurantName'),
      phone: data.get('phone'),
    };
  }
  else{
    authData = {
      email: data.get('email'),
      password: data.get('password'),
    };
  }

  const response = await fetch('http://localhost:8080/api/restaurantManagementSystem/auth/' + mode, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(authData),
  });

  if (response.status === 422 || response.status === 401|| response.status===400) {
    return response
  }

  if (!response.ok) {
    throw json({ message: 'Could not authenticate user.' }, { status: 500 });
  }

  const resData = await response.json();
  const token = resData.token;
  const role = resData.role;
  const email=resData.email;
  const restaurantName=resData.restaurantName;

  localStorage.setItem('token', token);
  localStorage.setItem('role', role);
  localStorage.setItem('email', email);
  localStorage.setItem('restaurantName', restaurantName);
  const expiration = new Date();
  expiration.setMinutes(expiration.getMinutes() + 60);
  localStorage.setItem('expiration', expiration.toISOString());

  return redirect('/');
}