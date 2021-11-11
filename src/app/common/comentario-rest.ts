export  class ComentarioRest{
  id: number;
  email: string;
  comentario: string;
  puntuacion: number;

  constructor(id: number, email: string, comentario: string, puntuacion: number) {
    this.id = 0;
    this.email = '';
    this.comentario = '';
    this.puntuacion = 0;
  }
}
