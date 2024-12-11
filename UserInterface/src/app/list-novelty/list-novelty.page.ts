import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonGrid, IonRow, IonCardTitle, IonButton, IonIcon, IonCol } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { home, arrowUndo, trash } from 'ionicons/icons';
import { AuthService } from 'Services/AuthService/auth.service';
import { NoveltyService } from 'Services/NoveltyService/novelty.sevice';

@Component({
  selector: 'app-list-novelty',
  templateUrl: './list-novelty.page.html',
  styleUrls: ['./list-novelty.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonGrid, IonRow, IonCardTitle, IonButton, IonCol, IonIcon, CommonModule, FormsModule]
})
export class ListNoveltyPage implements OnInit {
  novelties: any[] = [];

  constructor(private router: Router, private noveltyService: NoveltyService, public authService: AuthService) {
    addIcons({
      'home': home,
      'arrow-undo': arrowUndo,
      'trash': trash
    });
   }

  ngOnInit() {
    this.listNovelty();
  }

  goHome(){
    this.router.navigate(['/parking']);
  }

  deleteNovelty(noveltyId: string): void {
    this.noveltyService.deleteNovelty(noveltyId).subscribe(
      (response) => {
        console.log('Novedad eliminada:', response);
        this.listNovelty();
        alert('Novedad eliminada con éxito');
      },
      (error) => {
        console.error('Error al eliminar la novedad:', error);
        if (error.status === 400) {
          alert('No se puede eliminar la novedad antes de 15 días desde la salida.');
        } else if (error.status === 404) {
          alert('Novedad no encontrada.');
        } else {
          alert('Ocurrió un error al intentar eliminar la novedad.');
        }
      }
    );
  }

  confirmDelete(noveltyId: string): void {
    if (confirm('¿Estás seguro de que deseas eliminar esta novedad?')) {
      this.noveltyService.deleteNovelty(noveltyId).subscribe(
        (response) => {
          console.log(response.message); // Mensaje del backend
          this.novelties = this.novelties.filter(reg => reg.noveltyId !== noveltyId); // Actualizar la lista
          alert('Novedad eliminada con éxito');
        },
        (error) => {
          console.error('Error al eliminar la novedad:', error);
          alert('Ocurrió un error al intentar eliminar la novedda');
        }
      );
    }
  }

  listNovelty(): void {
    this.noveltyService.listNovelty().subscribe(
      (response) => {
        console.log('Novedades:', response);
        this.novelties = response;
      },
      (error) => {
        console.error('Error al listar las novedades:', error);
        alert('Ocurrió un error al intentar listar las novedades');
      }
    );
  }

}
