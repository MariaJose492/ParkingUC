import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  // private baseUrl = 'http://127.0.0.1:8000';
  private baseUrl = 'http://192.168.1.72:8000'

  constructor(private http:HttpClient) {}

  createPerson(person: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/createPerson/`, person);
  }

  updatePerson(personId: string, updateData:any): Observable<any> {
    return this.http.put(`${this.baseUrl}/updatePerson/${personId}`, updateData );
  }

  listPerson(): Observable<any> {
    return this.http.get(`${this.baseUrl}/listPerson/`);
  }
  deletePerson(personId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/deletePerson/${personId}`);
  }
}

