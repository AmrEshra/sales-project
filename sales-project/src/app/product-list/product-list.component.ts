import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../modules/product';
import { ActivatedRoute } from '@angular/router';
import { ProductCategory } from '../modules/productCategory';
import { ProductCategoryService } from '../services/product-category.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[];
  category: ProductCategory;

  categoryId: number = 1;
  previousCategoryId: number = 1;
  categoryName: string;
  searchMode: boolean;

  pageNumber: number = 1;
  pageSize: number = 5;
  totalElements: number = 0;

  constructor(private productService: ProductService, private productCategoryService: ProductCategoryService,
              private cartService: CartService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handelProductList();
    });
  }

  updatePageSize(size: number){
    this.pageSize = size;
    this.pageNumber = 1;
    this.listProductsByCategory();
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

        //
    // Check if we have a different category than previous
    // Note: Angular will reuse a component if it is currently being viewed
    //

    // if we have a different category id than previous
    // then set thePageNumber back to 1
    if (this.previousCategoryId != this.categoryId) {
      this.pageNumber = 1;
    }

    this.previousCategoryId = this.categoryId;

    console.log(`currentCategoryId=${this.categoryId}, thePageNumber=${this.pageNumber}`);

    this.productService.getProductsList(this.categoryId, this.pageNumber - 1, this.pageSize).subscribe(
      (data: any) => {
        this.products = data.content;
        this.pageNumber = data.number + 1;
        this.pageSize = data.size;
        this.totalElements = data.totalElements;
      }
    );
  }

  listProductsByName(keyword: string) {

    if ( keyword === '' ){
      keyword = null;
    }
    this.productService.getProductsListByName(keyword, this.pageNumber - 1, this.pageSize).subscribe(
      (data: any) => {
        this.products = data.content;
        this.pageNumber = data.number + 1;
        this.pageSize = data.size;
        this.totalElements = data.totalElements;
      }
    );
  }

  addToCart(product: Product){
    console.log(product.name);
    this.cartService.addToCart(product);
  }
}
