import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonGrid, IonRow, IonCardTitle, IonButton, IonIcon, IonCol } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { home, arrowUndo, trash } from 'ionicons/icons';
import { RegisterService } from 'Services/RegisterService/register.service';

@Component({
  selector: 'app-list-register',
  templateUrl: './list-register.page.html',
  styleUrls: ['./list-register.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonGrid, IonRow,IonCardTitle, IonButton, IonCol, IonIcon, CommonModule, FormsModule]
})
export class ListRegisterPage implements OnInit {

  // Cambia la variable a un array para manejar múltiples registros
  registers: any[] = [];

  constructor(private router: Router, private registerService: RegisterService) { 
    addIcons({
      'home': home,
      'arrow-undo': arrowUndo,
      'trash': trash
    });
  }

  ngOnInit() {
    this.listRegister(); 
  }

  goHome() {
    this.router.navigate(['/parking']);
  }

  deleteRegister(vehiclePlate: string): void {
    this.registerService.deleteRegister(vehiclePlate).subscribe(
      (response) => {
        console.log('Registro eliminado:', response);
        // Después de eliminar el registro, actualizar la lista
        this.listRegister();
        alert('Registro eliminado con éxito');
      },
      (error) => {
        console.error('Error al eliminar el registro:', error);
        // Mostrar un mensaje de error basado en el tipo de error
        if (error.status === 400) {
          alert('No se puede eliminar el registro antes de 15 días desde la salida.');
        } else if (error.status === 404) {
          alert('Registro no encontrado.');
        } else {
          alert('Ocurrió un error al intentar eliminar el registro.');
        }
      }
    );
  }
  
  confirmDelete(vehiclePlate: string): void {
    if (confirm('¿Estás seguro de que deseas eliminar este registro?')) {
      this.registerService.deleteRegister(vehiclePlate).subscribe(
        (response) => {
          console.log(response.message); // Mensaje del backend
          this.registers = this.registers.filter(reg => reg.vehiclePlate !== vehiclePlate); // Actualizar la lista
          alert('Registro eliminado con éxito');
        },
        (error) => {
          console.error('Error al eliminar el registro:', error);
          alert('Ocurrió un error al intentar eliminar el registro');
        }
      );
    }
  }

  // Método para listar los registros
  listRegister(): void {
    this.registerService.listRegister().subscribe(
      (response) => {
        console.log('Registros obtenidos:', response);  // Verificar qué está devolviendo la API
        this.registers = response;  // Asignar los registros a la variable 'registers'
      },
      (error) => {
        // esta entrando hasta acá 
        console.error('Error al listar los registros:', error);
      }
    );
  }
  
}
