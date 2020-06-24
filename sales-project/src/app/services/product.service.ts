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

  getProductsList(categoryId: number) {
    const url = `http://localhost:8005/ECommerce/product-api/Products/category/${categoryId}`;
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
    const url = `http://localhost:8005/ECommerce/product-api/Products/name/${name}`;
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
}