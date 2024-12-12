// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {

//   // constructor() { }

//   getUserCharge(): string | null {
//     return localStorage.getItem('userCharge');
//   }

//   isLoggedIn(): boolean {
//     return !!this.getUserCharge();
//   }

//   // Para usuarios que no requieren login
//   isPublicUser(): boolean {
//     const charge = this.getUserCharge();
//     return !charge || charge === 'Estudiante' || charge === 'Administrativo';
//   }

//   // Permisos específicos
//   canEditPerson(): boolean {
//     return this.getUserCharge() === 'Administrador';
//   }

//   canAccessVehicleManagement(): boolean {
//     const userCharge = this.getUserCharge();
//     return userCharge ? ['Vigilante', 'Administrador'].includes(userCharge) : false;
//   }
// }
