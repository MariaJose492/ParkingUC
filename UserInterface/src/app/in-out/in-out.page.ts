import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonCardTitle, IonIcon, IonButton } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { home, arrowUndo, pencilOutline, pencilSharp } from 'ionicons/icons';
import { addIcons } from 'ionicons';

@Component({
  selector: 'app-in-out',
  templateUrl: './in-out.page.html',
  styleUrls: ['./in-out.page.scss'],
  standalone: true,
  imports: [FormsModule, IonContent, IonHeader, CommonModule, IonButton, IonIcon, IonCardTitle]

})
export class InOutPage implements OnInit {

  constructor(private router: Router) {
    addIcons({
      'home': home,
      'arrow-undo': arrowUndo,
      'pencil-outline': pencilOutline,
      'pencil-sharp': pencilSharp
    });
   }

  ngOnInit() {
  }

  // Redirige a la ruta '/home'
  goHome() {
    this.router.navigate(['/parking']);
  }

  goMenu(){
    this.router.navigate(['/menu'])
  }

  goToEntrada() {
    this.router.navigate(['/camera']);  // Redirige a la página de entrada
  }

  goToSalida() {
    this.router.navigate(['/vehicle-exit']);  // Redirige a la página de salida
  }

}
