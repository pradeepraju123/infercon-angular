import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators'; 

@Injectable({
  providedIn: 'root'
})
export class TrainingService {

  
  private apiUrl = 'https://api.inferconautomation.online/api/v1/trainings';

  constructor(
    private http: HttpClient,
    private authService: AuthService // Inject your authentication service
  ) {}
  
  getAllTraining(
    data: any
  ): Observable<any> {
    // Make the API request
    return this.http.post(`${this.apiUrl}/all`, data);
  }
getTraining(_id: string): Observable<any> {
      const url = `https://api.inferconautomation.online/api/v1/trainings/${_id}`;
      return this.http.get(url).pipe(
        map((response: any) => response.data) // Extract the 'data' property from the response
      );
    }
getTrainingById(id: string): Observable<any> {
      return this.http.get(`${this.apiUrl}/${id}`);
    }
SearchTrainingByTitle(q: string): Observable<any> {
  const url = `https://api.inferconautomation.online/api/v1/trainings/search?q=${q}`;
  return this.http.get(url).pipe(
    map((response: any) => response.data) // Extract the 'data' property from the response
  );
}
createTraining(data: any): Observable<any> {
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
updateTraining(_id: string, data: any): Observable<any> {
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
