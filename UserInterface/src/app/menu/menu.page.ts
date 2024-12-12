import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonCardTitle, IonCardContent, IonCard, IonButton, IonIcon  } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { home, arrowUndo } from 'ionicons/icons';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, CommonModule, FormsModule, IonCardTitle, IonCardContent, IonCard, IonButton, IonIcon]
})
export class MenuPage implements OnInit {

  constructor(private router: Router) {
    addIcons({
      'home': home,
      'arrow-undo': arrowUndo
    });
   }

  ngOnInit() {

  }

  navigateTo(route: string) {
    this.router.navigate([`/${route}`]);
  }

  goHome(){
    this.router.navigate(['/parking'])
  }

  goMenu(){
    this.router.navigate(['/menu'])
  }

}
