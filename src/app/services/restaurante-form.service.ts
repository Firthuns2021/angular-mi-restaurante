import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Pais} from '../common/pais';
import {map} from 'rxjs/operators';
import {Provincia} from '../common/provincia';

@Injectable({
  providedIn: 'root'
})
export class RestauranteFormService {

  private paisesUrl = 'http://localhost:8080/api/paises';
  private provinciasUrl = 'http://localhost:8080/api/provincias';
  constructor(private http: HttpClient) { }

  getCreditCardMonths(startMonth: number): Observable<number[]>{
    const data: number[] = [];

    for ( let theMonth = startMonth; theMonth <= 12; theMonth++){

      if (startMonth === 13){
        startMonth = 1;
      }
      data.push(startMonth++);
    }
    return of(data);
  }

  getCreditCardYears(): Observable<number[]>{
    const data: number[] = [];

    const startYear = new Date().getFullYear();
    const endYear = startYear + 10;
    for ( let theYear = startYear; theYear <= 12; theYear++){

         data.push(theYear++);
    }
    return of(data);

  }
  getPaises(): Observable<Pais[]> {
    return this.http.get<GetResponsePaises>(this.paisesUrl).pipe(
      map(response => response._embedded.paises)
    );
  }
  getProvincias(elPais: string): Observable<Provincia[]> {
    const searchStatesUrl =
      `${this.provinciasUrl}/search/findByPaisCode?code=${elPais}`;
    return this.http.get<GetResponseProvincias>(searchStatesUrl).pipe(
      map(response => response._embedded.provincias)
    );
  }


}
interface GetResponsePaises {
  _embedded: {
    paises: Pais[];
  };
}
interface GetResponseProvincias {
  _embedded: {
    provincias: Provincia[];
  };
}
