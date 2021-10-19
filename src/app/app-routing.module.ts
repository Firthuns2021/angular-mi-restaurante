import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RestauranteListComponent} from './components/restaurante-list/restaurante-list.component';

const routes: Routes = [
  // { path: '', component: RestauranteListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
