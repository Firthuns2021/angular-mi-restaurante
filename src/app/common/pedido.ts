import {Restaurante} from './restaurante';
import {Direccion} from './direccion';
import {Cliente} from './cliente';
import {PlatoPedido} from './plato-pedido';

export class Pedido {
  id: number;
  estado: boolean;
  cliente: Cliente;
  direccionFactura: Direccion;
  direccionEntrega: Direccion;
  restaurante: Restaurante;
  costeTransporte: number;
  precioTotal: number;
  fecha: Date;
  cuponDescuento: string;
  platosPedido: PlatoPedido[];
  constructor() {
    this.id = 0;
    this.estado = false;
    this.cliente = new Cliente();
    this.direccionFactura = new Direccion();
    this.direccionEntrega = new Direccion();
    this.restaurante = new Restaurante();
    this.costeTransporte = 0;
    this.precioTotal = 0;
    this.fecha = new Date();
    this.cuponDescuento = '';
    this.platosPedido = [];
  }
}
