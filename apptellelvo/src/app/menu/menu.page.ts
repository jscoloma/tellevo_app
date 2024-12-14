import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { home, informationCircleOutline, helpCircleSharp, gitNetworkOutline,logOutOutline } from 'ionicons/icons';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
  standalone: true,
  imports: [IonicModule, RouterModule]
})
export class MenuPage {
  usuario: any;

  constructor(private router: Router) {
    addIcons({ home, 'information-circle-outline': informationCircleOutline, 'help-circle-sharp': helpCircleSharp, 'log-out-outline': logOutOutline});
  }

  ngOnInit() {
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras.state) {
      this.usuario = navigation.extras.state['nombre'];
      alert(this.usuario);
    } else {
      alert('No se pudo obtener el state de navigation');
    }
  }

  public realizarAccion(): void {
    // Implementa la lógica que deseas ejecutar al hacer clic en el botón
    console.log("Acción realizada"); // Cambia esto según tus necesidades
    // Aquí puedes redirigir a otra página o realizar alguna acción específica
  }
}


