import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonIcon } from '@ionic/angular/standalone';
import { LoginService } from 'Services/LoginService/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.page.html',
  styleUrls: ['./home-page.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonIcon, CommonModule, FormsModule]
})
export class HomePagePage implements OnInit {

  constructor(private loginService: LoginService, private router: Router) {}

  onLogout() {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }

  ngOnInit(): void {
    
  }
}
