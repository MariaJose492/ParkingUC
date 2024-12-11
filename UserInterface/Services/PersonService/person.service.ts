import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  getPerson(personId: string) {
    throw new Error('Method not implemented.');
  }

  private baseUrl = 'http://127.0.0.1:8000';

  constructor(private http: HttpClient) { }

  createPerson(person: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/createPerson/`, person);
  }

  updatePerson(personId: string, updateData: any, charge: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/updatePerson/${personId}`, updateData, charge);
  }

  listPerson(): Observable<any> {
    return this.http.get(`${this.baseUrl}/listPersons/`);
  }
  deletePerson(personId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/deletePerson/${personId}`);
  }

  getPersonByCode(personCode: number): Observable<any> {
    // Asegurarse que la URL esté bien formada
    return this.http.get(`${this.baseUrl}/getPerson/${personCode}`);
  }

  getRole(code: number): Observable<string> {
    return this.http.get<any>(`${this.baseUrl}/getPerson/${code}`).pipe(
      map(person => person.charge)
    );
  }
}

