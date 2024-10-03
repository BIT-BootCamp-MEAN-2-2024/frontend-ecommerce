import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [ ReactiveFormsModule ],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent {
  productForm!: FormGroup;  // Nombre del atributo con el que se vinculará el formulario

  constructor () {
    /** Define la agrupación de campos del formulario */
    this.productForm = new FormGroup({
      name: new FormControl( '' ),
      description: new FormControl( '' ),
      price: new FormControl( 0 ),
      quantity: new FormControl( 0 ),
      category: new FormControl( '' ),
      urlImage: new FormControl( '' )
    });
  }

  /** Metodo que obtiene los valores de los campos del formulario */
  onSubmit() {
    const formData = this.productForm.value;    // Datos del formulario
    console.log( formData );  
    this.productForm.reset();                   // Limpia los campos del formulario
  }

}
