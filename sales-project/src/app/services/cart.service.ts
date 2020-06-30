import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { CartDetails } from '../modules/cartDetails';
import { Product } from '../modules/product';
import { Cart } from '../modules/cart';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  totalPrice: Subject<number> = new Subject<number>();
  totalCount: Subject<number> = new Subject<number>();

  private baseurl = 'http://localhost:8005/ECommerce/cart-api/Carts';
  
  constructor(private httpClient: HttpClient) { }

  getCartDetails() {
    return this.httpClient.get<CartDetails[]>(this.baseurl);
  }

  addToCart(product: Product) {
    const tempCart = new Cart(product.id, 1);

    return this.httpClient.post<Cart>(this.baseurl, tempCart).pipe(
      map(
        (cart) => {
          this.computeCartTotals(product.unitPrice, 1);
          return cart;
        }
      )
    );
  }

  updateCart(cartDetails: CartDetails){
  const url = this.baseurl + `/updateCart?productId=${cartDetails.productId}&newItemCount=${cartDetails.itemCount}`;
  return this.httpClient.post<Cart>(url, null).pipe(
      map(
        (cart) => {
          return cart;
        }
      )
    );
  }

  computeCartTotals(price: number, quantity: number) {
    // publish the new values ... all subscribers will receive the new data
    this.totalPrice.next(price);
    this.totalCount.next(quantity);
  }

  deleteFromCart(id: number) {
    return this.httpClient.delete(this.baseurl + '/' + id);
  }

  purchase(){
    return this.httpClient.delete(this.baseurl + '/deleteAll');
  }
}
