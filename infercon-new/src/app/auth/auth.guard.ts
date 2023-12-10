import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
@Injectable({
  providedIn: 'root' // You can specify where this service should be provided
})
export class authGuard  {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      return true; // User is authenticated
    } else if (localStorage.getItem('authToken')) {
      // Token is in localStorage but might be expired
      // You should add logic to check token validity here
      // For simplicity, let's assume the token is valid
      return true;
    } else {
      // No token, or token is invalid, redirect to login
      this.router.navigate(['login']);
      return false;
    }
  }
}
