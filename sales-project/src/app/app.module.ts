import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import 'zone.js/dist/zone';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

/* Any New Component should be imported here */
import { AppComponent } from './app.component';
import { SalesPersonListComponent } from './sales-person-list/sales-person-list.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductCategoryListComponent } from './product-category-list/product-category-list.component';
import { SearchComponent } from './search/search.component';

/* Any New Services should be imported here */
import {ProductService} from './services/product.service';
import {ProductCategoryService} from './services/product-category.service';
import {TranslateService} from '@ngx-translate/core';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CartStatusComponent } from './cart-status/cart-status.component';
import { CartDetailsComponent } from './cart-details/cart-details.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { HeaderInterceptor } from './interceptors/header.interceptor';
import { AuthenticationService } from './services/authentication.service';
import { ResponseInterceptor } from './interceptors/response.interceptor';

export function generateToken(authenticationService: AuthenticationService) {
  return () => authenticationService.generateToken();
}

@NgModule({
  declarations: [
    AppComponent,
    SalesPersonListComponent,
    ProductListComponent,
    ProductCategoryListComponent,
    SearchComponent,
    ProductDetailsComponent,
    CartStatusComponent,
    CartDetailsComponent,
    CheckoutComponent
    ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    FormsModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    NgbModule
  ],
  providers: [
    TranslateService,
    ProductService,
    ProductCategoryService,
    { provide: HTTP_INTERCEPTORS, useClass: HeaderInterceptor, multi: true},
  //  { provide: HTTP_INTERCEPTORS, useClass: ResponseInterceptor, multi: true},
    { provide: APP_INITIALIZER, useFactory: generateToken, deps: [AuthenticationService], multi: true },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}
