export class PlatoRestuarante {
  id: number;
  nombre: string;
  precioBase: number;
  descripcion: string;
  alergenos: [{ alergeno: string}];
  imgPlato: [{imagen: string} ];
  extras: [
    {
      nombre: string;
      coste: number;
    }
  ];
  comentariosPlato: [{
    email: string;
    comentario: string;
    puntuacion: number;
  }];


  constructor() {
    this.id = 0;
    this.nombre = '';
    this.precioBase = 0;
    this.descripcion = '';
    this.alergenos = [{alergeno: ''}];
    this.imgPlato = [{imagen: ''}];
    this.extras = [{ nombre: '', coste: 0}];
    this.comentariosPlato = [{ email: '', comentario: '', puntuacion: 0 }];
  }
}
