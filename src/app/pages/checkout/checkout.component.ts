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
}
