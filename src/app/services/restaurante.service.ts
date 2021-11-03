import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Restaurante} from '../common/restaurante';
import {map} from 'rxjs/operators';
import {RestauranteCategoria} from '../common/restaurante-categoria';



@Injectable({
  providedIn: 'root'
})
export class RestauranteService {

  // Primero definimos la ruta de nuestra API REST
  private baseURL = 'http://localhost:8080/api/restaurantes';

/*** Inyectamos el protcolo cliente http para poder realizar peticiones http a la API */
  constructor(private http: HttpClient) { }

/*** Creamos la función que nos devolverá el array de restaurauntes, como la AP nos lo devuelve dentro de un objeto llamdo
   *** _embedded, tendremos que mpaear el resultado con un filtro , y para ello crearemos una interfaz que gestione esto***/

getRestauranteList(): Observable<Restaurante[]>{

  return this.http.get<GetResponse>(this.baseURL).pipe(
    map((response: any ) => response._embedded.restaurantes)
  );


}


getRestauranteListCat(laCategoria: number): Observable<Restaurante[]>{

      const urlCat = this.baseURL + '/search/findByCategoriaId?id=' + laCategoria;

      return  this.http.get<GetResponse>( urlCat ).pipe(
        map((response: any ) => response._embedded.restaurantes)
      );
    }


  getCategoriasRestaurante(): Observable<RestauranteCategoria[]> {
    const urlCat = 'http://localhost:8080/api/categorias';
    return this.http.get<GetResponseCategoria>(urlCat).pipe(
      map( (response: any) => response._embedded.categorias )
    );
  }
}

// defino la intergaz con la informaciónq ue viene d ela api rest
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
