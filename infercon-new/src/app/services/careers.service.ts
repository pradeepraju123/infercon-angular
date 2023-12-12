import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CareersService {

  private apiUrl = 'https://api.inferconautomation.online/api/v1/careers';

  constructor(
    private http: HttpClient
  ) {}
  createCareer(data: any): Observable<any> {
       const url = `${this.apiUrl}`;
       return this.http.post(url, data);
  }
}
