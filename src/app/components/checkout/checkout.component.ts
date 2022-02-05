import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

import {CartService} from '../../services/cart.service';
import {RestauranteFormService} from '../../services/restaurante-form.service';
import {Pais} from '../../common/pais';
import {Provincia} from '../../common/provincia';
import {FormValidators} from '../../validators/form-validators';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

// declaramos nuestro FormGroup
  checkoutFormGroup: FormGroup = this.formBuilder.group({
    cliente: this.formBuilder.group({
      nombre: new FormControl('', [
        Validators.required,  FormValidators.notOnlyWhitespace,  Validators.minLength(2)
      ]),
      apellidos: new FormControl('', [
        Validators.required,  FormValidators.notOnlyWhitespace,  Validators.minLength(2)
      ]),
      dni: new FormControl('', [
        Validators.required,  FormValidators.notOnlyWhitespace,  Validators.maxLength(9)
      ]),
      telefono: new FormControl('', [
        Validators.required,  FormValidators.notOnlyWhitespace, FormValidators.notOnlyWhitespace]),
      email: new FormControl('', [
        Validators.required,  FormValidators.notOnlyWhitespace,  Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$')
      ])
    }),
    shippingAddress: this.formBuilder.group({
      tipoVia: new FormControl('', [
        Validators.required,
      ]),
      calle: new FormControl('', [
        Validators.required,
        FormValidators.notOnlyWhitespace,
        Validators.minLength(2)
      ]),
      numero: new FormControl('', [
        Validators.required,
        FormValidators.notOnlyWhitespace
      ]),
      ciudad: new FormControl('', [
        Validators.required,
        FormValidators.notOnlyWhitespace,
        Validators.minLength(2)
      ]),
      provincia: new FormControl('', [
        Validators.required,
      ]),
      cp: new FormControl('', [
        Validators.required,
        FormValidators.notOnlyWhitespace,
        Validators.minLength(2)
      ]),
      pais: new FormControl('', [
        Validators.required,
      ]),
    }),
    billingAddress: this.formBuilder.group({
      tipoVia: new FormControl('', [
        Validators.required,
      ]),
      calle: new FormControl('', [
        Validators.required,
        FormValidators.notOnlyWhitespace,
        Validators.minLength(2)
      ]),
      numero: new FormControl('', [
        Validators.required,
        FormValidators.notOnlyWhitespace
      ]),
      ciudad: new FormControl('', [
        Validators.required,
        FormValidators.notOnlyWhitespace,
        Validators.minLength(2)
      ]),
      provincia: new FormControl('', [
        Validators.required,
      ]),
      cp: new FormControl('', [
        Validators.required,
        FormValidators.notOnlyWhitespace,
        Validators.minLength(2)
      ]),
      pais: new FormControl('', [
        Validators.required,
      ]),
    }),
    creditCard: this.formBuilder.group({
      cardType: new FormControl('', [
        Validators.required,
        FormValidators.notOnlyWhitespace
      ]),
      nameOnCard: new FormControl('', [
        Validators.required,
        FormValidators.notOnlyWhitespace,
        Validators.minLength(2)
      ]),
      cardNumber: new FormControl('', [
        Validators.required,
        FormValidators.notOnlyWhitespace,
        Validators.pattern('[0-9]{16}'),
      ]),
      securityCode: new FormControl('', [
        Validators.required,
        FormValidators.notOnlyWhitespace,
        Validators.pattern('[0-9]{3}'),
      ]),
      expirationMonth: new FormControl('', [
        Validators.required,
        FormValidators.notOnlyWhitespace
      ]),
      expirationYear: new FormControl('', [
        Validators.required,
        FormValidators.notOnlyWhitespace
      ])
    })
  });
  // Métodos getter para acceder a los FormControls
  get nombre(): any {return this.checkoutFormGroup.get('cliente.nombre'); }
  get apellidos(): any {return this.checkoutFormGroup.get('cliente.apellidos'); }
  get dni(): any {return this.checkoutFormGroup.get('cliente.dni'); }
  get telefono(): any {return this.checkoutFormGroup.get('cliente.telefono'); }
  get email(): any {return this.checkoutFormGroup.get('cliente.email'); }

  get shippingAddressTipoVia(): any {return  this.checkoutFormGroup.get('shippingAddress.tipoVia'); }
  get shippingAddressCalle(): any {return    this.checkoutFormGroup.get('shippingAddress.calle'); }
  get shippingAddressNumero(): any {return   this.checkoutFormGroup.get('shippingAddress.numero'); }
  get shippingAddressCiudad(): any {return  this.checkoutFormGroup.get('shippingAddress.ciudad'); }
  get shippingAddressProvincia(): any {return this.checkoutFormGroup.get('shippingAddress.provincia'); }
  get shippingAddressCp(): any {return this.checkoutFormGroup.get('shippingAddress.cp'); }
  get shippingAddressPais(): any {return this.checkoutFormGroup.get('shippingAddress.pais'); }
  get billingAddressTipoVia(): any {return this.checkoutFormGroup.get('billingAddress.tipoVia'); }
  get billingAddressCalle(): any {return this.checkoutFormGroup.get('billingAddress.calle'); }
  get billingAddressNumero(): any {return this.checkoutFormGroup.get('billingAddress.numero'); }
  get billingAddressCiudad(): any {return this.checkoutFormGroup.get('billingAddress.ciudad'); }
  get billingAddressProvincia(): any {return this.checkoutFormGroup.get('billingAddress.provincia'); }
  get billingAddressCp(): any {return this.checkoutFormGroup.get('billingAddress.cp'); }
  get billingAddressPais(): any {return this.checkoutFormGroup.get('billingAddress.pais'); }
  get cardType(): any {return this.checkoutFormGroup.get('creditCard.cardType'); }
  get nameOnCard(): any {return this.checkoutFormGroup.get('creditCard.nameOnCard'); }
  get cardNumber(): any {return this.checkoutFormGroup.get('creditCard.cardNumber'); }
  get securityCode(): any {return this.checkoutFormGroup.get('creditCard.securityCode'); }
  get expirationMonth(): any {return this.checkoutFormGroup.get('creditCard.expirationMonth'); }
  get expirationYear(): any {return this.checkoutFormGroup.get('creditCard.expirationYear'); }

// inyectamos el formBuilder en el constructor
  totalQuantity = 0;
  totalPrice = 0.0 ;
  // variable para los select de crediotacar
  creditCardYears: number[] = [];
  creditCardMonths: number[] = [];
  paises: Pais[] = [];
// inyectamos el formBuilder en el constructor
// el servicio del carrito para la previsualización de la compra
// y el servicio del form para traer la información de los desplegables
  // Creamos arrays separados de provincias para envío y facturación
  shippingAddressProvincias: Provincia[] = [];
  billingAddressProvincias: Provincia[] = [];
constructor(private formBuilder: FormBuilder, private cartService: CartService, private restauranteFormService: RestauranteFormService) { }
  ngOnInit(): void {
    this.updateCartStatus();
    // poblamos los meses de la tarjeta de crédito
    const startMonth: number = new Date().getMonth() + 1;
    this.restauranteFormService.getCreditCardMonths(startMonth).subscribe(
      (data: any) => {
        this.creditCardMonths = data;
      }
    );
// poblamos los años de la tarjeta de crédito
    this.restauranteFormService.getCreditCardYears().subscribe(
      (data: any) => {
        this.creditCardYears = data;
      }
    );
// poblamos los paises
    this.restauranteFormService.getPaises().subscribe(
      (data: any) => {
        this.paises = data;
      }
    );
    this.populateMonthsAndYears();
  }

  onSubmit(): void {
    if (this.checkoutFormGroup.invalid) {
      this.checkoutFormGroup.markAllAsTouched();
    }
  }

  copyShippingToBilling(event: any): void {
// si está marcado la opción de copiar, copiamos los valores de shipping a billing
    if (event.target.checked) {
      this.checkoutFormGroup.controls.billingAddress.setValue(this.checkoutFormGroup.controls.shippingAddress.value);
      this.billingAddressProvincias = this.shippingAddressProvincias;
    }
// si no borramos el grupo de billing
    else {
      this.checkoutFormGroup.controls.billingAddress.reset();
      this.billingAddressProvincias = [];
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

  getProvincias(formGroupName: string): void {
// leemos el código para saber si es dirección de envío o de facturación
    const formGroup = this.checkoutFormGroup.get(formGroupName);
// sacamos el código y el nombre del país y los almacenamos en variables
    if (formGroup) {
      const paisCode = formGroup.get('pais')?.value.code;
      const paisName = formGroup.get('pais')?.value.name;
      this.restauranteFormService.getProvincias(paisCode).subscribe(
        (data: any) => {
          if (formGroupName === 'shippingAddress') {
            this.shippingAddressProvincias = data;
          } else {
            this.billingAddressProvincias = data;
          }
// seleccionamos la primera provincia por defecto
          formGroup.get('provincia')?.setValue(data[0]);
        }
      );
    }
  }
}
