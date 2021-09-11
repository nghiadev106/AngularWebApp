import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { first } from 'rxjs/operators';
import { CartService } from 'src/app/core/services/cart.service';
import { CategoryService } from 'src/app/core/services/category.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { ProductService } from 'src/app/core/services/product.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
  providers: [MessageService],
})
export class ShopComponent implements OnInit {
  constructor(
    private readonly productService: ProductService,
    private readonly categoryService: CategoryService,
    private readonly cartService: CartService,
    private readonly notificationService: NotificationService
  ) { }
  lstProducts: any;
  lstCategories: any;
  lstHotProduct:any;
  public baseFolder = environment.BASE_API;
  ngOnInit(): void {
    this.GetListProduct();
    this.GetListCategories();
    this.GetHotProduct();
  }

  GetListProduct() {
    this.productService
      .GetShop()
      .pipe(first())
      .subscribe((products) => {
        //console.log(products);
        this.lstProducts = products;
      });
  }

  GetListCategories(){
    this.categoryService
      .GetCategory()
      .pipe(first())
      .subscribe((res) => {
        //console.log(products);
        this.lstCategories = res;
      });
  }

  GetHotProduct() {
    this.productService
      .GetHotProduct()
      .pipe(first())
      .subscribe((products) => {
        //console.log(products);
        this.lstHotProduct = products;
      });
  }

  addToCart(product: any): void {
    this.cartService.addToCart(product);
    this.notificationService.printSuccessMessage('Thêm giỏ hàng thành công');
  }

}
