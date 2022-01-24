import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Restaurante} from '../common/restaurante';
import {map} from 'rxjs/operators';
import {RestauranteCategoria} from '../common/restaurante-categoria';
import {ComentarioRest} from '../common/comentario-rest';
import {PlatoRestuarante} from '../common/plato-restuarante';
import {ImgRestaurante} from '../common/img-restaurante';
import {Horario} from '../common/horario';
import {PlatoRestaurante} from '../common/plato-restaurante';



@Injectable({
  providedIn: 'root'
})
export class RestauranteService {

  // Primero definimos la ruta de nuestra API REST
  private baseURL = 'http://localhost:8080/api/restaurantes';

  // Inyectamos el protocolo cliente http para poder
  // realizar peticiones http a  la API
  constructor(private http: HttpClient) { }

  // Creamos la función que nos devolverá el array de restaurantes
  // Como la API nos lo devuelve dentro de un objeto llamado
  // _embedded, tendremos que mapear el resultado con un filtro
  // Para ello crearemos una interfaz que gestione esto
  getRestauranteList(): Observable<Restaurante[]> {
    return this.getRestaurantes(this.baseURL);
  }
  getRestauranteListCat(laCategoria: number): Observable<Restaurante[]> {
    const urlCat = this.baseURL +
      '/search/findByCategoriaId?id=' + laCategoria;
    return this.getRestaurantes(urlCat);
  }
  // Creamos la versión con paginación de las funciones
  // para ver los restaurantes y los restaurantes de una cat
  getRestauranteListPaginate(
    thePage: number,
    thePageSize: number): Observable<GetResponsePag> {
    return this.http.get<GetResponsePag>(
      `${this.baseURL}?page=${thePage}&size=${thePageSize}`);
  }

  getRestauranteListCatPaginate(
    thePage: number,
    thePageSize: number,
    laCategoria: number): Observable<GetResponsePag> {
    const urlCat = this.baseURL +
      '/search/findByCategoriaId?id=' + laCategoria +
      '&page=' + thePage + '&size=' + thePageSize;
    return this.http.get<GetResponsePag>(urlCat);
  }

  getCategoriasRestaurante(): Observable<RestauranteCategoria[]> {
    const urlCat = 'http://localhost:8080/api/categorias';
    return this.http.get<GetResponseCategoria>(urlCat).pipe(
      map((response: any) => response._embedded.categorias)
    );
  }

  searchRestaurantesPaginate(
    thePage: number,
    thePageSize: number,
    theKeyword: string): Observable<GetResponsePag> {
    // montamos la url con la palabra a buscar
    const searchUrl =
      `${this.baseURL}/search/findByNombreContaining?nombre=${theKeyword}&page=${thePage}&size=${thePageSize}`;

    return this.http.get<GetResponsePag>(searchUrl);
  }

  searchRestaurantes(theKeyword: string): Observable<Restaurante[]> {
    // montamos la url con la palabra a buscar
    const searchUrl =
      `${this.baseURL}/search/findByNombreContaining?nombre=${theKeyword}`;

    return this.getRestaurantes(searchUrl);
  }

  getCategoria(
    idRestaurante: number
  ): Observable<RestauranteCategoria> {
    const catURL =
      `${this.baseURL}/${idRestaurante}/categoria`;
    return this.http.get<RestauranteCategoria>(catURL);
  }

  getComentariosRestaurante(
    restauranteId: number
  ): Observable<ComentarioRest[]> {
    const comRestURL =
      `${this.baseURL}/${restauranteId}/comentariosRest`;
    return this.http.get<GetResponseComentarios>(
      comRestURL
    ).pipe(map((response: any) =>
      response._embedded.comentariosRest
    ));
  }



  getRestaurante(
    restauranteID: number): Observable<Restaurante>{
    const restURL = `${this.baseURL}/${restauranteID}`;
    return this.http.get<Restaurante>(restURL);
  }

  getPlatosRestaurante(restauranteID: number):
    Observable<PlatoRestaurante[]> {
    const platosRestauranteURL =
      `${this.baseURL}/${restauranteID}/platosRestaurante`;
    return this.http
      .get<GetResponsePlatoRestaurante>(platosRestauranteURL)
      .pipe(map((response: any) =>
        response._embedded.platosRestaurante));
  }

  getImagenesRestaurante(restauranteID: number): Observable<ImgRestaurante[]> {
    const imagenesRestUrl = `${this.baseURL}/${restauranteID}/imgsRestaurante`;
    return this.http.get<GetResponseImagenes>(imagenesRestUrl)
      .pipe(map((response: any) =>
        response._embedded.imgRestaurante));
  }
  getHorariosRestaurante(restauranteID: number): Observable<Horario[]> {
    const horariosRestUrl = `${this.baseURL}/${restauranteID}/horarios`;
    return this.http.get<GetResponseHorarios>(horariosRestUrl)
      .pipe(map((response: any) =>
        response._embedded.horarios));
  }

  postComentario(restaurante: Restaurante, comentario: ComentarioRest): any {
    console.log(restaurante);
    return this.http.post(
      `http://localhost:8080/api/comentariosRest/add`,
      {comentario, restaurante},
      {headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}});
  }

  // tslint:disable-next-line:typedef
  private getRestaurantes(searchUrl: string) {
    return this.http.get<GetResponse>(searchUrl).pipe(
      map((response: any) =>
        response._embedded.restaurantes)
    );
  }

}

// defino la interfaz con la información que viene de la API REST
interface GetResponse {
  _embedded: {
    restaurantes: Restaurante[];
  };
}
// defino la interfaz con la información que viene de la API REST
interface GetResponsePag {
  _embedded: {
    restaurantes: Restaurante[];
  };
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  };
}
// defino la interfaz con la información de categorias
interface GetResponseCategoria {
  _embedded: {
    categorias: RestauranteCategoria[];
  };
}
interface GetResponseComentarios {
  _embedded: {
    comentariosRest: ComentarioRest[];
  };
}
interface GetResponsePlatoRestaurante {
  _embedded: {
    platosRestaurante: PlatoRestaurante[];
  };
}

interface GetResponseImagenes {
  _embedded: {
    imgRestaurante: ImgRestaurante[];
  };
}
interface GetResponseHorarios {
  _embedded: {
    horarios: Horario[];
  };
}

