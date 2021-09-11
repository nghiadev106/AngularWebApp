import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './main/cart/cart.component';
import { ContactComponent } from './main/contact/contact.component';
import { HomeComponent } from './main/home/home.component';
import { LoginComponent } from './main/login/login.component';
import { ProductCategoryComponent } from './main/product/product-category/product-category.component';
import { ProductDetailComponent } from './main/product/product-detail/product-detail.component';
import { SearchComponent } from './main/search/search.component';
import { ShopComponent } from './main/shop/shop.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },{
    path: 'shop',
    component: ShopComponent,
  },
  {
    path: 'product/:alias/:id',
    component: ProductDetailComponent,
  },
  {
    path: 'category/:alias/:id',
    component: ProductCategoryComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'cart',
    component: CartComponent,
  },
  {
    path: 'contact',
    component: ContactComponent,
  },
  {
    path: 'search',
    component: SearchComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
