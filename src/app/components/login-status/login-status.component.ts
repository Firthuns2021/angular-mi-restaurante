import { Component, OnInit } from '@angular/core';
// @ts-ignore
import { OktaAuthService } from '@okta/okta-angular';
import {Direccion} from '../../common/direccion';
import {Cliente} from '../../common/cliente';

@Component({
  selector: 'app-login-status',
  templateUrl: './login-status.component.html',
  styleUrls: ['./login-status.component.css']
})
export class LoginStatusComponent implements OnInit {

  isAuthenticated = false;
  userFullName = '';
  storage: Storage = sessionStorage;
  cliente = new Cliente();


  constructor(private oktaAuthService: OktaAuthService) { }

  ngOnInit(): void {
// nos suscribimos para ver si cambia el estado de la autenticación
    this.oktaAuthService.$authenticationState.subscribe(
      (result: any) => {
        this.isAuthenticated = result;
        this.getUserDetails();
      }
    );
  }
  getUserDetails(): void {
    if (this.isAuthenticated) {
// Recogemos los datos del usuario logueado
      this.oktaAuthService.getUser().then(
        (res: any) => {
          console.log(res);
// Asignamos los valores del cliente
          this.userFullName = res.name;
// Rellenamos el cliente con la info de los Claims de Okta
          this.cliente.email = res.email;
          this.cliente.nombre = res.given_name;
          this.cliente.apellidos = res.family_name;
          this.cliente.dni = res.dni;
          this.cliente.telefono = res.telefono;
          // @ts-ignore
          const direccion: Direccion = {
            tipoVia: res.tipoVia,

            calle: res.calle,
            numero: res.numero,
            provincia: res.provincia,
            pais: res.pais,
            cp: res.cp,
            ciudad: res.ciudad
          };
          this.cliente.direccion.push(direccion);

          this.cliente.restaurante = (res.restaurante ===       'restaurante');
          console.log(this.cliente);
// recogemos el email del usuario de la respuesta de la   autenticación
          const theEmail = res.email;
// guardamos el email en el almacenamiento del navegador     (browser storage)
          this.storage.setItem('userEmail', JSON.stringify(theEmail));
        }
      );
    }
  }
  logout(): void {
// Termina la sesión con Okta y borra los tokens actuales
    this.oktaAuthService.signOut();
  }

}
