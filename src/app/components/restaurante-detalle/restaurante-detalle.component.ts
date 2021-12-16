import { Component, OnInit } from '@angular/core';
import {Restaurante} from '../../common/restaurante';
import {RestauranteService} from '../../services/restaurante.service';
import {ActivatedRoute} from '@angular/router';

import {PlatoRestuarante} from '../../common/plato-restuarante';
import {ImgRestaurante} from '../../common/img-restaurante';
import {Horario} from '../../common/horario';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-restaurante-detalle',
  templateUrl: './restaurante-detalle.component.html',
  styleUrls: ['./restaurante-detalle.component.css']
})
export class RestauranteDetalleComponent implements OnInit {


  platosRestaurante: PlatoRestuarante[] = [];

  platos: PlatoRestuarante[] = [];
  restaurante: Restaurante = new Restaurante();
  imagenes: ImgRestaurante[] = [];
  horarios: Horario[] = [];
  formComentario: FormGroup = this.formBuilder.group({
    email: [''],
    puntuacion: [0],
    comentario: ['']
  });
  // private cartService: CartService,

  constructor(private restauranteService: RestauranteService,
              private formBuilder: FormBuilder,
              private activatedRoute: ActivatedRoute ,
             ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(() => {
        const restauranteId = this.activatedRoute.snapshot.paramMap.get('id') as unknown as number;
        this.handleRestaurantes(restauranteId);
        this.handlePlatos(restauranteId);
        this.handleHorarios(restauranteId);
        this.handleImagenes(restauranteId);
      }
    );
  }

  addComentario(form: FormGroup): void {
    this.restauranteService.postComentario(this.restaurante,
      form.getRawValue()).subscribe(
      (data: any) => {
        console.log(data);
        alert(data.respuesta);
        this.handleComentarios(this.restaurante.id);
      }
    );
  }

  handleRestaurantes(restauranteId: number): void {

    this.restauranteService.getRestaurante(restauranteId).subscribe(
      (data: any) => {
        this.restaurante = data;
      }
    );
  }


  private handleRestaurante(restauranteID: number): void {


        this.restauranteService.getRestaurante(restauranteID).subscribe( (data: any) => {
          this.restaurante = data;
        });
  }

   handlePlatos(restauranteID: number): void {
    this.restauranteService.getPlatosRestaurante( restauranteID).subscribe( (data: any) => {
      this.platos = data;
      this.restaurante.platosRestaurante = data;
    });
  }

  handleImagenes(restauranteId: number): void {
    this.restauranteService.getImagenesRestaurante(restauranteId).subscribe(
      (data: any) => {
        this.imagenes = data;
      }
    );
  }
  handleHorarios(restauranteId: number): void {
    this.restauranteService.getHorariosRestaurante(restauranteId).subscribe(
      (data: any) => {
        this.horarios = data;
        this.restaurante.horarios = data;
      }
    );
  }


  private handleComentarios(id: number): void {

  }
}
