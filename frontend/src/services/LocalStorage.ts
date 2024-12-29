export function getAuthToken(): string | undefined {
  return localStorage.getItem('token') ?? undefined;
}

export function getRole(): string | undefined {
  return localStorage.getItem('role') ?? undefined;
}

export function getRestaurantName(): string | undefined {
  return localStorage.getItem('restaurantName') ?? undefined;
}

export function getEmail(): string | undefined {
  return localStorage.getItem('email') ?? undefined;
}

export function getExpiration(): string | undefined {
  return localStorage.getItem('expiration') ?? undefined;
}
