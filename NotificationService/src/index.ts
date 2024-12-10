// index.ts
import { startNotificationService } from '../src/Services/notificationService';
import './src/Routes/notificationRoutes';

// Iniciar el microservicio de notificaciones
startNotificationService().then(() => {
    console.log('Microservicio de notificaciones en ejecución...');
});
