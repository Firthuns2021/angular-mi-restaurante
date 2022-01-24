import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestauranteFormService {

  constructor() { }

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

}
