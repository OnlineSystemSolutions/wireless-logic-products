import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductListingComponent } from './component/product-listing/product-listing.component';
import { ProductService } from './service/product.service';
import { HttpClientModule } from '@angular/common/http';
import { BusyIndicatorComponent } from './component/presentation/busy-indicator/busy-indicator.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductListingComponent,
    BusyIndicatorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    ProductService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
