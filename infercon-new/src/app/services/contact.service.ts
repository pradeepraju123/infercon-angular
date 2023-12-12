import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private apiUrl = 'http://127.0.0.1:8080/api/v1/contact';

  constructor(
    private http: HttpClient
  ) {}
  createContact(data: any): Observable<any> {
       const url = `${this.apiUrl}`;
       return this.http.post(url, data);
  }
  getAllContact(params: any): Observable<any> {
    const token = localStorage.getItem('authToken'); // Get the token from localStorage

    if (token) {
    return this.http.post(`${this.apiUrl}/get`, { params });
  } else {
  //   // Handle the case where there's no token (e.g., user is not authenticated)
  //   // You can choose to return an error Observable or handle it in a way that suits your application.
     return throwError('No authentication token found'); // For example, using throwError from RxJS
    }
  }
}
