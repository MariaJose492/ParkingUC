import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  // private baseUrl = 'http://127.0.0.1:8000';
  private baseUrl = 'http://192.168.1.72:8000'

  constructor(private http:HttpClient) {}

  createRegister(register: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/createRegister/`, register);
  }

  updateRegister(registerId: string, updateData:any): Observable<any> {
    return this.http.put(`${this.baseUrl}/updateRegister/${registerId}`, updateData );
  }

  listRegister(): Observable<any> {
    return this.http.get(`${this.baseUrl}/listRegister/`);
  }
  deleteRegister(registerId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/deleteRegister/${registerId}`);
  }
}
