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

  ngOnInit() {
    this.cartProducts = this.cartService.items;
    console.log( this.cartProducts );
  }

  addOneItem( id: any ) {
    console.log( 'Agrega 1 item con ID: ' + id );
  }

  removeOneItem( id: any ) {
    console.log( 'Elimina 1 item con ID: ' + id );
  }

  removeOneItemsCollection( id: any ) {
    console.log( 'Elimina todos los items con ID: ' + id );
  }

  removeAllItems() {
    console.log( 'Elimina todos los items' );
  }
}
