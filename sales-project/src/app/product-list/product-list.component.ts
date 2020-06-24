import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../modules/product';
import { ActivatedRoute } from '@angular/router';
import { ProductCategory } from '../modules/productCategory';
import { ProductCategoryService } from '../services/product-category.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[];
  category: ProductCategory;

  categoryId: number;
  categoryName: string;
  searchMode: boolean;

  constructor(private productService: ProductService, private productCategoryService: ProductCategoryService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handelProductList();
    });
  }

  handelProductList() {

    this.searchMode = this.route.snapshot.paramMap.has('keyword');
    if (this.searchMode) {
      this.listProductsByName(this.route.snapshot.paramMap.get('keyword'));
    } else {
      this.listProductsByCategory();
    }
  }

  listProductsByCategory() {

    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');
    if (hasCategoryId) {
      this.categoryId = +this.route.snapshot.paramMap.get('id');
      this.categoryName = this.route.snapshot.paramMap.get('name');
    } else {
      this.categoryId = 1;
      this.productCategoryService.getProductCategoryById(1).subscribe(
        (data: any) => {
          this.categoryName = data.name;
        }
      );
    }
    this.productService.getProductsList(this.categoryId).subscribe(
      (data: any) => {
        this.products = data.content;
      }
    );
  }

  listProductsByName(keyword: string) {

    if(keyword === ''){
      keyword = null;
    }
    this.productService.getProductsListByName(keyword).subscribe(
      data => {
        this.products = data;
      }
    );
  }

}
