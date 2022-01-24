import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {CartService} from '../../services/cart.service';
import {RestauranteFormService} from '../../services/restaurante-form.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

// declaramos nuestro FormGroup
  checkoutFormGroup: FormGroup = this.formBuilder.group({
    cliente: this.formBuilder.group({
      nombre: ['Jose Luis'],
      apellidos: ['De los santos'],
      dni: ['00.000.000-x'],
      telefono: ['600300400'],
      email: ['fer@gmail.com'],
    }),
    shippingAddress: this.formBuilder.group({
      tipoVia: ['calle'],
      calle: ['Topacio'],
      numero: ['1'],
      ciudad: ['Valencia'],
      provincia: ['VAlencia'],
      cp: ['46220'],
      pais: ['España'],
    }),
    billingAddress: this.formBuilder.group({
      tipoVia: ['calle'],
      calle: ['Topacio'],
      numero: ['1'],
      ciudad: ['Valencia'],
      provincia: ['VAlencia'],
      cp: ['46220'],
      pais: ['España'],
    }),
    creditCard: this.formBuilder.group({
      cardType: ['VISA'],
      nameOnCard: [''],
      cardNumber: [''],
      securityCode: [''],
      expirationMonth: [''],
      expirationYear: ['']
    })
  });
// inyectamos el formBuilder en el constructor
  totalQuantity = 0;
  totalPrice = 0.0 ;
  // variable para los select de crediotacar
  creditCardYears: number[] = [];
  creditCardMonths: number[] = [];

  constructor(private formBuilder: FormBuilder, private cartService: CartService, private restauranteFormService: RestauranteFormService) { }
  ngOnInit(): void {
    this.updateCartStatus();
    this.populateMonthsAndYears();
  }

  onSubmit(): void {

  }

  copyShippingToBilling(event: any): void {
    // si está marcada la opción de copar, copiamos los valores de shipping a billing
    if ( event.target.checked){
      this.checkoutFormGroup.controls.billingAddress.setValue(
        this.checkoutFormGroup.controls.shippingAddress.value
      );

    }else {
      // si no, reseteamos el billing
      this.checkoutFormGroup.controls.billingAddress.reset();
    }
  }

  handleMonthsAndYears(): void{
    const creditCardFormGroup = this.checkoutFormGroup.get('creditCard');
    const currentYear = new Date().getFullYear();
    const selectedYear = Number(creditCardFormGroup?.value.expirationYear);

    let startMonth = 1;

    if ( currentYear === selectedYear){
      startMonth = new Date().getMonth() + 1 ;
    }else {
      startMonth = 1;
    }

    this.restauranteFormService.getCreditCardMonths(startMonth).subscribe(
      (data: any) => {
        this.creditCardMonths = data;
      }
    );

  }

  private updateCartStatus(): void {
    // vamos asuscribirnos al precio total y a la cantidad total ddel carrito
    this.cartService.totalPrice.subscribe(
      (data: any) => this.totalPrice = data
    );
    this.cartService.totalQuantity.subscribe(
      (data: any) => this.totalQuantity = data
    );
  }

  private populateMonthsAndYears(): void {
    const startMonth: number = new Date().getMonth() + 1;
    this.restauranteFormService.getCreditCardMonths(startMonth).subscribe(
      (data: any) => {
        this.creditCardMonths = data;
      }
    );

    this.restauranteFormService.getCreditCardYears().subscribe(
      (data: any) => {
        this.creditCardYears = data;
      }
    );
  }
}
