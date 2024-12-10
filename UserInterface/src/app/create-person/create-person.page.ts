import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonHeader, IonItem, IonLabel, IonInput, IonIcon, IonButton, IonBackButton, IonGrid, IonRow, IonCol } from '@ionic/angular/standalone';
import { PersonService } from 'Services/PersonService/person.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';



@Component({
  selector: 'app-create-person',
  templateUrl: './create-person.page.html',
  styleUrls: ['./create-person.page.scss'],
  standalone: true,
  imports: [FormsModule, IonContent, IonHeader, CommonModule, IonButton, IonItem, IonLabel, IonInput, IonCol, IonGrid, IonRow, IonIcon]
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

  constructor(private personService: PersonService, private router: Router) { }

  ngOnInit() {
    /*  */
  }

  // Call the service to create a person
  createPerson() {
    if (this.person.name && this.person.lastName && this.person.code && this.person.phone && this.person.charge) {

      const regexValidation = /^[a-záéíóúñA-ZÁÉÍÓÚÑ0-9 ]*$/;
      if (!regexValidation.test(this.person.name)) {
        alert('No se puede realizar el registro. El campo nombre tiene caracteres especiales');
        return;
      }

      if (!regexValidation.test(this.person.lastName)) {
        alert('No se puede realizar el registro. El campo apellido tiene caracteres especiales');
        return;
      }

      if (!regexValidation.test(this.person.phone)) {
        alert('No se puede realizar el registro. El campo apellido tiene caracteres especiales');
        return;
      }

      if (!regexValidation.test(this.person.charge)) {
        alert('No se puede realizar el registro. El campo cargo tiene caracteres especiales');
        return;
      }

      if (this.person.email) {  
        const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
        if (!emailRegex.test(this.person.email)) {
          alert('El email tiene un formato incorrecto');
          return;
        }
      }

      this.personService.createPerson(this.person).subscribe(
        (response) => {
          console.log('Persona creada:', response);
          alert('Persona creada con éxito');
          this.person = { name: '', lastName: '', code: 0, phone: '', charge: '', email: '' };
        },
        (error) => {
          console.error('Error al crear persona:', error);
          if (error.status === 400 && error.error.detail) {
            alert(error.error.detail);
          } else {
            alert('Error al crear la persona');
          }
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

  // Redirige a la ruta '/home'
  goHome() {
    this.router.navigate(['/home']);
  }
}
