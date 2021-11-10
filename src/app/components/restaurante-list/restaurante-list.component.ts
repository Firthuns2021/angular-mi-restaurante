import { Component, OnInit } from '@angular/core';
import {RestauranteService} from '../../services/restaurante.service';
import {Restaurante} from '../../common/restaurante';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-restaurante-list',
  templateUrl: './restaurante-list.component.html',
  styleUrls: ['./restaurante-list.component.css']
})
export class RestauranteListComponent implements OnInit {

  /*** creamos el array de restaurantes donde guardaremos los datos de la API REST */
  restaurantes: Restaurante[] = [];
  actualCategoriaID = 0;

  /*** Creamos la variable que gaurdará la categoria actual si tiene  */
  constructor(private restauranteService: RestauranteService,
              private activatedRoute: ActivatedRoute ) { }
  /*** variable de búsqueda*/
  searchMode = false;

  ngOnInit(): void {
    // nos subscribimos al activatedRoute para ver si hay parametros.
    this.activatedRoute.paramMap.subscribe( () => {
      this.listRestaurantes();
    });

  }

  listRestaurantes(): void {
    // vemos si la Url tiene parámetro keyword
    this.searchMode = this.activatedRoute.snapshot.paramMap.has('keyword');
    // *** si tiene keyword, gestionamos la búsqueda
    if ( this.searchMode){
      this.handleSearchRestaurante();
    }else{
      this.handleListRestaurante();
    }


  }
/*** Funcion que nos gestionará la busqueda */
  private handleSearchRestaurante(): any {
      const theKeyWord = this.activatedRoute.snapshot.paramMap.get('keyword');

      if (theKeyWord) {
    this.restauranteService.searchRestaurantes(theKeyWord).subscribe(
      (data: any) => {
        this.restaurantes = data;
      }
    );
  }
}

  private handleListRestaurante(): void {
    // vemos si el parametro id existe
    const tieneCategoriaId = this.activatedRoute.snapshot.paramMap.has('id');

    if (tieneCategoriaId){
      // tiene id, lo cogemos y lo guardamos como number
      this.actualCategoriaID = this.activatedRoute.snapshot.paramMap.get('id') as unknown as number;
      // llamamos a nuestro servicio para q nos devuelva los restauranes de esta categoria
      this.restauranteService.getRestauranteListCat(this.actualCategoriaID).subscribe(
        (data: any) => { this.restaurantes = data; }
      );
    }else {
      this.restauranteService.getRestauranteList().subscribe( (data: any) => {
        this.restaurantes = data;
      });
    }

  }
}
