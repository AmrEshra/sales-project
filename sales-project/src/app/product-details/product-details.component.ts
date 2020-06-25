import { Component, OnInit } from '@angular/core';
import { Product } from '../modules/product';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product: Product = new Product();

  constructor(private productService: ProductService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.getProductDetails();
    });
  }

  getProductDetails() {

      const id: number = +this.route.snapshot.paramMap.get('id');
      this.productService.getProductById(id).subscribe(
        data => {
          this.product = data;
        }
      );
    }

}
