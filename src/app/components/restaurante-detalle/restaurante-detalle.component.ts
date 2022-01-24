import {Component, OnInit, ViewChildren} from '@angular/core';
import {Restaurante} from '../../common/restaurante';
import {RestauranteService} from '../../services/restaurante.service';
import {ActivatedRoute} from '@angular/router';
import {PlatoRestaurante} from '../../common/plato-restaurante';
import {ImgRestaurante} from '../../common/img-restaurante';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Horario} from '../../common/horario';
import {CartService} from '../../services/cart.service';
import {PlatoPedido} from '../../common/plato-pedido';

@Component({
  selector: 'app-restaurante-detalle',
  templateUrl: './restaurante-detalle.component.html',
  styleUrls: ['./restaurante-detalle.component.css']
})
export class RestauranteDetalleComponent implements OnInit {

  restaurante: Restaurante = new Restaurante();
  platosRestaurante: PlatoRestaurante[] = [];
  imagenes: ImgRestaurante[] = [];
  horarios: Horario[] = [];

  // Creamos el formulario para el comentario
  formComentario: FormGroup = this.formBuilder.group({
    email: [''],
    puntuacion: [0],
    comentario: ['']
  });
  dias = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

  extras: {nombre: string, coste: number}[] = [];
  @ViewChildren('miExtra') extra: any;
  constructor(
    private restauranteService: RestauranteService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private cartService: CartService
              ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(() => {
      const restauranteID = this.activatedRoute
        .snapshot.paramMap.get('id') as unknown as number;
      this.handleRestaurante(restauranteID);
      this.handlePlatos(restauranteID);
      this.handleImagenes(restauranteID);
      this.handleComentarios(restauranteID);
      this.handleHorarios(restauranteID);
    })
  }

  addComentario(form: FormGroup): void {
    this.restauranteService.postComentario(
      this.restaurante,
      form.getRawValue()
    ).subscribe(
      (data: any) => {
        alert(data.respuesta);
        this.handleComentarios(this.restaurante.id);
      }
    )
  }

  private handleRestaurante(restauranteID: number): void {
    this.restauranteService.getRestaurante(restauranteID)
      .subscribe((data: any) => {
        this.restaurante = data;
      });
  }

  private handlePlatos(restauranteID: number): void {
    this.restauranteService.getPlatosRestaurante(restauranteID)
      .subscribe((data: any) => {
        this.platosRestaurante = data;
        this.restaurante.platosRestaurante = this.platosRestaurante;
      });
  }

  private handleImagenes(restauranteID: number): void {
    this.restauranteService.getImagenesRestaurante(restauranteID)
      .subscribe((data: any) => {
        this.imagenes = data;
      });
  }


  private handleComentarios(restauranteID: number): void {
    this.restauranteService.getComentariosRestaurante(restauranteID)
      .subscribe((data: any) => {
        this.restaurante.comentarios = data;
        this.CalcularMediaComentarios(this.restaurante);
      });
  }
  private handleHorarios(restauranteID: number): void {
    this.restauranteService.getHorariosRestaurante(restauranteID)
      .subscribe((data: any) => {
        this.restaurante.horarios = data;
        this.horarios = data;
        this.CalcularMediaComentarios(this.restaurante);
      });
  }

  // tslint:disable-next-line:typedef
  private CalcularMediaComentarios(restaurante: Restaurante): void {
    let aux = 0;

    if (restaurante.comentarios.length > 0) {
      restaurante.comentarios.forEach(
        comentario => {
          aux += comentario.puntuacion;
        }
      );
      restaurante.puntuacionMedia =
        aux / restaurante.comentarios.length;
    } else { restaurante.puntuacionMedia = 0 ; }
  }

  addToCart(plato: PlatoRestaurante): void {
    const elPlatoPedido = new PlatoPedido(plato);
    elPlatoPedido.extraPedido = this.extras;
    let totalExtras = 0.0;
    elPlatoPedido.extraPedido.forEach((extra) => {
      totalExtras += extra.coste;
    });
    elPlatoPedido.precioTotal =  elPlatoPedido.platoRestaurante.precioBase + totalExtras;
    this.cartService.addToCartRest(elPlatoPedido, this.restaurante);
    this.extras = [];
  }

  OnCheckboxSelect(extra: { nombre: string; coste: number }, event: any): void {
    if (event.target.checked === true) {
      this.extras.push(extra);
    } else{
      this.extras = this.extras.filter((data) => data.nombre !== extra.nombre);
    }
  }

  addToCartForm(plato: PlatoRestaurante, miForm: HTMLFormElement): void{
    miForm.reset();
    this.addToCart(plato);
  }
}
