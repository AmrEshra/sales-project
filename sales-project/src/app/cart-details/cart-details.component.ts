import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { CartDetails } from '../modules/cartDetails';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent implements OnInit {

  cartDetails: CartDetails[];
  totalPrice: number = 0.00;
  itemCount: number = 0;
  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.getCartDetails();
  }

  getCartDetails() {
    this.cartService.getCartDetails().subscribe(
      data => {
        this.cartDetails = data;
        console.log(this.cartDetails);
        for (let cartItem of this.cartDetails) {
          this.totalPrice += cartItem.totalPrice;
          this.itemCount += cartItem.itemCount;
        }
      }
    );
  }

  updateCart(cartItem: CartDetails, newQuantity: number){
    console.log(newQuantity);
    console.log(cartItem.name);
    console.log(cartItem.itemCount);

    const oldQuantity = cartItem.itemCount

    cartItem.totalPrice = newQuantity * cartItem.unitPrice;
    cartItem.itemCount = newQuantity;

    this.itemCount = +this.itemCount - oldQuantity + +newQuantity;
    this.totalPrice = +this.totalPrice - (cartItem.unitPrice * oldQuantity) + (cartItem.unitPrice * +newQuantity);

    // TODO
    // post request
    // update cart status
  }
}
