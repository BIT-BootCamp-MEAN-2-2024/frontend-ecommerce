import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [ ReactiveFormsModule, NgIf ],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent {
  productForm!: FormGroup;  // Nombre del atributo con el que se vinculará el formulario

  constructor () {
    /** Define la agrupación de campos del formulario */
    this.productForm = new FormGroup({
      name: new FormControl( '', [ Validators.required ] ),
      description: new FormControl( '' ),
      price: new FormControl( 0, [ Validators.required, Validators.min( 0 ) ] ),
      quantity: new FormControl( 1, [ Validators.required, Validators.min( 1 ) ] ),
      category: new FormControl( '', [ Validators.required ] ),
      urlImage: new FormControl( '' )
    });
  }

  /** Metodo que obtiene los valores de los campos del formulario */
  onSubmit() {
    // Verifica si el formulario es valido de acuerdo las validaciones del formulario
    if( this.productForm.valid ) {
      const formData = this.productForm.value;    // Datos del formulario
      console.log( formData );  
      this.productForm.reset();                   // Limpia los campos del formulario
    }

    
  }

}
