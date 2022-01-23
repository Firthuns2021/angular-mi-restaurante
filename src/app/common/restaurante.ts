import {RestauranteCategoria} from "./restaurante-categoria";
import {ComentarioRest} from "./comentario-rest";
import {PlatoRestaurante} from "./plato-restaurante";
import {Horario} from "./horario";

export class Restaurante {
  id: number;
  nombre: string;
  imgLogo: string;
  descripcion: string;
  rangoMaxReparto: number;
  destacado: boolean;
  activo: boolean;
  localizacion: string;
  dateCreated: Date;
  lastUpdated: Date;
  categoria: RestauranteCategoria;
  comentarios: ComentarioRest[];
  puntuacionMedia: number;
  platosRestaurante : PlatoRestaurante[];
  horarios: Horario[];

  constructor() {
    this.id = 0;
    this.nombre = '';
    this.imgLogo = '';
    this.descripcion = '';
    this.rangoMaxReparto = 0;
    this.destacado = false;
    this.activo = false;
    this.localizacion = '';
    this.dateCreated = new Date();
    this.lastUpdated = new Date();
    this.categoria = new RestauranteCategoria();
    this.comentarios = [];
    this.puntuacionMedia = 0;
    this.platosRestaurante = [];
    this.horarios = [];
  }
}
