import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { home, arrowUndo } from 'ionicons/icons';
// import { IonSearchbar } from '@ionic/angular/standalone';
import { RegisterService } from 'services/RegisterService/register.service';

import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonButton,
  IonIcon,
  IonItem,
  IonLabel,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonGrid,
  IonRow,
  IonCol,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonSearchbar
} from '@ionic/angular/standalone';
import { PersonService } from 'services/personService/person.service';
import { style } from '@angular/animations';

@Component({
  selector: 'app-vehicle-exit',
  templateUrl: './vehicle-exit.page.html',
  styleUrls: ['./vehicle-exit.page.scss'],
  standalone: true,
  providers: [DatePipe],
  imports: [IonContent,
    IonHeader,
    IonButton,
    IonIcon,
    IonItem,
    IonLabel,
    IonSelectOption,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonGrid,
    IonRow,
    IonCol,
    IonInput,
    CommonModule,
    FormsModule,
    IonSelect,
    IonSearchbar]
})
export class VehicleExitPage implements OnInit {

  constructor(
    private registerService: RegisterService,
    private personService: PersonService,
    private datePipe: DatePipe,
    private router: Router) {
    addIcons({
      'home': home,
      'arrow-undo': arrowUndo
    });
  }

  register = {
    vehicleType: '',
    personCode: 0,
    vehiclePlate: '',
    dateTimeEntrance: '',
    dateTimeExit: '',
    personName: '',
    personCharge: ''
  };

  vehicles: String[] = []; // Lista de vehículos para el select
  selectedPlate: string = ''; // Placa seleccionada

  customAlertOptions = {
    header: 'Vehículos en parqueadero',
    // subHeader: 'Selecciona una placa',
    cssClass: 'custom-alert',
    interface: 'action-sheet',
    translucent: true
  };

  ngOnInit(): void {
    console.log('Iniciando componente...')
    this.loadVehicles();
  }


  // Cargar los vehículos desde la base de datos
  loadVehicles(): void {
    console.log('Cargando vehículos')
    this.registerService.getRegistersWithoutExit()
      .subscribe({
        next: (response) => {
          console.log('Respuesta del servidor')
          if (Array.isArray(response)) {
            this.vehicles = response;
            console.log('Vehículos cargados')
          } else {
            console.error('La respuesta no es un array:', response);
          }
        },
        error: (error) => {
          console.error('Error al cargar los vehículos:', error);
        }
      });
  }

  // Cuando se selecciona una placa, cargar los datos correspondientes
  onPlateChange(): void {
    if (!this.selectedPlate) return;

    this.registerService.getRegisterByPlateAndDateTimeExit(this.selectedPlate)  // Cambiar a getRegisterByPlate
      .subscribe({
        next: (register) => {
          if (register) {
            // Actualizar datos del registro
            this.register.vehiclePlate = register.vehiclePlate;
            this.register.dateTimeEntrance = this.datePipe.transform(register.dateTimeEntrance, 'yyyy-MM-dd HH:mm') || '';
            this.register.personCode = register.personCode;

            // Obtener datos de la persona usando el personCode
            this.personService.getPersonByCode(register.personCode)
              .subscribe({
                next: (personData) => {
                  this.register.personName = personData.name;
                  this.register.personCharge = personData.charge;
                },
                error: (error) => {
                  console.error('Error al obtener datos de la persona:', error);
                }
              });
          }
        },
        error: (error) => {
          console.error('Error al obtener registro por placa:', error);
        }
      });
  }
  // Método para actualizar el registro (solo hora de salida)
  // En vehicle-exit.page.ts
  updateRegister(): void {
    if (!this.selectedPlate) return;

    const updateData = {
      dateTimeExit: new Date().toISOString()
    };

    this.registerService.updateRegister(this.selectedPlate, updateData)
      .subscribe({
        next: (response) => {
          console.log('Registro actualizado:', response);
          alert('Salida registrada exitosamente');
          this.loadVehicles(); // Recargar la lista de vehículos
          this.selectedPlate = ''; // Limpiar la selección
          this.register = { // Limpiar el formulario
            vehicleType: '',
            personCode: 0,
            vehiclePlate: '',
            dateTimeEntrance: '',
            dateTimeExit: '',
            personName: '',
            personCharge: ''
          };
        },
        error: (error) => {
          console.error('Error al actualizar el registro:', error);
          alert('Error al registrar la salida');
        }
      });
  }

  goHome() {
    this.router.navigate(['/home']);
  }

}