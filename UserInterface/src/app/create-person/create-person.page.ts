import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonHeader, IonItem, IonCardTitle, IonLabel, IonInput, IonIcon, IonButton, IonBackButton, IonSelect, IonSelectOption, IonGrid, IonRow, IonCol } from '@ionic/angular/standalone';
import { PersonService } from 'Services/PersonService/person.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { home, arrowUndo } from 'ionicons/icons';
import { HostListener } from '@angular/core';



@Component({
  selector: 'app-create-person',
  templateUrl: './create-person.page.html',
  styleUrls: ['./create-person.page.scss'],
  standalone: true,
  imports: [FormsModule, IonContent, IonHeader, CommonModule, IonButton, IonSelect, IonSelectOption, IonItem, IonCardTitle, IonLabel, IonInput, IonCol, IonGrid, IonRow, IonIcon]
})
export class CreatePersonPage implements OnInit {

  person: {
    name: string;
    lastName: string;
    code: number;
    phone: string;
    charge: string;
    email: string | null;
    password: string | null;
    confirmPassword: string | null;
  } = {
      name: '',
      lastName: '',
      code: 0,
      phone: '',
      charge: '',
      email: '',
      password: '',
      confirmPassword: ''
    };

  constructor(private personService: PersonService, private router: Router) {
    addIcons({
      'home': home,
      'arrow-undo': arrowUndo
    });
  }
  // Variable to know if we are on a small screen
  isSmallScreen: boolean = false;

  // Method for detecting changes in screen size
  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.isSmallScreen = window.innerWidth <= 400;
  }

  ngOnInit() {
    this.isSmallScreen = window.innerWidth <= 400;
  }

  // Call the service to create a person
  createPerson() {
    console.log('Datos de persona antes de validar:', this.person);

    if (this.person.charge === 'Vigilante') {
      if (!this.person.email || !this.person.password || !this.person.confirmPassword) {
        alert('El correo, la contraseña y la confirmación de contraseña son obligatorios para Vigilantes.');
        return;
      }
    } else if (this.person.charge === 'Estudiante' || this.person.charge === 'Administrativo') {
      if (!this.person.name || !this.person.lastName) {
        alert('El nombre y el apellido son obligatorios para Estudiantes o Administrativos.');
        return;
      }
      this.person.email = null;
      this.person.password = null;
      this.person.confirmPassword = null;
    }

    if (this.person.password && this.person.password !== this.person.confirmPassword) {
      alert('Las contraseñas no coinciden.');
      return;
    }
    const regexValidation = /^[a-záéíóúñA-ZÁÉÍÓÚÑ0-9 ]*$/;
    if (this.person.name && !regexValidation.test(this.person.name)) {
      alert('No se puede realizar el registro. El campo nombre tiene caracteres especiales');
      return;
    }

    if (this.person.lastName && !regexValidation.test(this.person.lastName)) {
      alert('No se puede realizar el registro. El campo apellido tiene caracteres especiales');
      return;
    }

    if (this.person.phone && !regexValidation.test(this.person.phone)) {
      alert('No se puede realizar el registro. El campo teléfono tiene caracteres especiales');
      return;
    }

    if (this.person.charge && !regexValidation.test(this.person.charge)) {
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

    console.log('Datos procesados para envío:', this.person);

    // Enviar los datos al servicio
    this.personService.createPerson(this.person).subscribe(
      (response) => {
        console.log('Persona creada:', response);
        alert('Persona creada con éxito');
        // Reiniciar el formulario
        this.person = { name: '', lastName: '', code: 0, phone: '', charge: '', email: '', password: '', confirmPassword: '' };
      },
      (error) => {
        console.error('Error al crear persona:', error);
        if (error.status === 400 || error.status === 422) {
          alert('Error en los datos enviados: ' + (error.error.detail || 'Detalles no disponibles.'));
        } else {
          alert('Error al crear la persona');
        }
      }
    );
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
