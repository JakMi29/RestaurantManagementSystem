import { redirect } from 'react-router-dom';

export function getTokenDuration(): number {
    const storedExpirationDate = localStorage.getItem('expiration');

    if (!storedExpirationDate) {
        return 0;
    }
    const expirationDate = new Date(storedExpirationDate);
    const now = new Date();
    const duration = expirationDate.getTime() - now.getTime();
    return duration;
}

export function getAuthToken(): string | null {
    const token = localStorage.getItem('token');

    if (!token) {
        return null;
    }

    const tokenDuration = getTokenDuration();

    if (tokenDuration <= 0) {
        return 'EXPIRED';
    }

    return token;
}

export function tokenLoader() {
    const token = getAuthToken();
    return token;
}

export function checkAuthLoader() {
    const token = getAuthToken();

    if (!token || token === 'EXPIRED') {
        return redirect('auth');
    }
}

export function action() {
    localStorage.clear()
    return redirect('/');
  }