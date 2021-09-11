import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './main/login/login.component';
import { RegisterComponent } from './main/register/register.component';
import { ProductCategoryComponent } from './main/product/product-category/product-category.component';
import { ProductDetailComponent } from './main/product/product-detail/product-detail.component';
import { ShopComponent } from './main/shop/shop.component';
import { CartComponent } from './main/cart/cart.component';
import { HomeComponent } from './main/home/home.component';
import { ContactComponent } from './main/contact/contact.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { ProductService } from './core/services/product.service';
import { HttpClientModule } from '@angular/common/http';

import { ToastModule } from 'primeng/toast';
import { FormsModule } from "@angular/forms";
import { SearchComponent } from './main/search/search.component';
import { NotificationService } from './core/services/notification.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ProductCategoryComponent,
    ProductDetailComponent,
    ShopComponent,
    CartComponent,
    HomeComponent,
    ContactComponent,
    HeaderComponent,
    FooterComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ToastModule,
    FormsModule
  ],
  providers: [ProductService, NotificationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
