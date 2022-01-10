import { Component, OnInit } from '@angular/core';
import {CartService} from '../../services/cart.service';
import {PlatoPedido} from '../../common/plato-pedido';

@Component({
  selector: 'app-cart-status',
  templateUrl: './cart-status.component.html',
  styleUrls: ['./cart-status.component.css']
})
export class CartStatusComponent implements OnInit {

  cartItems: PlatoPedido[] = [];
  totalPrice = 0.00;
  totalQuantity = 0;
  constructor(private cartService: CartService) { }
  ngOnInit(): void {
    this.updateCartStatus();
  }
  updateCartStatus(): void {
// nos subscribimos al carrito para que nos diga cuando se actualiza
    this.cartService.myCart.subscribe(
      (data: any) => this.cartItems = data
    );
// nos subscribimos al precio total del servicio del carrito
    this.cartService.totalPrice.subscribe(
      (data: any) => this.totalPrice = data
    );
// nos subscribimos a la cantidad total del servicio del carrito
    this.cartService.totalQuantity.subscribe(
      (data: any) => this.totalQuantity = data
    );
  }

  incrementQuantity(plato: PlatoPedido): void {
    // añadimos al carrito el plato que queremos incrementar
    this.cartService.addToCart(plato);
  }

  decrementQuantity(plato: PlatoPedido): void {
    this.cartService.decrementQuantity(plato);
  }
  remove(plato: PlatoPedido): void {
    this.cartService.remove(plato);
  }
}
