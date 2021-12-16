import {Time} from '@angular/common';

export class Horario {
  id: number;
  apertura: Time;
  cierre: Time;
  dia: number;
  constructor() {
    this.id = 0;
    this.apertura = {
      hours: 0,
      minutes: 0
    };
    this.cierre = {
      hours: 0,
      minutes: 0
    };
    this.dia = 0;
  }
}
