import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { CartDetails } from '../modules/cartDetails';

@Component({
  selector: 'app-cart-status',
  templateUrl: './cart-status.component.html',
  styleUrls: ['./cart-status.component.css']
})
export class CartStatusComponent implements OnInit {

  cartDetails: CartDetails[];
  totalPrice: number = 0.00;
  itemCount: number = 0;
  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.getCartStatus();
    this.updateCartStatus();
  }

  getCartStatus() {

    this.cartService.getCartDetails().subscribe(
      data => {
        this.cartDetails = data;

        for (let cartItem of this.cartDetails) {
          this.totalPrice += cartItem.totalPrice;
          this.itemCount += cartItem.itemCount;
        }
      }
    );
  }

  updateCartStatus() {

    this.cartService.totalPrice.subscribe(
      data => this.totalPrice += data
    );

    // subscribe to the cart totalQuantity
    this.cartService.totalCount.subscribe(
      data =>  this.itemCount += data
    );
  }

}
