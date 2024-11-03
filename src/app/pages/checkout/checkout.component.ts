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
  }

  removeOneItem( id: any ) {
    console.log( 'Elimina 1 item con ID: ' + id );
    this.cartService.removeOneItem( id );
  }

  removeToCart( id: any ) {
    console.log( 'Elimina todos los items con ID: ' + id );
    this.cartService.removeToCart( id );
  }

  removeAllItems() {
    console.log( 'Elimina todos los items' );
  }
}
