import { Component, OnInit } from '@angular/core';
import {RestauranteCategoria} from '../../common/restaurante-categoria';
import {RestauranteService} from '../../services/restaurante.service';
import {Restaurante} from '../../common/restaurante';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  // Creamos el array de objetos restaurante categoria
  categoriasRestaurante: Restaurante[] = [];


  constructor( private  restauranteService: RestauranteService) { }

  ngOnInit(): void {
    this.listCategoriasRestaurante();
  }

  private listCategoriasRestaurante(): void {
    // llamamos a la función del servicio y nos suscribimos
    this.restauranteService.getRestauranteList().subscribe(
      (resp: any) =>  {
        console.log('sidebar:', resp);
        this.categoriasRestaurante = resp;
        // const data = Object.keys( (resp) ).map( a => ({
        //   id: resp[a].id,
        //   nombre: resp[a].nombre,
        //
        //   imgLogo: resp[a].imgLogo,
        //   description: resp[a].description,
        //   rangoMaxReparto: resp[a].rangoMaxReparto,
        //   destacado: resp[a].destacado,
        //   activo: resp[a].activo,
        //   localizacion: resp[a].localizacion,
        //   dateCreated: resp[a].dateCreated,
        //   lastUpdated: resp[a].lastUpdated,
        //   categoria: resp[a].categoria,
        //
        // } as Restaurante )   );
        // console.log(data);
        // this.categoriasRestaurante.unshift(...data);
        // console.log( this.categoriasRestaurante);
      }
    );

  }
}
