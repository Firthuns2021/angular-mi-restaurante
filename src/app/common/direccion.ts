export class Direccion {
  id: number;
  tipoVia: string;
  calle: string;
  numero: number;
  ciudad: string;
  provincia: string;
  cp: number;
  pais: string;
  constructor() {
    this.id = 0;
    this.tipoVia = '';
    this.calle = '';
    this.numero = 0;
    this.ciudad = '';
    this.provincia = '';
    this.cp = 0;
    this.pais = '';
  }
}
