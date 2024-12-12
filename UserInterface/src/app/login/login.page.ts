import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { home, arrowUndo, pencilOutline, pencilSharp, person, lockClosed} from 'ionicons/icons';
import { addIcons } from 'ionicons';
import {
  IonContent,
  IonHeader,
  IonCardTitle, 
  IonButton,
  IonIcon,
  IonItem,
  IonLabel,
  IonInput,
} from '@ionic/angular/standalone';
import { LoginService } from 'Services/LoginService/login.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonButton,
    IonIcon,
    IonItem,
    IonLabel,
    IonInput,
    IonCardTitle, 
    FormsModule,
  ]
})
export class LoginPage {
  email: string = '';
  password: string = '';
  charge: string = '';

  constructor(private loginService: LoginService, private router: Router, private alertController: AlertController) { 
    addIcons({
      'home': home,
      'arrow-undo': arrowUndo,
      'pencil-outline': pencilOutline,
      'pencil-sharp': pencilSharp,
      'person': person,
      'lock-closed': lockClosed
    });
  }

  async onLogin() {
    try {
        const response = await this.loginService.login(this.email, this.password, this.charge).toPromise();

        if (response.message === "Inicio de sesión exitoso") {  
            localStorage.setItem('userCharge', response.user.charge);
            console.log("prueba 1", response.user.charge);
            // localStorage.setItem('token', response.user.token || ""); 
            await this.showAlert('Bienvenido', '¡Inicio de sesión exitoso!');
            this.router.navigate(['/menu']);
        } else {
            await this.showAlert('Error', 'Usuario o contraseña incorrectos');
        }
    } catch (error) {
        const err = error as HttpErrorResponse;
        console.error('Error durante el inicio de sesión:', err);

        if (err.status === 404) {
            await this.showAlert('Error', 'Usuario no encontrado');
        } else if (err.status === 401) {
            await this.showAlert('Error', 'Contraseña incorrecta');
        } else {
            await this.showAlert('Error', 'Error desconocido, por favor intenta nuevamente');
        }
    }
}

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  goHome() {
    this.router.navigate(['/parking']);
  }
}
