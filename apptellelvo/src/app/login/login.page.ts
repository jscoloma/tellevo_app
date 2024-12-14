import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AlertController } from '@ionic/angular/standalone';
import { ReactiveFormsModule } from '@angular/forms';
import { NavController } from '@ionic/angular'; // Importa NavController

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule],
})
export class LoginPage implements OnInit {
  formularioLogin: FormGroup;

  constructor(
    private fb: FormBuilder,
    private alertController: AlertController,
    private navController: NavController // Inyecta NavController
  ) {
    // Definición del formulario con validadores
    this.formularioLogin = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(4), // Contraseñas de exactamente 4 caracteres
        ],
      ],
    });
  }

  ngOnInit(): void {
    // Inicialización si es necesario
  }

  // Método para manejar el inicio de sesión
  async ingresar() {
    const f = this.formularioLogin.value;
    console.log("Formulario enviado:", f);
  
    // Obtén el usuario almacenado en localStorage
    const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
    console.log("Usuario desde localStorage:", usuario);
  
    // Verifica si los datos coinciden
    if (usuario.username === f.username && usuario.password === f.password) {
      console.log('Ingreso exitoso');
      const alert = await this.alertController.create({
        header: 'Bienvenido',
        message: 'Has ingresado correctamente.',
        buttons: ['Aceptar'],
      });
      await alert.present();

      // Verifica el tipo de usuario y redirige a la página correspondiente
      if (usuario.userType === 'conductor') {
        this.navController.navigateRoot('/menu');  // Redirige al menú para conductor
      } else if (usuario.userType === 'pasajero') {
        this.navController.navigateRoot('/pasajero'); // Redirige a la página del pasajero
      }
    } else {
      const alert = await this.alertController.create({
        header: 'Datos incorrectos',
        message: 'Los datos que ingresaste no son correctos.',
        buttons: ['Aceptar'],
      });
      await alert.present();
    }
  }
  
  // Método para navegar a la página de registro
  goToRegister() {
    // Usamos el NavController para navegar a la página de registro
    this.navController.navigateForward('/registro');  // Ajusta la ruta según sea necesario
  }
}
