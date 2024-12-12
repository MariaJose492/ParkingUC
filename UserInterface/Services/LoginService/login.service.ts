import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = 'http://127.0.0.1:8000/api/login';

  constructor(private http: HttpClient) {}

  login(email: string, password: string, charge: string): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<any>(this.apiUrl, { email, password, charge }, { headers });
  }

  getUserCharge(): string | null {
    return localStorage.getItem('userCharge');
  }

  isLoggedIn(): boolean {
    return !!this.getUserCharge();
  }

  // Para usuarios que no requieren login
  isPublicUser(): boolean {
    const charge = this.getUserCharge();
    return !charge || charge === 'Estudiante' || charge === 'Administrativo';
  }

  // Permisos específicos
  canEditPerson(): boolean {
    return this.getUserCharge() === 'Administrador';
  }

  canAccessVehicleManagement(): boolean {
    const userCharge = this.getUserCharge();
    return userCharge ? ['Vigilante', 'Administrador'].includes(userCharge) : false;
  }

  logout(): void {
    localStorage.removeItem('user');
  }
}
