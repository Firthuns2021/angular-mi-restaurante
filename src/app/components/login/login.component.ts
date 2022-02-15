import { Component, OnInit } from '@angular/core';


import myAppConfig from '../../config/my-app-config';
import * as OktaSignIn from '@okta/okta-signin-widget';
// @ts-ignore
import {OktaAuthService} from '@okta/okta-angular';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  oktaSignin: any;
  constructor(private oktaAuthService: OktaAuthService) {
    this.oktaSignin = new OktaSignIn({
      logo: 'assets/images/chibi.jpg',
      features: {
        registration: true
      },
      baseUrl: myAppConfig.oidc.issuer.split('/oauth2')[0],
      clientId: myAppConfig.oidc.clientId,
      redirectUri: myAppConfig.oidc.redirectUri,
      authParams: {
        pkce: true, // Proof Key for Code Exchange --> para utilizar

        // secretos dinámicos para pasar la información
        issuer: myAppConfig.oidc.issuer,
        scopes: myAppConfig.oidc.scopes
      }
    });
  }
  ngOnInit(): void {
    this.oktaSignin.remove();
    this.oktaSignin.renderEl({

        el: '#okta-sign-in-widget', // Mismo nombre que el del id del div de login.component.html
      },
      (response: any) => {
        if (response.status === 'SUCCESS') {
          this.oktaAuthService.signInWithRedirect();
        }
      },
      (error: any) => {
        throw error;
      });
  }
}
