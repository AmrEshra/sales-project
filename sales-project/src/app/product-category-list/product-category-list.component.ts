import { Component, OnInit } from '@angular/core';
import { ProductCategory } from '../modules/productCategory';
import { ProductCategoryService } from '../services/product-category.service';

@Component({
  selector: 'app-product-category-list',
  templateUrl: './product-category-list.component.html',
  styleUrls: ['./product-category-list.component.css']
})
export class ProductCategoryListComponent implements OnInit {

  categories: ProductCategory[];
  constructor(private productCategoryService: ProductCategoryService) { }

  ngOnInit(): void {
    this.listCategories();
  }

  listCategories() {
    this.productCategoryService.getProductCategoriesList().subscribe(
      (data: any) => {
        this.categories = data;
      }
    );
  }

}
