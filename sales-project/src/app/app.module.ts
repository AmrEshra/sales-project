import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

/* Any New Component should be imported here */
import { AppComponent } from './app.component';
import { SalesPersonListComponent } from './sales-person-list/sales-person-list.component';
import { ProductListComponent } from './product-list/product-list.component';

/* Any New Services should be imported here */
import {ProductService} from './product-list/product.service';

@NgModule({
  declarations: [
    /* Add the declaration of Components */
    AppComponent,
    SalesPersonListComponent,
    ProductListComponent
  ],
  imports: [
    /* Add the angular modules */
    BrowserModule,
    HttpClientModule
  ],

  /* Add the service providers */
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
