import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { CartService } from 'src/app/core/services/cart.service';
import { CategoryService } from 'src/app/core/services/category.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { ProductService } from 'src/app/core/services/product.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  lstProducts: any;
  lstCategories: any;
  lstHotProduct: any;
  public baseFolder = environment.BASE_API;
  constructor(private readonly productService: ProductService,
    private readonly categoryService: CategoryService,
    private readonly cartService: CartService,
    private readonly notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.loadCart();
    this.GetListCategories();
    this.GetHotProduct();
  }
  loadCart() {
    this.productService.products$.subscribe((res) => {
      this.lstProducts = res;
    });
  }
  GetListCategories() {
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
