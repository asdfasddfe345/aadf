import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

function parseRoleFromJwt(token: string | null): 'ADMIN' | 'USER' | null {
  try {
    if (!token) return null;
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload?.role ?? 'USER';
  } catch {
    return null;
  }
}

@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const role = parseRoleFromJwt(sessionStorage.getItem('boapi_token'));
    if (role === 'ADMIN') {
      return true;
    }
    this.router.navigate(['/']);
    return false;
  }
}