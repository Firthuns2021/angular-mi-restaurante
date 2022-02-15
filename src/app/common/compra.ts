import {Cliente} from './cliente';
import {Direccion} from './direccion';
import {Pedido} from './pedido';
import {PlatoPedido} from './plato-pedido';
import {Restaurante} from './restaurante';

export class Compra {
  cliente: Cliente;
  direccionFactura: Direccion;
  direccionEntrega: Direccion;
  pedido: Pedido;
  platoPedidos: PlatoPedido[];
  restaurante: Restaurante;
  constructor() {
    this.cliente = new Cliente();
    this.direccionFactura = new Direccion();
    this.direccionEntrega = new Direccion();
    this.pedido = new Pedido();
    this.restaurante   = new Restaurante();
    this.platoPedidos = [];
  }
}
