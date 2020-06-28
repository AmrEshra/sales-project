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

  getProductsList(categoryId: number, _page: number, _size: number) {
    const url = this.baseurl + `/category?categoryId=${categoryId}&page=${_page}&size=${_size}`;
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

  getProductsListByName(name: string) {
    const url = this.baseurl + `/name/${name}`;
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
