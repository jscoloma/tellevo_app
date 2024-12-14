import { Injectable } from '@angular/core';




@Injectable({
  providedIn: 'root'
})  
export class UserService {

  constructor() { }

  // Método para validar ingreso de usuario desde un servicio
  validaServicio(usuario: string, clave: number): string | null {
    if (usuario === 'admin' && clave === 1234) {
      return 'admin';
    } else if (usuario === 'pasajero' && clave === 5678) {
      return 'pasajero';
    } else {
      return null;
    }
  }
  
}

