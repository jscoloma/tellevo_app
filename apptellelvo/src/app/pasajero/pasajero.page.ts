import { Component } from '@angular/core';
import { IonicModule, AlertController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { home, informationCircleOutline, helpCircleSharp, logOutOutline } from 'ionicons/icons';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pasajero',
  templateUrl: './pasajero.page.html',
  styleUrls: ['./pasajero.page.scss'],
  standalone: true,
  imports: [IonicModule, RouterModule, FormsModule]
})
export class PasajeroPage {
  usuario: any;
  selectedComuna: string | undefined;
  numPasajeros: number | undefined;

  constructor(private router: Router, private alertController: AlertController) {
    addIcons({ home, 'information-circle-outline': informationCircleOutline, 'help-circle-sharp': helpCircleSharp, 'log-out-outline': logOutOutline });
    this.initializeUsuario();
  }

  private initializeUsuario(): void {
    this.usuario = {}; // Inicializa con valores predeterminados
  }

  async realizarAccion(): Promise<void> {
    if (this.selectedComuna && this.numPasajeros) {
      const alert = await this.alertController.create({
        header: 'Confirmación',
        message: `Destino: ${this.selectedComuna}Número de pasajeros: ${this.numPasajeros}`,
        buttons: ['OK']
      });
      await alert.present();
    } else {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Por favor, selecciona una comuna y el número de pasajeros.',
        buttons: ['OK']
      });
      await alert.present();
    }
  }
}
