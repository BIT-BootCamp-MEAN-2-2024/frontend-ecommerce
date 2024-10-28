import { Component } from '@angular/core';
import { ProductsService } from '../../../services/products.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {
  /** Atributos */
  products: any[] = [];

  /** Constructor */
  constructor( private productsService: ProductsService  ) {}

  /** Getters & Setters */

  /** Methods */

  /** Life Cicle */
  ngOnInit() {
    /** Aqui voy a traer los datos el API */
    this.loadData();
  }

  loadData() {
    this.productsService.getProducts().subscribe( ( data ) => {
      console.log( data );
      this.products = data.data;
    });
  }

  editar( id: any ) {
    console.log( `Editar producto ${ id }` );
  }

  eliminar( id: any ) {
    console.log( 'Elimina producto ' + id );
    this.productsService.deleteProduct( id ).subscribe( ( data ) => {
      console.log( data );
      this.loadData();
    });
  }

}
