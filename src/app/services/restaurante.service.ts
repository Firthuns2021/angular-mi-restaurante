import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Restaurante} from '../common/restaurante';
import {map} from 'rxjs/operators';
import {RestauranteCategoria} from '../common/restaurante-categoria';
import {ComentarioRest} from '../common/comentario-rest';



@Injectable({
  providedIn: 'root'
})
export class RestauranteService {

  // Primero definimos la ruta de nuestra API REST
  private baseUrl = 'http://localhost:8080/api/restaurantes';

/*** Inyectamos el protcolo cliente http para poder realizar peticiones http a la API */
  constructor(private http: HttpClient) { }

/*** Creamos la función que nos devolverá el array de restaurauntes, como la AP nos lo devuelve dentro de un objeto llamdo
   *** _embedded, tendremos que mpaear el resultado con un filtro , y para ello crearemos una interfaz que gestione esto***/

// getRestauranteList(): Observable<Restaurante[]>{
//
//   return this.http.get<GetResponse>(this.baseURL).pipe(
//     map((response: any ) => response._embedded.restaurantes)
//   );
//
//
// }
//
//
// getRestauranteListCat(laCategoria: number): Observable<Restaurante[]>{
//
//       const urlCat = this.baseURL + '/search/findByCategoriaId?id=' + laCategoria;
//
//       return  this.http.get<GetResponse>( urlCat ).pipe(
//         map((response: any ) => response._embedded.restaurantes)
//       );
//     }
//
//
//   getCategoriasRestaurante(): Observable<RestauranteCategoria[]> {
//     const urlCat = 'http://localhost:8080/api/categorias';
//     return this.http.get<GetResponseCategoria>(urlCat).pipe(
//       map( (response: any) => response._embedded.categorias )
//     );
//   }
//
//   searchRestaurantes(theKeyWord: string): Observable<Restaurante[]> {
//   const searchUrl = `${this.baseURL}/search/findByNombreContaining?nombre=${theKeyWord}`;
//
//   return this.http.get<GetResponse>(searchUrl).pipe(
//       map((response: any) => response._embedded.restaurantes)
//     );
//   }
  // **** Refactorizamos la funciones de arriba
  getRestauranteList(): Observable<Restaurante[]> {
    return this.getRestaurantes(this.baseUrl);
  }
  getRestauranteListCat(laCategoria: number): Observable<Restaurante[]> {
    const urlCat = this.baseUrl + '/search/findByCategoriaId?id=' + laCategoria;
    return this.getRestaurantes(urlCat);
  }

  getCategoria(idRestaurante: number): Observable<RestauranteCategoria>{

      const catUrl = 'http://localhost:8080/api/restaurantes/';
      return this.http.get<RestauranteCategoria>(`${catUrl +
      idRestaurante }/categoria`);
  }

  searchRestaurantes(theKeyword: string): Observable<Restaurante[]> {
// creamos la url con la palabra clave
    const searchUrl = `${this.baseUrl}/search/findByNombreContaining?nombre=${theKeyword}`;
    return this.getRestaurantes(searchUrl);
  }
  private getRestaurantes(searchUrl: string): Observable<Restaurante[]> {
    return this.http.get<GetResponse>(searchUrl).pipe(
      map((response: any) => response._embedded.restaurantes)
    );
  }

  // http://localhost:8080/api/restaurantes/2/comentariosRest
  getComentariosRestaurante(restauranteId: number):
    Observable<ComentarioRest[]> {
    const comentariosRestUrl =
      `${this.baseUrl}/${restauranteId}/comentariosRest`;
    return this.http.get<GetResponseComentarios>(comentariosRestUrl).pipe(
      map((response: any) => response._embedded.comentariosRest)
    );
  }


  getCategoriasRestaurante(): Observable<RestauranteCategoria[]> {
    const catUrl = 'http://localhost:8080/api/categorias';
    return this.http.get<GetResponseCategoria>(catUrl).pipe(
      map((response: any) => response._embedded.categorias)
    );
  }



}



// defino la intergaz con la informaciónq ue viene d ela api rest
interface GetResponseCategoria {
  _embedded: {
    categorias: RestauranteCategoria[];
  };
}


interface  GetResponse{
  _embedded: {
    restaurantes: Restaurante[];
  };
}
// defino la intergaz con la informaciónq de categorias
interface  GetResponseCategoria{
  _embedded: {
    categorias: RestauranteCategoria[];
  };
}
// interfaz de comentarios de Restaurante
interface GetResponseComentarios{
  _embedded: {
    comentariosRest: ComentarioRest[];
  };
}
