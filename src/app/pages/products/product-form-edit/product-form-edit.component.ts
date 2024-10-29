import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductsService } from '../../../services/products.service';
import { CategoryService } from '../../../services/category.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-form-edit',
  standalone: true,
  imports: [ ReactiveFormsModule, CommonModule ],
  templateUrl: './product-form-edit.component.html',
  styleUrl: './product-form-edit.component.css'
})
export class ProductFormEditComponent {
  productForm!: FormGroup;  // Nombre del atributo con el que se vinculará el formulario
  categories: any[] = [];

  constructor ( 
    private productsService: ProductsService, 
    private categoryService: CategoryService,
    private router: Router,
    private activatedRoute: ActivatedRoute, 
  ) {
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
      console.log( this.productForm.value );
      
    }

    this.productForm.reset();                   // Limpia los campos del formulario
    
  }

  /** Ciclo de vida que informa de la inicializacion del componente */
  ngOnInit() {
    /** Obtenemos los datos de las categorias para desplegarlas en el formulario a traves del elemento select como un option */
    this.categoryService.getCategories().subscribe( ( data ) => {
      console.log( data );
      this.categories = data.data;
    });

    /** Obtenemos la parametrizacion de la ruta (el Id pasado a la ruta) para obtener los datos del producto y mostrarlos en el formulario */
    this.activatedRoute.params.subscribe( ( data: Params ) => {
      console.log( data[ 'id' ] );

      /** Usar el id para obtener los datos el producto que voy a editar */
      this.productsService.getProductById( data[ 'id' ] ).subscribe( ( product ) => {
        console.log( product );     // product ---> { ok: true, data: { ... } }

        /** Desestructuramos el objeto de respuesta */
        const { data } = product;   // data --> { ... }
        const { name, price, description, quantity, category, urlImage } = data;
    
        /** Establecemos los valores del formulario */
        this.productForm.setValue({
          name,
          description,
          price,
          quantity,
          category,
          urlImage
        })
      });

    });

  }
}
