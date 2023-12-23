import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private http: HttpClient) {}

  uploadImage(file: any): Observable<string> {
    const myFormData = new FormData();
    myFormData.append('image', file);
  
    const headers = new HttpHeaders({
      'Accept': 'application/json'
    });
    return this.http.post('https://upload.inferconautomation.com/upload', myFormData, { headers: headers }).pipe(
      map((response: any) => response.fileName) // Replace 'fileName' with the actual key in the response JSON
    );
  }
}
