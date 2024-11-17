import { Component, ViewChild, ElementRef, OnInit, OnDestroy } from '@angular/core';
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
import { ApiService } from '../../../Services/CameraService/api.service';
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
export class CameraPage implements OnInit, OnDestroy {
  @ViewChild('videoElement', { static: false }) videoElement!: ElementRef;
  @ViewChild('canvasElement', { static: false }) canvasElement!: ElementRef; 
  stream: MediaStream | null = null; 



  constructor(private apiService: ApiService, private registerService: RegisterService) {}

  async ngOnInit() {
    await this.activateCamera(); 
  }

  register ={
    vehicleType: '',
    personCode: 0,
    vehiclePlate: '',
    dateTimeEntrance: '',
    dateTimeExit: ''
  }

  name: string = '';
  lastName: string = '';

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

  async activateCamera() {
    try {
      this.stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }, // Cámara trasera
        audio: false,
      });

      const video = this.videoElement.nativeElement;
      video.srcObject = this.stream;
    } catch (error) {
      console.error('Error activating camera:', error);
    }
  }
  processBackendJson(json:any){
    this.name = json.name;
    this.lastName = json.lastName;
    this.register.personCode = json.code;
  }

  captureAndSendImage() {
    const video = this.videoElement.nativeElement;
    const canvas = this.canvasElement.nativeElement;
    const context = canvas.getContext('2d');

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    const imageBase64 = canvas.toDataURL('image/jpeg');

    this.apiService.processCardImage(imageBase64).subscribe(
      (response) => {
        console.log('Backend response:', response);
        this.processBackendJson(response);
      },
      
      (error) => {
        console.error('Error sending image to backend:', error);
      }
    );
  }

  ngOnDestroy() {
    if (this.stream) {
      this.stream.getTracks().forEach((track) => track.stop());
    }
  }

}