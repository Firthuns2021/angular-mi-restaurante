import { Component, OnInit } from '@angular/core';
import {Restaurante} from '../../common/restaurante';
import {RestauranteService} from '../../services/restaurante.service';
import {ActivatedRoute} from '@angular/router';
import {unwrapResolvedMetadata} from '@angular/compiler';
import {PlatoRestuarante} from '../../common/plato-restuarante';
import {ImgRestaurante} from '../../common/img-restaurante';

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

  constructor(private restauranteService: RestauranteService,
              private activatedRoute: ActivatedRoute ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe( () => {
      const restauranteId = this.activatedRoute.snapshot.paramMap.get('id') as unknown as number;
      this.handleRestaurantes(restauranteId);
      this.handlePlatos(restauranteId);
      this.handleImagenes(restauranteId);
    });
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

  private handleImagenes(restauranteId: number) {
    this.restauranteService.getImagenesRestaurante( restauranteId).subscribe(  (data: any)=> {
      this.imagenes= data;
    });
  }
}
