import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/angular/standalone';
import { RegisterService } from 'Services/RegisterService/register.service';
import { home, arrowUndo, pencilOutline, pencilSharp } from 'ionicons/icons';
import { addIcons } from 'ionicons';

@Component({
  selector: 'app-parking',
  templateUrl: './parking.page.html',
  styleUrls: ['./parking.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonCard, IonCardContent, IonCardHeader, IonCardTitle]
})
export class ParkingPage implements OnInit {

  parkingSpaces: any = {
    carSpaces: 0,
    motoSpaces: 0
  };

  constructor(private parkingService: RegisterService) { }

  ngOnInit() {
    this.loadParkingSpaces();
    addIcons({
      'home': home,
      'arrow-undo': arrowUndo,
      'pencil-outline': pencilOutline,
      'pencil-sharp': pencilSharp
    });
  }

  loadParkingSpaces() {
    this.parkingService.getParkingSpaces().subscribe(
      (data) => {
        this.parkingSpaces = data;  
      },
      (error) => {
        console.error('Error al cargar los espacios de parqueadero', error);
      }
    );
  }

}