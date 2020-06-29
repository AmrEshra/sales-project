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
    this.computeCartTotals(product);

    return this.httpClient.post<Cart>(this.baseurl, tempCart).pipe(
      map(
        (cart) => {
          console.log('from post method');
          console.log(cart);
         // this.computeCartTotals(product);
          return cart;
        }
      )
    );
  }

  computeCartTotals(product: Product) {

    // publish the new values ... all subscribers will receive the new data
    this.totalPrice.next(product.unitPrice);
    this.totalCount.next(1);

  }

  deleteFromCart(id: number) {
    return this.httpClient.delete(this.baseurl + id);
  }
}
