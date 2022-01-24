import { Component, OnInit } from '@angular/core';
import {Restaurante} from "../../common/restaurante";
import {RestauranteService} from "../../services/restaurante.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-restaurante-list',
  templateUrl: './restaurante-list.component.html',
  styleUrls: ['./restaurante-list.component.css']
})
export class RestauranteListComponent implements OnInit {

  // creamos el array de restaurantes donde guardaremos
  // los restaurantes que traigamos de la API REST
  restaurantes: Restaurante[] = [];
  // creamos la variable que guardará la categoria actual si tiene
  actualCategoriaID = 0;
  // creamos una variable de modo búsqueda
  searchMode = false;

  // Variables de paginación
  thePageNumber = 1;
  thePageSize = 5;
  theTotalElements = 0;


  // inyectamos el servicio de restaurante para poder utilizarlo
  constructor(private restauranteService: RestauranteService,
              private activatedRoute: ActivatedRoute) { }

  // En el ngOnInit es donde vamos a poner las funciones que
  // queremos que se ejecuten cuando se inicie este componente
  // En nuestro caso vamos a leer los restaurantes subscribiendonos
  // al servicio restaurante
  ngOnInit(): void {
    // nos subscribimos al activatedRoute para ver si hay parámetros
    this.activatedRoute.paramMap.subscribe(() => {
      this.listRestaurantes();
    })
  }

  // Definimos la función que listará los restaurantes
  listRestaurantes(): void {
    // vemos si laurl tiene parámetro keyword
    this.searchMode = this.activatedRoute.snapshot.paramMap.has('keyword');
    // si tenemos keyword, entonces gestionamos la búsqueda
    if (this.searchMode) {
      this.handleSearchRestaurantes();
    }
    else {
      this.handleListRestaurantes();
    }

  }

  private handleListRestaurantes() {
    // vemos si el parámetro id existe
    const tieneCategoriaId = this.activatedRoute.snapshot.paramMap.has('id');

    if (tieneCategoriaId) {
      // tiene id, lo cogemos y lo guardamos como number
      this.actualCategoriaID = this.activatedRoute.snapshot
        .paramMap.get('id') as unknown as number;
      // llamamos a nuestro servicio para que nos devuelva los restaurantes
      // de esta categoria
      // Listado sin paginación
      /*
      this.restauranteService.getRestauranteListCat(this.actualCategoriaID)
        .subscribe(
          this.processResult()
        );
       */
      // PageNumber le restamos uno porque
      // Angular tiene paginación 1 based
      // Spring tiene paginación 0 based
      this.restauranteService.getRestauranteListCatPaginate(
        this.thePageNumber -1,
        this.thePageSize,
        this.actualCategoriaID
      ).subscribe(this.processResultPaginate());
    }
    else {
      // llamamos a la función del servicio que me trae los restaurantes
      // y nos suscribimos a ella para mantener la información actualizada
      // Función sin paginación
      /*
      this.restauranteService.getRestauranteList().subscribe(
        // una vez suscritos, recogemos la respuesta en una variable
        // llamada data
        this.processResult()
      )
       */
      this.restauranteService.getRestauranteListPaginate(
        this.thePageNumber -1,
        this.thePageSize
      ).subscribe(this.processResultPaginate());
    }
  }

  private handleSearchRestaurantes() {
    const theKeyword = this.activatedRoute.snapshot.paramMap.get('keyword');
    // una vez guardado el parámetro, buscamos los restaurantes
    // utilizando una función del servicio
    if(theKeyword) {
      this.restauranteService.searchRestaurantesPaginate(
        this.thePageNumber -1,
        this.thePageSize,
        theKeyword)
        .subscribe(
          this.processResultPaginate()
        );
    }
  }
  private processResult(): any{
    return (data: any) => {
      this.restaurantes = data;
      this.restaurantes.forEach(
        restaurante => {
          this.restauranteService.getCategoria(restaurante.id)
            .subscribe(
              cat => {
                restaurante.categoria = cat;
              }
            );
          this.restauranteService.getComentariosRestaurante(
            restaurante.id).subscribe(
              comment => {
                restaurante.comentarios = comment;
                this.CalcularMediaComentarios(restaurante);
              }
          )
        }
      )
    }
}

  private CalcularMediaComentarios(restaurante: Restaurante) {
    let aux = 0;
    console.log(restaurante);

    if (restaurante.comentarios.length > 0) {
      restaurante.comentarios.forEach(
        comentario => {
          aux += comentario.puntuacion;
        }
      );
      restaurante.puntuacionMedia =
        aux / restaurante.comentarios.length;
    } else { restaurante.puntuacionMedia = 0}
  }

  private processResultPaginate() {
    return (data: any) => {
      this.restaurantes = data._embedded.restaurantes;
      this.restaurantes.forEach(
        restaurante => {
          this.restauranteService.getCategoria(restaurante.id)
            .subscribe(
              cat => {
                restaurante.categoria = cat;
              }
            );
          this.restauranteService.getComentariosRestaurante(
            restaurante.id).subscribe(
            comment => {
              restaurante.comentarios = comment;
              this.CalcularMediaComentarios(restaurante);
            }
          )
        }
      )
      this.thePageNumber = data.page.number +1;
      this.thePageSize = data.page.size;
      this.theTotalElements = data.page.totalElements;
    }
  }

  updatePageSize(event: any) {
    // seleccionamos el valor del select
    // y lo asignamos a nuestra variable
    if (event.target.value) {
      this.thePageSize = event.target.value;
    }
    // reiniciamos a la página número 1
    this.thePageNumber = 1;
    // volvemos a cargar los restaurantes
    this.listRestaurantes();
  }
}
