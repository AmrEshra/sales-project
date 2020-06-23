import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MessageService, ConfirmationService } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { PanelMenuModule } from 'primeng/panelmenu';
import { UiSwitchModule } from 'ngx-toggle-switch';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import {MultiSelectModule} from 'primeng/multiselect';
import { StepsModule } from 'primeng/steps';
import { TabViewModule } from 'primeng/tabview';
import 'zone.js/dist/zone';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

/* Any New Component should be imported here */
import { AppComponent } from './app.component';
import { SalesPersonListComponent } from './sales-person-list/sales-person-list.component';
import { ProductListComponent } from './product-list/product-list.component';

/* Any New Services should be imported here */
import {ProductService} from './product-list/product.service';
import { TranslateService } from '@ngx-translate/core';


@NgModule({
  declarations: [
    AppComponent,
    SalesPersonListComponent,
    ProductListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MultiSelectModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    FormsModule,
    ButtonModule,
    TableModule,
    UiSwitchModule,
    BrowserAnimationsModule,
    TableModule,
    PanelMenuModule,
    DialogModule,
    MessagesModule,
    ToastModule,
    DropdownModule,
    NgxSpinnerModule,
    StepsModule,
    TabViewModule,
    ConfirmDialogModule
  ],
  providers: [
    TranslateService,
    MessageService,
    ConfirmationService,
    ProductService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}
