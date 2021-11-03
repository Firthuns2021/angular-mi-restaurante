import { Component, OnInit } from '@angular/core';
import {RestauranteCategoria} from '../../common/restaurante-categoria';
import {RestauranteService} from '../../services/restaurante.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  // Creamos el array de objetos restaurante categoria
  categoriasRestaurante: RestauranteCategoria[] = [];


  constructor( private  restauranteService: RestauranteService) { }

  ngOnInit(): void {
    this.listCategoriasRestaurante();
  }

  private listCategoriasRestaurante(): void {
    // llamamos a la función del servicio y nos suscribimos
    this.restauranteService.getCategoriasRestaurante().subscribe(
      (resp: any) =>  {
        console.log('sidebar:', resp);
        this.categoriasRestaurante = resp;
      }
    );
  }
}
