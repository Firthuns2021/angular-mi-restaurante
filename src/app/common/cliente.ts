import {Direccion} from './direccion';
import {PlatoRestaurante} from './plato-restaurante';
import {Restaurante} from './restaurante';

export class Cliente {
  id: number;
  nombre: string;
  apellidos: string;
  dni: string;
  telefono: string;
  email: string;
  direccion: Direccion[];
  platosFav: PlatoRestaurante[];
  restaurantesFav: Restaurante[];
  restaurante: boolean;
  constructor() {
    this.id = 0;
    this.nombre = '';
    this.apellidos = '';
    this.dni = '';
    this.telefono = '';
    this.email = '';
    this.direccion = [];
    this.platosFav = [];
    this.restaurantesFav = [];
    this.restaurante = false;
  }
}
