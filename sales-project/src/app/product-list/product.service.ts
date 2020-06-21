import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseurl = 'http://localhost:8005/ECommerce/product-api/Products';

  constructor(private httpClient: HttpClient) { }

  getProductList(): Observable<Product[]>{

    return this.httpClient.get<GetResponse>(this.baseurl).pipe(
      map(response => response._embedded.products)
    );
  }

  getProductsList() {
    return this.httpClient.get<Product[]>(this.baseurl)
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


interface GetResponse {
  _embedded: {
    products: Product[];
  }
}