import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../../services/products.service';
import { CommonModule } from '@angular/common';
import { CartService } from '../../../services/cart.service';
import { Product } from '../../../interfaces/product';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent {
  productDetail: any;

  constructor( 
    private activatedRoute: ActivatedRoute,
    private productService: ProductsService,
    private cartService: CartService
) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe( ( data: any ) => {
      const productId = data.id;

      this.productService.getProductById( productId ).subscribe( ( data ) => {
        console.log( data );
        this.productDetail = data.data;
      });
    })
  }

  addToCart( product: Product ) {
    this.cartService.addToCart( product );
  }
}
