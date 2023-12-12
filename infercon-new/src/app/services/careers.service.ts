import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CareersService {

  private apiUrl = 'http://127.0.0.1:8080/api/v1/careers';

  constructor(
    private http: HttpClient
  ) {}
  createCareer(data: any): Observable<any> {
       const url = `${this.apiUrl}`;
       return this.http.post(url, data);
  }
}
