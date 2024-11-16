import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
import { RegisterService } from 'Services/RegisterService/register.service';

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

  constructor(private registerService: RegisterService) { }

  ngOnInit() {
    //
  }

  register ={
    vehicleType: '',
    personCode: 0,
    vehiclePlate: '',
    dateTimeEntrance: '',
    dateTimeExit: ''
  }

  // Call the service to create a register
  createRegister() {
    if (this.register.vehicleType && this.register.personCode && this.register.vehiclePlate && this.register.dateTimeEntrance ) {
      
      console.log('Datos que se enviarán al backend:', this.register);
      
      this.registerService.createRegister(this.register).subscribe(
        (response) => {
          console.log('Registro creado:', response);
          alert('Registro creado con éxito');
          this.register = { vehicleType: '', personCode: 0, vehiclePlate: '', dateTimeEntrance: '', dateTimeExit: '' };
        },
        (error) => {
          console.error('Error al crear el registro:', error);
          alert('Error al crear el registro');
        }
      );
    } else {
      alert('Por favor, llena todos los campos');
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

}
