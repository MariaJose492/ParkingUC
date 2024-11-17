import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { 
  IonContent, 
  IonHeader, 
  IonTitle, 
  IonToolbar, 
  IonButtons, 
  IonButton, 
  IonBackButton, 
  IonItem, 
  IonLabel, 
  IonCard, 
  IonCardHeader, 
  IonCardTitle, 
  IonCardContent, 
  IonGrid, 
  IonRow, 
  IonCol, 
  IonInput, 
  IonIcon 
} from '@ionic/angular/standalone';
import { RegisterService } from 'services/RegisterService/register.service';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.page.html',
  styleUrls: ['./camera.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonButton,
    IonBackButton,
    IonItem,
    IonLabel,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonGrid,
    IonRow,
    IonCol,
    IonInput,
    IonIcon,
    CommonModule,
    FormsModule
  ]
})
export class CameraPage implements OnInit {

  constructor(private registerService: RegisterService, private router: Router) { }

  

  ngOnInit() {
    //
  }

  register ={
    vehicleType: '',
    personCode: 0,
    vehiclePlate: '',
    dateTimeEntrance: '',
    dateTimeExit: null,
  }

  // Call the service to create a register
  createRegister() {
    if (this.register.vehicleType && this.register.personCode && this.register.vehiclePlate ) {
      
      if (this.register.dateTimeEntrance){
        this.register.dateTimeEntrance = new Date(this.register.dateTimeEntrance).toISOString();
      } else {
        this.register.dateTimeEntrance = new Date().toISOString();
      }

      this.registerService.createRegister(this.register).subscribe(
        (response) => {
          console.log('Registro creado:', response);
          alert('Registro creado con éxito');
          this.register = { vehicleType: '', personCode: 0, vehiclePlate: '', dateTimeEntrance: new Date().toISOString(), dateTimeExit: null };
        },
        (error) => {
          console.error('Error al crear el registro:', error);
          alert('Error al crear el registro');
        }
      );
    } else {
      alert('Por favor, llena todos los campos requeridos');
    }
  }
  // Call the service to update a register
  updateRegister(registerId: string): void {
    const updateData = {
      dateTimeExit: '',
    };

    this.registerService.updateRegister(registerId, updateData).subscribe(
      (response) => {
        console.log('Registro actualizado:', response);
      },
      (error) => {
        console.error('Error al actualizar el registro:', error);
      }
    );
  }

  // Call the service to delete a register
  deleteRegister(registerId: string): void {
    this.registerService.deleteRegister(registerId).subscribe(
      (response) => {
        console.log('Registro eliminado:', response);
      },
      (error) => {
        console.error('Error al eliminar el registro:', error);
      }
    );
  }

  // Call the service to list all registers
  listRegister(): void {
    this.registerService.listRegister().subscribe(
      (response) => {
        this.register = response;
      },
      (error) => {
        console.error('Error al listar lso registros:', error);
      }
    );
  }

  goHome() {
    this.router.navigate(['/home']); // Redirige a la ruta '/home'
  }

}
