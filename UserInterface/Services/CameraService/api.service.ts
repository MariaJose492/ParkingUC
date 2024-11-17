import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
    private apiUrl = 'http://127.0.0.1:8000/api/v1/process/card';
  
    constructor(private http: HttpClient) {}
  
    processCardImage(imageBase64: string): Observable<any> {
      const payload = { image: imageBase64 };
      return this.http.post(this.apiUrl, payload);
    }
  }