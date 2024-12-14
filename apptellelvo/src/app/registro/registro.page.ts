import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'; // Importa ReactiveFormsModule aquí
import { AlertController } from '@ionic/angular/standalone';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule] // Agrega ReactiveFormsModule aquí
})
export class RegistroPage {
 
  formularioRegistro: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private router: Router, 
    public alertController: AlertController
  ) {
    this.formularioRegistro = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]], // Máximo de 4 caracteres
      userType: ['', [Validators.required]] // Asegúrate de validar el tipo de usuario
    });
  }

  async guardar() {
    var f = this.formularioRegistro.value;
    // Cambia la función a async
    if (this.formularioRegistro.invalid) {
      const alert = await this.alertController.create({
        header: 'Datos incompletos',
        message: 'Por favor, completa todos los campos correctamente.',
        buttons: ['Aceptar'],
      });

      await alert.present();
      return;
    } 

    var usuario = {
      username: f.username,
      email: f.email,
      password: f.password,
      userType: f.userType // Guardamos el tipo de usuario
    };

    localStorage.setItem('usuario', JSON.stringify(usuario)); // Guardamos el usuario en el localStorage
    const alert = await this.alertController.create({
      message: 'Registro exitoso.',
      buttons: ['Aceptar'],
    });

    await alert.present();
    this.router.navigate(['login']); // Redirige al login
  }

  async onRegister() { // Si deseas usar alertas aquí también debe ser async
    if (this.formularioRegistro.valid) {
      const { username, email, password, userType } = this.formularioRegistro.value;

      console.log('Registro exitoso:', username, email, password, userType);

      const alert = await this.alertController.create({
        message: 'Registro exitoso.',
        buttons: ['Aceptar'],
      });

      await alert.present();
      this.router.navigate(['login']); // Redirige al login
    } else {
      console.log('Formulario inválido');
    }
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
