import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, AlertController } from '@ionic/angular';
import { Router } from '@angular/router'; // Asegúrate de importar Router

declare var google: any;

@Component({
  selector: 'app-localizacion',
  templateUrl: './localizacion.page.html',
  styleUrls: ['./localizacion.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class LocalizacionPage implements OnInit {
  mapa: any;
  markerOrigen: any;
  markerDestino: any;
  puntoreferencia = { lat: -33.56927262660861, lng: -70.55750206116815 };
  directionsService: any;
  directionsRenderer: any;
  search: any;
  numeroPasajeros: number = 1;
  constructor(private router: Router, private alertController: AlertController) { } // Inyectar Router y AlertController

  ngOnInit() {
    this.dibujarMapa();
    this.buscarDireccion();
  }

  dibujarMapa() {
    const mapElement = document.getElementById('map');
    if (mapElement) {
      this.mapa = new google.maps.Map(mapElement, {
        center: this.puntoreferencia,
        zoom: 15
      });

      this.directionsService = new google.maps.DirectionsService();
      this.directionsRenderer = new google.maps.DirectionsRenderer();
      this.directionsRenderer.setMap(this.mapa);

      const trayecto = document.getElementById('trayecto') as HTMLInputElement | null;
      this.directionsRenderer.setPanel(trayecto);

      this.mapa.addListener('click', (event: any) => {
        this.seleccionarPunto(event.latLng);
      });
    }
  }

  seleccionarPunto(latLng: any) {
    if (!this.markerOrigen) {
      this.markerOrigen = new google.maps.Marker({
        position: latLng,
        map: this.mapa,
        label: 'A'
      });
    } else if (!this.markerDestino) {
      this.markerDestino = new google.maps.Marker({
        position: latLng,
        map: this.mapa,
        label: 'B'
      });
      this.calculaRuta();
    } else {
      this.markerOrigen.setMap(null);
      this.markerDestino.setMap(null);
      this.markerOrigen = new google.maps.Marker({
        position: latLng,
        map: this.mapa,
        label: 'A'
      });
      this.markerDestino = null;
      this.directionsRenderer.setDirections({ routes: [] });
    }
  }

  calculaRuta(): Promise<{ costoPorPersona: number, costoTotal: number } | null> {
    return new Promise((resolve) => {
      if (this.markerOrigen && this.markerDestino) {
        const origen = this.markerOrigen.getPosition();
        const destino = this.markerDestino.getPosition();
  
        const request = {
          origin: origen,
          destination: destino,
          travelMode: google.maps.TravelMode.DRIVING
        };
  
        this.directionsService.route(request, (result: any, status: any) => {
          if (status === google.maps.DirectionsStatus.OK) {
            this.directionsRenderer.setDirections(result);
            
            // Obtener la distancia en kilómetros
            const distanciaKm = result.routes[0].legs[0].distance.value / 1000;
            const costoPorPersona = distanciaKm * 300;
            const costoTotal = costoPorPersona * this.numeroPasajeros; // Costo total por todos los pasajeros
            
            // Retornar el resultado como un objeto
            resolve({ costoPorPersona, costoTotal });
          } else {
            alert('Error al calcular la ruta');
            resolve(null); // En caso de error, se resuelve con null
          }
        });
      } else {
        alert('Por favor, selecciona un origen y un destino.');
        resolve(null);
      }
    });
  }
  
  buscarDireccion() {
    const input = document.getElementById('autocomplete') as HTMLInputElement | null;
    if (input) {
      const autocomplete = new google.maps.places.Autocomplete(input);
      this.search = autocomplete;

      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        if (place.geometry && place.geometry.location) {
          this.mapa.setCenter(place.geometry.location);
          this.mapa.setZoom(13);
          if (!this.markerOrigen) {
            this.markerOrigen = new google.maps.Marker({
              position: place.geometry.location,
              map: this.mapa,
              label: 'A'
            });
          } else if (!this.markerDestino) {
            this.markerDestino = new google.maps.Marker({
              position: place.geometry.location,
              map: this.mapa,
              label: 'B'
            });
            this.calculaRuta(); // Cambié a await si se usa en el futuro
          } else {
            this.markerOrigen.setPosition(place.geometry.location);
            this.markerDestino.setMap(null);
            this.markerDestino = null;
            this.directionsRenderer.setDirections({ routes: [] });
          }
        } else {
          alert('No se encontró la ubicación');
        }
      });
    } else {
      alert("Elemento autocomplete no encontrado");
    }
  }

  // Método para confirmar el viaje y mostrar la alerta
  async confirmarViaje() {
    const resultadoRuta = await this.calculaRuta();

    if (resultadoRuta) {
      const costoPorPersona = Math.round(resultadoRuta.costoPorPersona);
      const costoTotal = Math.round(resultadoRuta.costoTotal);

      const alert = await this.alertController.create({
        header: 'Confirmación de Viaje',
        message: `Costo por persona: $${costoPorPersona} CLP<br>Cantidad de pasajeros: ${this.numeroPasajeros}<br>Costo total: $${costoTotal} CLP`,
        buttons: [{
          text: 'Aceptar',
          handler: () => {
            // Redirigir al menú y pasar información del viaje
            this.router.navigate(['/menu'], {
              state: {
                costoPorPersona,
                costoTotal,
                cantidadPasajeros: this.numeroPasajeros
              }
            });
          }
        }]
      });

      await alert.present();
    }
  }



}
