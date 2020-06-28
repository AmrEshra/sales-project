import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Product } from '../modules/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseurl = 'http://localhost:8005/ECommerce/product-api/Products';

  constructor(private httpClient: HttpClient) { }

  getProductsList(categoryId: number, PAGE_: number, SIZE_: number) {
    const url = this.baseurl + `/category?categoryId=${categoryId}&page=${PAGE_}&size=${SIZE_}`;
    return this.httpClient.get<Product[]>(url)
      .pipe(
        map(
          (products) => {
            console.log(products);
            return products;
          }
        )
      );
  }

  getProductsListByName(name: string, PAGE_: number, SIZE_: number) {
    const url = this.baseurl + `/name?name=${name}&page=${PAGE_}&size=${SIZE_}`;
    return this.httpClient.get<Product[]>(url)
      .pipe(
        map(
          (products) => {
            console.log(products);
            return products;
          }
        )
      );
  }

    getProductById(id: number) {
    const url = this.baseurl + `/${id}`;
    return this.httpClient.get<Product>(url);
  }
}
