import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RestauranteListComponent } from './components/restaurante-list/restaurante-list.component';
import {HttpClientModule} from '@angular/common/http';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { SearchComponent } from './components/search/search.component';
import { RestauranteDetalleComponent } from './components/restaurante-detalle/restaurante-detalle.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {ReactiveFormsModule} from '@angular/forms';
import { CartStatusComponent } from './components/cart-status/cart-status.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { LoginComponent } from './components/login/login.component';
import { LoginStatusComponent } from './components/login-status/login-status.component';


import {
  OKTA_CONFIG,
  OktaAuthModule
} from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';
import myAppConfig from './config/my-app-config';
import {Router} from '@angular/router';
const oktaConfig = Object.assign({
  onAuthRequired: (oktaAuth: any, injector: any) => {
    const router = injector.get(Router);
// redirigimos al usuario a la página de login
    router.navigate(['/login']);
  }
}, myAppConfig.oidc);

@NgModule({
  declarations: [
    AppComponent,
    RestauranteListComponent,
    SidebarComponent,
    NavigationComponent,
    SearchComponent,
    RestauranteDetalleComponent,
    CartStatusComponent,
    CheckoutComponent,
    LoginComponent,
    LoginStatusComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    OktaAuthModule
  ],
  providers: [
    { provide: OKTA_CONFIG, useValue: oktaConfig},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
