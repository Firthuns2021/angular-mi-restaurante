import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RestauranteListComponent} from './components/restaurante-list/restaurante-list.component';
import {RestauranteDetalleComponent} from './components/restaurante-detalle/restaurante-detalle.component';
import {CheckoutComponent} from './components/checkout/checkout.component';
import {OktaAuthGuard, OktaCallbackComponent} from '@okta/okta-angular';
import {LoginComponent} from './components/login/login.component';

const routes: Routes = [
  {path: 'login/callback', component: OktaCallbackComponent},
  {path: 'login', component: LoginComponent},
  {path: 'checkout', component: CheckoutComponent, canActivate: [   OktaAuthGuard ]},
  {path: 'restaurantes/:id', component: RestauranteDetalleComponent, canActivate: [ OktaAuthGuard ]},
  {path: 'search/:keyword', component: RestauranteListComponent,  canActivate: [ OktaAuthGuard ]},
  {path: '', pathMatch: 'full', component: RestauranteListComponent, canActivate: [ OktaAuthGuard ]},
  {path: 'restaurantes', redirectTo: ''},
  {path: 'categoria/:id', component: RestauranteListComponent,  canActivate: [ OktaAuthGuard ]},


  { path: 'restaurantes',  redirectTo: '' },
  { path: 'categoria/:id',  component: RestauranteListComponent },
  {path: 'checkout', component: CheckoutComponent},
  { path: '', pathMatch: 'full', component: RestauranteListComponent },
  {path: '**', redirectTo: '', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
