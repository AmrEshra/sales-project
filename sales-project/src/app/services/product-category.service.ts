import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ProductCategory } from '../modules/productCategory';

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryService {

  private baseurl = 'http://localhost:8005/ECommerce/productCategory-api/ProductCategories';

  constructor(private httpClient: HttpClient) { }

  getProductCategoriesList() {
    return this.httpClient.get<ProductCategory[]>(this.baseurl)
      .pipe(
        map(
          (category) => {
            console.log(category);
            return category;
          }
        )
      );
  }

  getProductCategoryById(id: number) {
    const url = `http://localhost:8005/ECommerce/productCategory-api/ProductCategories/${id}`;
    return this.httpClient.get<ProductCategory[]>(url)
      .pipe(
        map(
          (category) => {
            console.log(category);
            return category;
          }
        )
      );
  }
}
