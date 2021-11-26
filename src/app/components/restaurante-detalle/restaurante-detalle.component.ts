import { Component, OnInit } from '@angular/core';
import {Restaurante} from '../../common/restaurante';
import {RestauranteService} from '../../services/restaurante.service';
import {ActivatedRoute} from '@angular/router';
import {unwrapResolvedMetadata} from '@angular/compiler';
import {PlatoRestuarante} from '../../common/plato-restuarante';

@Component({
  selector: 'app-restaurante-detalle',
  templateUrl: './restaurante-detalle.component.html',
  styleUrls: ['./restaurante-detalle.component.css']
})
export class RestauranteDetalleComponent implements OnInit {

  restaurante: Restaurante = new Restaurante();
  platosRestaurante: PlatoRestuarante[] = [];

  constructor(private restauranteService: RestauranteService,
              private activatedRoute: ActivatedRoute ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe( () => {
      const restauranteID = this.activatedRoute.snapshot.paramMap.get('id') as unknown as number;

      this.handleRestaurante( restauranteID );
      this.handlePlatos( restauranteID );
    });
  }

  private handleRestaurante(restauranteID: number): void {


        this.restauranteService.getRestaurante(restauranteID).subscribe( (data: any) => {
          this.restaurante = data;
        });
  }

  private handlePlatos(restauranteID: number): void {
    this.restauranteService.getPlatosRestaurante( restauranteID).subscribe( (data: any) => {
      this.platosRestaurante = data;
      this.restaurante.platosRestaurante = this.platosRestaurante;
    });
  }
}
