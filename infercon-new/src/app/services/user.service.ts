import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { User } from './user.model'
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://127.0.0.1:8080/api/v1/users';

  constructor(
    private http: HttpClient,
    private authService: AuthService // Inject your authentication service
  ) {}
  
  getAllUsers(): Observable<User[]> {
    const token = localStorage.getItem('authToken'); // Get the token from localStorage

    if (token) {
      // Set the headers with the bearer token
      const headers = new HttpHeaders({
        'Authorization': 'Bearer ' + token // Include the token in the request headers
      });
  
      // Pass the headers as the second argument in the request
      return this.http.get<User[]>(this.apiUrl, { headers });
    } else {
      // Handle the case where there's no token (e.g., user is not authenticated)
      // You can choose to return an error Observable or handle it in a way that suits your application.
      return throwError('No authentication token found'); // For example, using throwError from RxJS
    }
}
}
