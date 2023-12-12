import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

 
  private apiUrl = 'https://api.inferconautomation.online/api/v1/booking';

  constructor(
    private http: HttpClient
  ) {}
  createBookings(data: any): Observable<any> {
       const url = `${this.apiUrl}`;
       return this.http.post(url, data);
  }
  getAllBookings(params: any): Observable<any> {
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
