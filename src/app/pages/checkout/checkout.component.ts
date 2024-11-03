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
  cartProducts: any[] = [];

  constructor( private cartService: CartService ) {}

  get total() {
    return this.cartService.total;
  }

  ngOnInit() {
    this.cartProducts = this.cartService.items;
    console.log( this.cartProducts );
  }

  addOneItem( id: any ) {
    console.log( 'Agrega 1 item con ID: ' + id );
    this.cartService.addOneItem( id );

    // Esto recargará el componente de pagina, se recomienda usar BehaviorSubject 
    // que permite lograr la reactividad deseada en el componente que lo consume de 
    // manera que este actualiza sus datos sin tener que renderezarse completamente
    this.cartProducts = this.cartService.items;    
  }

  removeOneItem( id: any ) {
    console.log( 'Elimina 1 item con ID: ' + id );
    this.cartService.removeOneItem( id );

    // Esto recargará el componente de pagina, se recomienda usar BehaviorSubject 
    // que permite lograr la reactividad deseada en el componente que lo consume de 
    // manera que este actualiza sus datos sin tener que renderezarse completamente
    this.cartProducts = this.cartService.items;
  }

  removeToCart( id: any ) {
    console.log( 'Elimina todos los items con ID: ' + id );
    this.cartService.removeToCart( id );
    
    // Esto recargará el componente de pagina, se recomienda usar BehaviorSubject 
    // que permite lograr la reactividad deseada en el componente que lo consume de 
    // manera que este actualiza sus datos sin tener que renderezarse completamente
    this.cartProducts = this.cartService.items;
  }

  removeAllItems() {
    console.log( 'Elimina todos los items' );
    
    // Esto recargará el componente de pagina, se recomienda usar BehaviorSubject 
    // que permite lograr la reactividad deseada en el componente que lo consume de 
    // manera que este actualiza sus datos sin tener que renderezarse completamente
    this.cartProducts = this.cartService.items;
  }
}
