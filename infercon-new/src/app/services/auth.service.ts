import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token: string | null = null;

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post('http://api.inferconautomation.online/api/v1/users/login', { username, password });
  }
  setToken(token: string | null) {
    this.token = token;

    if (token) {
      // Set token expiration check here (use the token payload to check the expiration)
      const payload = this.decodeJwt(token);
      if (payload.exp) {
        const expirationTimestamp = payload.exp * 1000; // Convert expiration to milliseconds
        const currentTimestamp = Date.now();
        const timeUntilExpiration = expirationTimestamp - currentTimestamp;

        if (timeUntilExpiration > 0) {
          // Token is still valid, set a timeout to automatically clear it when it expires
          setTimeout(() => this.clearTokenAndNavigateToLogin(), timeUntilExpiration);
        } else {
          // Token is already expired, navigate to the login page immediately
          this.navigateToLogin();
        }
      }
    }
  }



  private navigateToLogin() {
    // Use the Angular Router to navigate to the login page
    this.router.navigate(['/login']); // Replace '/login' with your actual login page route
  }
  getToken(): string | null {
    return this.token;
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  clearToken() {
    this.token = null;
    localStorage.removeItem('authToken');
  }
  private clearTokenAndNavigateToLogin() {
    this.clearToken();
    this.navigateToLogin();
  }
  private decodeJwt(token: string): any {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(atob(base64));
  }

}
