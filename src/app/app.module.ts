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



@NgModule({
  declarations: [
    AppComponent,
    RestauranteListComponent,
    SidebarComponent,
    NavigationComponent,
    SearchComponent,
    RestauranteDetalleComponent,
    CartStatusComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,

    NgbModule,
    ReactiveFormsModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
