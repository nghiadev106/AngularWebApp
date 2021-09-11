import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/core/services/cart.service';
import { ProductService } from 'src/app/core/services/product.service';
import { MessageService } from 'primeng/api';
import { first } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [MessageService],
})
export class HomeComponent implements OnInit {
  constructor(
    private readonly productService: ProductService,
    private readonly cartService: CartService,
    private readonly notificationService: NotificationService
  ) { }
  lstLastestProducts: any;
  lstHotProduct:any;
  public baseFolder = environment.BASE_API ;
  ngOnInit(): void {
    this.GetLastestProduct();
    this.GetHotProduct();
  }

  GetLastestProduct(){
    this.productService
      .GetLastestProduct()
      .pipe(first())
      .subscribe((products) => {
        //console.log(products);
        this.lstLastestProducts = products;
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
