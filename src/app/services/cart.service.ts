import { Injectable } from '@angular/core';
import {Restaurante} from '../common/restaurante';
import {PlatoPedido} from '../common/plato-pedido';
import {BehaviorSubject, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItems: PlatoPedido[] = [];
  restauranteOn: Restaurante = new Restaurante();
// Subject para enviar un observable a los suscriptores
  myCart: Subject<PlatoPedido[]> = new BehaviorSubject<PlatoPedido[]>([]);
  totalPrice: Subject<number> = new BehaviorSubject<number>(0);
  totalQuantity: Subject<number> = new BehaviorSubject<number>(0);
  constructor() { }

  addToCart(theCartItem: PlatoPedido): void {
// verificamos si está el plato en el carro ya
    let alreadyExistsInCart = false;
    let existingCartItem: any;
    if (this.cartItems.length > 0) {
// buscamos si existe el plato en el carro basandonos en el id
// find busca el primer elemento en un array que valide la condición
      existingCartItem = this.cartItems.find(  tempCartItem => tempCartItem.platoRestaurante.id ===
                                                               theCartItem.platoRestaurante.id &&
                      (JSON.stringify(tempCartItem.extraPedido) ===       JSON.stringify(theCartItem.extraPedido)   )    );
    }
// comprobamos si lo hemos encontrado
    alreadyExistsInCart = (existingCartItem !== undefined);
    if (alreadyExistsInCart) {
// si existe incrementamos la cantidad
      existingCartItem.cantidad++;
    }
    else {
// si no existe, lo añadimos al array
      this.cartItems.push(theCartItem);
    }
// calculamos cantidad y precio totales
    this.computeCartTotals();
  }
  addToCartRest(theCartItem: PlatoPedido, rest: Restaurante): void {
// actualizamos el restaurante si no hay platos en el carrito
    if (this.cartItems.length === 0) {
      this.restauranteOn = rest;
    }
    else {
// si es otro restaurante reseteamos el carrito antes de añadir platos
      if (rest !== this.restauranteOn) {
        this.cartItems = [];
        this.totalQuantity.next(0);
        this.totalPrice.next(0);
      }
    }
    this.addToCart(theCartItem);
  }
  computeCartTotals(): void {
    let totalPriceValue = 0;
    let totalQuantityValue = 0;
    for (const currentCartItem of this.cartItems) {
      totalPriceValue += currentCartItem.cantidad *
        currentCartItem.precioTotal;
      totalQuantityValue += currentCartItem.cantidad;
    }
// publicamos los nuevos valores... todos los subscriptores recibirán la nueva  información
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);
    this.myCart.next(this.cartItems);
  }

  decrementQuantity(plato: PlatoPedido): void {
    plato.cantidad--;
    if (plato.cantidad === 0) {
      this.remove(plato);
    }
    else{
      this.computeCartTotals();
    }
  }

  remove(plato: PlatoPedido): void {
// buscamos el índice del item en el array
    const itemIndex = this.cartItems.findIndex(tempCartItem =>
      tempCartItem.platoRestaurante.id === plato.platoRestaurante.id);
// si lo encontramos, borramos el item del array en dicho índice
    if (itemIndex > -1) {
// a splice le damos el índice y el número de elementos a borrar
      this.cartItems.splice(itemIndex, 1);
      this.computeCartTotals();
    }
  }
}
