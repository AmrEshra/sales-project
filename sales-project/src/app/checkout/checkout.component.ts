import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  checkoutFormGroup: FormGroup;
  totalPrice: number = 0.00;
  itemCount: number = 0;
  
  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private cartService: CartService) { }

  ngOnInit(): void {

    this.itemCount = +this.route.snapshot.paramMap.get('itemCount');
    this.totalPrice = +this.route.snapshot.paramMap.get('totalPrice');

    this.checkoutFormGroup = this.formBuilder.group({

      customer: this.formBuilder.group({
        firstName: [''],
        lastName: [''],
        email: ['']
      }),
      shippingAddress: this.formBuilder.group({
        country: [''],
        street: [''],
        city: [''],
        state: [''],
        zipCode: ['']
      }),
      billingAddress: this.formBuilder.group({
        country: [''],
        street: [''],
        city: [''],
        state: [''],
        zipCode: ['']
      })
    });
  }

  copyShippingAddressToBillingAddress(event){
    if(event.target.checked){
      this.checkoutFormGroup.controls.billingAddress.setValue(
        this.checkoutFormGroup.controls.shippingAddress.value
      );
    }
    else{
      this.checkoutFormGroup.controls.billingAddress.reset();
    }
  }

  onSubmit(){
    console.log(this.checkoutFormGroup.get('customer').value);

    this.cartService.purchase()
      .subscribe(
        () => {
           this.cartService.computeCartTotals(0.00, 0);
        }
      );
  }

}
