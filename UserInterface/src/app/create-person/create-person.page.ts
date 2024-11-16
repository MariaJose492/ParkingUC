import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonButton, IonItem, IonLabel, IonInput } from '@ionic/angular/standalone';
import { PersonService } from 'Services/PersonService/person.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-create-person',
  templateUrl: './create-person.page.html',
  styleUrls: ['./create-person.page.scss'],
  standalone: true,
  imports: [FormsModule,IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, IonButton, IonItem, IonLabel, IonInput]
})
export class CreatePersonPage implements OnInit {

  person = {
    name: '',
    lastName: '',
    code: 0,
    phone: '',
    charge: '',
    email: ''
  };

  constructor(private personService: PersonService) { }

  ngOnInit() {
    /*  */
  }

  // Call the service to create a person
  createPerson() {
    if (this.person.name && this.person.lastName && this.person.code && this.person.phone && this.person.charge) {
      this.personService.createPerson(this.person).subscribe(
        (response) => {
          console.log('Persona creada:', response);
          alert('Persona creada con éxito');
          this.person = { name: '', lastName: '', code: 0, phone: '', charge: '', email: '' };
        },
        (error) => {
          console.error('Error al crear persona:', error);
          alert('Error al crear la persona');
        }
      );
    } else {
      alert('Por favor, llena todos los campos');
    }
  }
  // Call the service to update a person
  updatePerson(personId: string): void {
    const updateData = {
      phone: '',
      email: '',
    };

    this.personService.updatePerson(personId, updateData).subscribe(
      (response) => {
        console.log('Persona actualizada:', response);
      },
      (error) => {
        console.error('Error al actualizar persona:', error);
      }
    );
  }

  // Call the service to delete a person
  deletePerson(personId: string): void {
    this.personService.deletePerson(personId).subscribe(
      (response) => {
        console.log('Persona eliminada:', response);
      },
      (error) => {
        console.error('Error al eliminar persona:', error);
      }
    );
  }

  // Call the service to list all persons
  listPerson(): void {
    this.personService.listPerson().subscribe(
      (response) => {
        this.person = response;
      },
      (error) => {
        console.error('Error al listar personas:', error);
      }
    );
  }
}
