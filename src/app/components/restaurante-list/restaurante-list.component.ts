import { Component, OnInit } from '@angular/core';
import {RestauranteService} from '../../services/restaurante.service';
import {Restaurante} from '../../common/restaurante';

@Component({
  selector: 'app-restaurante-list',
  templateUrl: './restaurante-list.component.html',
  styleUrls: ['./restaurante-list.component.css']
})
export class RestauranteListComponent implements OnInit {

  /*** creamos el array de restaurantes donde guardaremos los datos de la API REST */
  restaurantes: Restaurante[] = [];

  constructor(private restauranteService: RestauranteService) { }

  ngOnInit(): void {
    this.listRestaurantes();
  }

  listRestaurantes(): void {
    this.restauranteService.getRestauranteList().subscribe( (data: any) => {
      console.log( data );
      this.restaurantes = data;
    });
  }
}
