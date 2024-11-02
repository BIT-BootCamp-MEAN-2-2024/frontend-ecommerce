import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartProducts: any = [] ;
  private localStorageKey = 'cart';

  constructor() {
    this.loadCartFromLocalStorage();
    console.log( this.cartProducts );
  }

  addToCart(product:any) {
      
      /** Buscar en el carrito si hay un producto con el mismo ID del producto seleccionado */
      const productFound = this.cartProducts.find( ( productItem: any ) =>{
        return productItem._id == product._id;
      });

      console.log( productFound );

      /** Valida si hay productos encontrados en el carrito */
      if( ! productFound ) {
        // Si no lo encuentra, lo agrega al carrito y le añade la propiedad items
        product.items = 1;
        this.cartProducts.push( product );        
      }
      else {
        // Si lo encuentra solo incrementa en 1 la propiedad items
        if( productFound.stock > productFound.items  ) {
          productFound.items = productFound.items + 1;
        }
        else {
          console.error( 'Cantidad excedida' );
        }
      }

      console.log( this.cartProducts );

      /** Guarda los datos en el localStorage, en la misma key */
      this.saveCartToLocalStorage();  
  }

  private saveCartToLocalStorage() {
    localStorage.setItem( this.localStorageKey, JSON.stringify( this.cartProducts ) );
  }

  private loadCartFromLocalStorage() {

    if( localStorage.getItem( this.localStorageKey ) ) {
      this.cartProducts = JSON.parse( localStorage.getItem( this.localStorageKey ) ! )
    }
    else {
      this.cartProducts = []
    }
  }
}