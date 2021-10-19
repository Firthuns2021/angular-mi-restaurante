export class Restaurante {

  id: number;
  nombre: string;
  imgLogo: string;
  description: string;
  rangoMaxReparto: number;
  destacado: boolean;
  activo: boolean;
  localizacion: string;
  dateCreated: Date;
  lastUpdated: Date;


  constructor(id: number, nombre: string, imgLogo: string, description: string, rangoMaxReparto: number, destacado: boolean, activo: boolean, localizacion: string, dateCreated: Date, lastUpdated: Date) {
    this.id = 0;
    this.nombre = '';
    this.imgLogo = '';
    this.description = '';
    this.rangoMaxReparto = 0;
    this.destacado = false;
    this.activo = false;
    this.localizacion = '';
    this.dateCreated = new Date();
    this.lastUpdated = new Date();
  }
}
