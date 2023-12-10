import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators'; 

@Injectable({
  providedIn: 'root'
})
export class ServicesdataService {

    
  private apiUrl = 'http://api.inferconautomation.online/api/v1/services-data';

  constructor(
    private http: HttpClient,
    private authService: AuthService // Inject your authentication service
  ) {}
  
getAllServicesdata(): Observable<any> {
      return this.http.get<any>(this.apiUrl);
    }
getServicedata(_id: string): Observable<any> {
      const url = `http://api.inferconautomation.online/api/v1/services-data/${_id}`;
      return this.http.get(url).pipe(
        map((response: any) => response.data) // Extract the 'data' property from the response
      );
    }
createServices(data: any): Observable<any> {
  const token = localStorage.getItem('authToken'); // Get the token from localStorage

  if (token) {
  //   // Set the headers with the bearer token
  const headers = new HttpHeaders({
    'Authorization': 'Bearer ' + token // Include the token in the request headers
     });
     const url = `${this.apiUrl}`;
     return this.http.post(url, data, { headers });
   } else {
  //   // Handle the case where there's no token (e.g., user is not authenticated)
  //   // You can choose to return an error Observable or handle it in a way that suits your application.
     return throwError('No authentication token found'); // For example, using throwError from RxJS
    }
}
updateServicesdata(_id: string, data: any): Observable<any> {
  const token = localStorage.getItem('authToken'); // Get the token from localStorage

    if (token) {
    //   // Set the headers with the bearer token
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token // Include the token in the request headers
       });
  
       const url = `${this.apiUrl}/${_id}`;
       return this.http.post(url, data, { headers });
     } else {
    //   // Handle the case where there's no token (e.g., user is not authenticated)
    //   // You can choose to return an error Observable or handle it in a way that suits your application.
       return throwError('No authentication token found'); // For example, using throwError from RxJS
     }
  
}
}
