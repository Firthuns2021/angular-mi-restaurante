import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RestauranteListComponent} from './components/restaurante-list/restaurante-list.component';
import {RestauranteDetalleComponent} from './components/restaurante-detalle/restaurante-detalle.component';

const routes: Routes = [
  { path: 'restaurante/:id',  component: RestauranteDetalleComponent },
  { path: 'search/:keyword',  component: RestauranteListComponent },
  { path: '', pathMatch: 'full', component: RestauranteListComponent },
  { path: 'restaurantes',  redirectTo: '' },
  { path: 'categoria/:id',  component: RestauranteListComponent },
  { path: '**',   redirectTo: '/restaurantes', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
