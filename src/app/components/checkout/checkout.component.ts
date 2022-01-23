import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

// declaramos nuestro FormGroup
  checkoutFormGroup: FormGroup = this.formBuilder.group({
    cliente: this.formBuilder.group({
      nombre: [''],
      apellidos: [''],
      dni: [''],
      telefono: [''],
      email: [''],
    }),
    shippingAddress: this.formBuilder.group({
      tipoVia: [''],
      calle: [''],
      numero: [''],
      ciudad: [''],
      provincia: [''],
      cp: [''],
      pais: [''],
    }),
    billingAddress: this.formBuilder.group({
      tipoVia: [''],
      calle: [''],
      numero: [''],
      ciudad: [''],
      provincia: [''],
      cp: [''],
      pais: [''],
    }),
    creditCard: this.formBuilder.group({
      cardType: [''],
      nameOnCard: [''],
      cardNumber: [''],
      securityCode: [''],
      expirationMonth: [''],
      expirationYear: ['']
    })
  });
// inyectamos el formBuilder en el constructor
  constructor(private formBuilder: FormBuilder) { }
  ngOnInit(): void {
  }
}
