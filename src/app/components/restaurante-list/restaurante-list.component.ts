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

  // creamos las variables para paginación
  thePageNumber = 1;
  thePageSize = 10;
  theTotalElements = 0;

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
      this.handleListRestaurantes();
    }


  }
/*** Funcion que nos gestionará la busqueda */
  private handleSearchRestaurante(): any {
      const theKeyWord = this.activatedRoute.snapshot.paramMap.get('keyword');

      if (theKeyWord) {
    this.restauranteService.searchRestaurantesPaginate(this.thePageNumber -1 , this.thePageSize, theKeyWord).subscribe(
      this.processResultPaginate()

    );
  }
}

  handleListRestaurantes(): void {
// antigua listRestaurantes()
// vemos si el parámetro id existe
    const tieneCategoriaId = this.activatedRoute.snapshot.paramMap.has('id');
    if (tieneCategoriaId) {
// si tiene id, cogemos ese id y lo convertimos a número
      this.actualCategoriaID = this.activatedRoute.snapshot.paramMap.get('id') as
        unknown as number;
// this.thePageNumber - 1 porque en Angular es 1 based y en Spring 0 based
      this.restauranteService.getRestauranteListCatPaginate(this.thePageNumber - 1,
        this.thePageSize, this.actualCategoriaID)
        .subscribe(this.processResult());
    }
    else {
// Con paginación
      this.restauranteService.getRestauranteListPaginate(
        this.thePageNumber - 1,
        this.thePageSize).subscribe(this.processResult());
    }
  }





  processResult(): any {
    return (data: any) => {
      this.restaurantes = data._embedded.restaurantes;
// de nuevo Spring 0 based y Angular 1 based
      this.thePageNumber = data.page.number + 1;
      this.thePageSize = data.page.size;
      this.theTotalElements = data.page.totalElements;
    };
  }

  updatePageSize(event: any): void {
// seleccionamos el valor del select y lo asignamos a nuestra variable
    if (event.target.value) {
      this.thePageSize = event.target.value;
    }
// reiniciamos la página a la 1
    this.thePageNumber = 1;
// volvemos a cargar los restaurantes
    this.listRestaurantes();
  }

   calcularMediaComentarios(restaurante: Restaurante): void  {
     let aux = 0;
     restaurante.comentarios.forEach(
       comentario => {
         aux += comentario.puntuacion;
       }
     );
     if (restaurante.comentarios.length > 0) {
       restaurante.puntuacionMedia = aux / restaurante.comentarios.length;
     } else { restaurante.puntuacionMedia = 0; }
  }

  // tslint:disable-next-line:typedef
  private processResultPaginate() {
      return(data: any) => {
        this.restaurantes = data._embedded.restaurantes;
        this.restaurantes.forEach(
          restaurante => {
            this.restauranteService.getCategoria(restaurante.id).subscribe( cat => {
              restaurante.categoria = cat;
            });
            this.restauranteService.getComentariosRestaurante( restaurante.id).subscribe( comment => {
                restaurante.comentarios = comment;
                this.calcularMediaComentarios(restaurante);
            });
          }
        );
      };
  }

  // tslint:disable-next-line:typedef

}
