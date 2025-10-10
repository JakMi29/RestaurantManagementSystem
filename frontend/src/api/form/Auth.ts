export interface AuthData {
    email: string;
    password: string;
    name?: string;
    surname?: string;
    restaurantName?: string;
    phone?: string;
}
const apiUrl = import.meta.env.VITE_BACKEND_URL;
export async function authenticate(mode: 'login' | 'signup', authData: AuthData): Promise<void> {
    const response = await fetch(`${apiUrl}/api/restaurantManagementSystem/auth/${mode}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(authData),
    });

    if (response.status === 422 || response.status === 401 || response.status === 400) {
        return Promise.reject(response);
    }

    if (!response.ok) {
        throw new Error('Could not authenticate user.');
    }

    const resData = await response.json();
    const token = resData.token;
    const role = resData.role;
    const email = resData.email;
    const restaurantName = resData.restaurantName;

    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
    localStorage.setItem('email', email);
    localStorage.setItem('restaurantName', restaurantName);

    const expiration = new Date();
    expiration.setMinutes(expiration.getMinutes() + 60);
    localStorage.setItem('expiration', expiration.toISOString());
}