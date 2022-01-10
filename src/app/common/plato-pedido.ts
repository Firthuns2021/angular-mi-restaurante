import {PlatoRestuarante} from './plato-restuarante';

export class PlatoPedido {
  platoRestaurante: PlatoRestuarante;
  cantidad: number;
  extraPedido: {nombre: string, coste: number}[];
  precioTotal: number;
  constructor(platoRestaurante: PlatoRestuarante) {
    this.platoRestaurante = platoRestaurante;
    this.cantidad = 1;
    this.extraPedido = [];
    this.precioTotal = 0;
  }
}
