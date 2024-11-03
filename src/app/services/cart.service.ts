import { Injectable } from '@angular/core';
import { Item } from '../interfaces/item';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  item!: Item;
  private shoppingCart: any = [] ;
  private localStorageKey = 'cart';
  total: number = 0;

  get items() {
    return this.shoppingCart;
  }

  ngOnInit() {
    this.loadCartFromLocalStorage();
    console.log( this.shoppingCart );
  }

  totalPrice() {
    const prices = this.shoppingCart
      .map( ( item: any ) => {
        return item.total;
      });

    console.log( prices );

    const initialValue = 0;
    
    this.total  = prices.reduce(
      ( accumulator: any, currentValue: any ) => accumulator + currentValue,
      initialValue
    );

  }

  removeOneItem( id: any ) {
    console.log( id );
    
    this.shoppingCart = this.shoppingCart
      .map( ( item: any ) => {
          if( item.info._id === id ) {
            if( item.order !== 0 && item.info.stock > 0 ) {
              item.order -= 1;
              item.total = item.info.price * item.order;
            }
          }

          return item;
      })
      .filter( ( item: any ) => item.order !== 0 );

    console.log( this.shoppingCart );
    
    this.saveCartToLocalStorage();
    this.totalPrice();
  }

  addOneItem( id: any ) {
    console.log( id );
    
    this.shoppingCart = this.shoppingCart
      .map( ( item: any ) => {
          if( item.info._id === id ) {
            if( item.order !== 0 && item.info.stock > 0 ) {
              item.order += 1;
              item.total = item.info.price * item.order;
            }
          }

          return item;
      })
      .filter( ( item: any ) => item.order !== 0 );

    console.log( this.shoppingCart );
    
    this.saveCartToLocalStorage();
    this.totalPrice();
  }

  removeToCart( id: any ) {
    this.shoppingCart = this.shoppingCart.filter( ( item: any ) => {
      return item.info._id !== id;
    });

    console.log( this.shoppingCart );

    this.saveCartToLocalStorage();
    this.totalPrice();
  }

  addToCart(product: Product) {
    // Buscar el producto en el carrito usando su id
    const productFound = this.shoppingCart.find((productItem: any) => 
      productItem.info._id === product._id
    );
  
    if (!productFound) {
      // Si no se encuentra en el carrito, se crea un nuevo item con order = 1
      this.item = {
        info: product,
        order: 1,
        total: product.price // Total inicial basado en la cantidad de 1
      };
      this.shoppingCart.push(this.item);
    } else if ( productFound.order < product.stock ) {
      // Si el producto ya está en el carrito y no se ha alcanzado el límite, incrementar 'order'
      productFound.order += 1;
      productFound.total = productFound.order * product.price;
    } else {
      console.error('Cantidad excedida');
    }
  
    // Guardar el carrito actualizado en localStorage
    this.saveCartToLocalStorage();
    this.totalPrice();
  }
  

  private saveCartToLocalStorage() {
    localStorage.setItem( 
      this.localStorageKey, 
      JSON.stringify( this.shoppingCart ) 
    );
  }

  private loadCartFromLocalStorage() {

    if( localStorage.getItem( this.localStorageKey ) ) {
      this.shoppingCart = JSON.parse( localStorage.getItem( this.localStorageKey ) ! )
    }
    else {
      this.shoppingCart = []
    }
  }


}