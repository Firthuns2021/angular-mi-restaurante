import {PlatoRestaurante} from "./plato-restaurante";

export class PlatoPedido {
  platoRestaurante: PlatoRestaurante;
  cantidad: number;
  extraPedido: {nombre: string, coste: number}[];
  precioTotal: number;

  constructor(platoRestaurante: PlatoRestaurante) {
    this.platoRestaurante = platoRestaurante;
    this.cantidad = 1;
    this.extraPedido = [];
    this.precioTotal = 0;
  }
}
