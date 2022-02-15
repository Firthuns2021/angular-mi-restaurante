import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Compra} from '../common/compra';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  private compraURL = 'http://localhost:8080/api/checkout/purchase';
  constructor(private http: HttpClient) { }
  realizarCompra(compra: Compra): Observable<any> {
    return this.http.post<Compra>(this.compraURL, compra);
  }
}
