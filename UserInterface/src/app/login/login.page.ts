import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { home, arrowUndo, pencilOutline, pencilSharp, person, lockClosed} from 'ionicons/icons';
import { addIcons } from 'ionicons';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonCardTitle, 
  IonButton,
  IonIcon,
  IonItem,
  IonLabel,
  IonInput,
} from '@ionic/angular/standalone';
import { LoginService } from 'Services/LoginService/login.service';

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
    IonTitle,
    FormsModule,
  ]
})
export class LoginPage {
  email: string = '';
  password: string = '';

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

  onLogin() {
    console.log("Enviando datos de login:", { email: this.email, password: this.password });
    if (this.email === 'admin' && this.password === 'admin') {
      this.showAlert('Login Successful', 'Welcome!');
    } else {
      this.showAlert('Login Failed', 'Invalid email or password.');
    }

    this.loginService.login(this.email, this.password).subscribe(
      (response) => {
        console.log('Respuesta del backend:', response);
        if (response.token) {
          localStorage.setItem('token', response.token); 
          alert('Inicio de sesión exitoso');
          this.router.navigate(['/home']); 
        } else {
          alert('Usuario o contraseña incorrectos');
        }
      },
      (error) => {
        console.error('Error durante el inicio de sesión:', error);
        alert('Credenciales incorrectas o error en el servidor');
      }
    );
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
    this.router.navigate(['/home']);
  }
}
