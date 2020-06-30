import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { CartDetails } from '../modules/cartDetails';
import { Cart } from '../modules/cart';

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
    this.totalPrice = 0;
    this.itemCount = 0;
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

  removeFromCart(cartItem: CartDetails) {

    this.cartService.deleteFromCart(cartItem.productId)
      .subscribe(
        () => {
          this.getCartDetails();
           this.cartService.computeCartTotals(-1 * cartItem.totalPrice, -1 * cartItem.itemCount);
        }
      );
  }

  updateCart(cartItem: CartDetails, newQuantity: number) {
    console.log(newQuantity);
    console.log(cartItem.name);
    console.log(cartItem.itemCount);
    const oldQuantity = cartItem.itemCount;

    cartItem.totalPrice = newQuantity * cartItem.unitPrice;
    cartItem.itemCount = newQuantity;

    this.itemCount = +this.itemCount - oldQuantity + +newQuantity;
    this.totalPrice = +this.totalPrice - (cartItem.unitPrice * oldQuantity) + (cartItem.unitPrice * +newQuantity);

    this.cartService.computeCartTotals((- (cartItem.unitPrice * oldQuantity) + (cartItem.unitPrice * +newQuantity)), (- oldQuantity + +newQuantity));

    this.cartService.updateCart(cartItem)
      .subscribe(
        (product) => {
          console.log(product);
        }
      );
  }
}
