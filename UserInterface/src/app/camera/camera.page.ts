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
import { ApiService } from '../services/api.service';

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
  @ViewChild('videoElement', { static: false }) videoElement!: ElementRef; // Referencia al <video>
  @ViewChild('canvasElement', { static: false }) canvasElement!: ElementRef; // Referencia al <canvas>
  stream: MediaStream | null = null; // Flujo de la cámara
  captureInterval: any; // Intervalo para capturar fotogramas

  constructor(private apiService: ApiService) {}

  async ngOnInit() {
    await this.activateCamera(); // Activar la cámara automáticamente
    this.startFrameCapture(); // Iniciar la captura de fotogramas
  }

  async activateCamera() {
    try {
      // Solicitar permisos para usar la cámara
      this.stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }, // Cámara trasera
        audio: false,
      });

      // Asignar el flujo de video al elemento <video>
      const video = this.videoElement.nativeElement;
      video.srcObject = this.stream;
    } catch (error) {
      console.error('Error activating camera:', error);
    }
  }

  startFrameCapture() {
    const video = this.videoElement.nativeElement;
    const canvas = this.canvasElement.nativeElement;
    const context = canvas.getContext('2d');

    this.captureInterval = setInterval(() => {
      // Configurar tamaño del canvas para coincidir con el video
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      // Dibujar el fotograma actual del video en el canvas
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Convertir el fotograma en una imagen en base64
      const frame = canvas.toDataURL('image/jpeg');

      // Enviar el fotograma al backend para procesar
      this.sendFrameToBackend(frame);
    }, 1000); // Captura un fotograma cada segundo
  }

  sendFrameToBackend(frame: string) {
    this.apiService.sendImage(frame).subscribe(
      (response) => {
        console.log('Backend response:', response);
        // Aquí puedes actualizar la UI según los datos recibidos del backend
      },
      (error) => {
        console.error('Error sending frame to backend:', error);
      }
    );
  }

  ngOnDestroy() {
    // Detener la cámara y la captura de fotogramas
    if (this.stream) {
      this.stream.getTracks().forEach((track) => track.stop());
    }
    if (this.captureInterval) {
      clearInterval(this.captureInterval);
    }
  }
}