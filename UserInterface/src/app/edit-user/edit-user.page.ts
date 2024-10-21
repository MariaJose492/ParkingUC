import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonButton, IonItem, IonLabel, IonCard } from '@ionic/angular/standalone';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.page.html',
  styleUrls: ['./edit-user.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonButton, IonItem, IonLabel, CommonModule, FormsModule, IonCard]
})
export class EditUserPage implements OnInit {
  user: any = {
    name: '',
    email: '',
    phone: ''
  };

  constructor() { }

  ngOnInit() {
    //
  }

  
  saveChanges() {
    console.log('Datos del usuario actualizados:', this.user);
  }

  onSubmit() {
    this.saveChanges();
  }
}
