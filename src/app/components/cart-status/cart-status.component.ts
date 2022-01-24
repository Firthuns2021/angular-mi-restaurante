import { Component, OnInit } from '@angular/core';
import {PlatoPedido} from "../../common/plato-pedido";
import {CartService} from "../../services/cart.service";

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

  private updateCartStatus(): void {
    // nos suscribimos al carrito
    this.cartService.myCart.subscribe(
      (data: any) => this.cartItems = data
    );
    // nos suscribimos al precioTotal
    this.cartService.totalPrice.subscribe(
      (data: any) => this.totalPrice = data
    );
    // nos suscribimos a la cantidad total
    this.cartService.totalQuantity.subscribe(
      (data: any) => this.totalQuantity = data
    );
  }

  incrementQuantity(plato: PlatoPedido) {
    this.cartService.addToCart(plato);
  }

  decrementQuantity(plato: PlatoPedido) {
    this.cartService.decrementQuantity(plato);
  }

  remove(plato: PlatoPedido) {
    this.cartService.remove(plato);
  }
}
