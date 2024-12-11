import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonGrid, IonRow, IonCardTitle, IonButton, IonIcon, IonCol } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { home, arrowUndo, trash, createOutline } from 'ionicons/icons';
import { AuthService } from 'Services/AuthService/auth.service';
import { PersonService } from 'Services/PersonService/person.service';

@Component({
  selector: 'app-list-person',
  templateUrl: './list-person.page.html',
  styleUrls: ['./list-person.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonGrid, IonRow, IonCardTitle, IonButton, IonCol, IonIcon, CommonModule, FormsModule]
})
export class ListPersonPage implements OnInit {

  persons: any[] = [];
  // editingPersonId: string | null = null; // En lugar de editingPerson
  // editingData: any = null; // Para almacenar

  constructor(private router: Router, private personService: PersonService, public authService: AuthService) {
    addIcons({
      'home': home,
      'arrow-undo': arrowUndo,
      'trash': trash,
      'create-outline': createOutline
    });
  }

  showEditButtons(): boolean {
    return this.authService.canEditPerson();
  }
  ngOnInit() {
    this.listPerson();
  }

  goHome() {
    this.router.navigate(['/parking']);
  }

  deletePerson(personId: string): void {
    this.personService.deletePerson(personId).subscribe(
      (response) => {
        console.log('Persona eliminada:', response);
        this.listPerson();
        alert('Persona eliminada con éxito');
      },
      (error) => {
        console.error('Error al eliminar la persona:', error);
        if (error.status === 400) {
          alert('No se puede eliminar la persona antes de 15 días desde la salida.');
        } else if (error.status === 404) {
          alert('Persona no encontrada.');
        } else {
          alert('Ocurrió un error al intentar eliminar la persona.');
        }
      }
    );
  }

  confirmDelete(personId: string): void {
    if (confirm('¿Estás seguro de que deseas eliminar este registro?')) {
      this.personService.deletePerson(personId).subscribe(
        (response) => {
          console.log(response.message); // Mensaje del backend
          this.persons = this.persons.filter(reg => reg.personId !== personId); // Actualizar la lista
          alert('Persona eliminada con éxito');
        },
        (error) => {
          console.error('Error al eliminar la persona:', error);
          alert('Ocurrió un error al intentar eliminar la persona');
        }
      );
    }
  }

  listPerson(): void {
    this.personService.listPerson().subscribe(
      (response) => {
        console.log('Personas:', response);
        this.persons = response;
      },
      (error) => {
        console.error('Error al listar las personas:', error);
        alert('Ocurrió un error al intentar listar las personas');
      }
    );
  }


}
