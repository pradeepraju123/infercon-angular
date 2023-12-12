import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  private apiUrl = 'https://api.inferconautomation.online/api/v1/registration';

  constructor(
    private http: HttpClient
  ) {}
  createRegistration(data: any): Observable<any> {
       const url = `${this.apiUrl}`;
       return this.http.post(url, data);
  }
}
