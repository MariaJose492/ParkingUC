import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonButton, IonItem, IonLabel, IonInput} from '@ionic/angular/standalone';


@Component({
  selector: 'app-create-person',
  templateUrl: './create-person.page.html',
  styleUrls: ['./create-person.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule,IonButtons, IonButton, IonItem, IonLabel, IonInput]
})
export class CreatePersonPage implements OnInit {

  constructor() { }

  ngOnInit() {
    /*  */
  }

}
