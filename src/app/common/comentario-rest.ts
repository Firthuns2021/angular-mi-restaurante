export class ComentarioRest {
  id: number;
  email: string;
  comentario: string;
  puntuacion: number;

  constructor() {
    this.id = 0;
    this.email = '';
    this.comentario = '';
    this.puntuacion = 0;
  }
}
