import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonItem, IonLabel, IonInput, IonCardHeader, IonCardTitle, IonIcon,IonTextarea, IonButton, IonBackButton, IonGrid, IonRow, IonCol } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { NoveltyService } from 'services/NoveltyService/novelty.sevice';
import { home, arrowUndo, pencilOutline, pencilSharp } from 'ionicons/icons';
import { addIcons } from 'ionicons';



@Component({
  selector: 'app-novelty',
  templateUrl: './novelty.page.html',
  styleUrls: ['./novelty.page.scss'],
  standalone: true,
  imports: [FormsModule, IonContent, IonHeader, CommonModule, IonButton, IonItem, IonLabel, IonInput, IonTextarea, IonGrid, IonRow, IonIcon, IonCardTitle]

})
export class NoveltyPage implements OnInit {

  novelty = {
    vehiclePlate: [],
    description: '',
    date: ''
  }
  constructor(private noveltyService: NoveltyService, private router: Router) { 
    addIcons({
      'home': home,
      'arrow-undo': arrowUndo,
      'pencil-outline': pencilOutline,
      'pencil-sharp': pencilSharp
    });
  }

  ngOnInit() {
  }

  // Call the service to create a person
  createNovelty() {
    if (this.novelty.vehiclePlate.length && this.novelty.description) {

      const regexValidation = /^[a-záéíóúñA-ZÁÉÍÓÚÑ0-9 ]*$/;
      if (!regexValidation.test(this.novelty.vehiclePlate[0])) {
        alert('No se puede realizar el registro. El campo placa tiene caracteres especiales');
        return;
      }

      if (this.novelty.date){
        this.novelty.date = new Date(this.novelty.date).toISOString();
      } else {
        this.novelty.date = new Date().toISOString();
      }

      this.noveltyService.createNovelty(this.novelty).subscribe(
        (response) => {
          console.log('Novedad creada:', response);
          alert('Novedad creada con éxito');
          this.novelty = { vehiclePlate: [], description: '' , date: new Date().toISOString()};
        },
        (error) => {
          console.error('Error al crear la novedad:', error);
          if (error.status === 400 && error.error.detail) {
            alert(error.error.detail);
          } else {
            alert('Error al crear la novedad');
          }
        }
      );
    } else {
      alert('Por favor, llena todos los campos');
    }
  }

  // Redirige a la ruta '/home'
  goHome() {
    this.router.navigate(['/home']);
  }
}
