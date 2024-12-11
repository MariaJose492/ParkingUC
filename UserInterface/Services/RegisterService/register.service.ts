import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private baseUrl = 'http://127.0.0.1:8000';
  // private baseUrl = 'http://192.168.1.72:8000'

  constructor(private http:HttpClient) {}

  createRegister(register: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/createRegister/`, register);
  }

  updateRegister(vehiclePlate: string, updateData:any): Observable<any> {
    const cleanPlate = vehiclePlate.trim();
    return this.http.put(`${this.baseUrl}/updateRegister/${cleanPlate}`, updateData );
  }

  listRegister(): Observable<any> {
    return this.http.get(`${this.baseUrl}/listRegisters/`);
  }
  deleteRegister(vehiclePlate: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/deleteRegister/${vehiclePlate}`);
  }

  getRegistersWithoutExit(): Observable<any> {
    return this.http.get(`${this.baseUrl}/getRegistersWithoutExit`);
  }

  getRegisterByPlateAndDateTimeExit(plate: string): Observable<any> {
    const cleanPlate = plate.trim();
    return this.http.get(`${this.baseUrl}/getRegisterByPlateAndDateTimeExit/${cleanPlate}`);
  }

  getParkingSpaces(): Observable<any> {
    return this.http.get(`${this.baseUrl}/getParkingSpaces`);  
  }
}
