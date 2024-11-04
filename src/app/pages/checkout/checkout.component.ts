import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {
  cartProducts: any;

  constructor( private cartService: CartService ) {}

  ngOnInit() {
    this.cartProducts = this.cartService.items;
  }

  /** Getter */
  get total() {
    return this.cartService.total;
  }

  addOneItem( id: any ) {
    console.log( 'Agrega un item al carrito con ID ' + id );
    this.cartService.addOneItemToCart( id );
    this.cartProducts = this.cartService.items;
  }

  substractOneItem( id: any ) {
    console.log( 'Resta un item al carrito con ID ' + id );
    this.cartService.substractOneItemToCart( id );
    this.cartProducts = this.cartService.items;
  }

  remoteItems( id: any ) {
    console.log( 'Elimina un conjunto de items del carrito con el ID ' + id );
    this.cartService.removeToCart( id );
    this.cartProducts = this.cartService.items;
  }
}


// numeros [ 2, 5, 7, 0 ]

// const lista = numeros.map( ( data ) => {
//   return data + 2;
// })

// lista [ 4, 7, 9, 2 ]

// const newList = lista.filter( ( numero ) => {
//   return numero % 2 != 0
// });

// newList [ 7, 9 ]


// const lista = numeros
//   .map( (data) => {
//     return data + 2;
//   })
//   .filter( ( numero ) => {
//     return numero % 2 != 0
//   })

// list [ 7, 9 ]

// lista [ 4, 5, 2, 0 ]

// const resutado = lista.reduce( ( acumulador, valorActual ) => {
//   return acumulador * valorActual;
// }, 2 )

// resutado 
// 0


// let mul = 0;
// for( let i =0; i < lista.lenght; i++ ) {
//   mul = mul * lista[ i ]
// }

// mul