import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { first } from 'rxjs/operators';
import { CartService } from 'src/app/core/services/cart.service';
import { CategoryService } from 'src/app/core/services/category.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { ProductService } from 'src/app/core/services/product.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.css']
})
export class ProductCategoryComponent implements OnInit {
  lstProducts: any;
  lstHotProduct: any;
  lstCategories: any;
  categoryId!: number;
  Quantity: number = 1;
  imageUrl!: string;
  public baseFolder = environment.BASE_API;
  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private readonly cartService: CartService,
    private readonly categoryService: CategoryService,
    private readonly notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.categoryId = params["id"];
      this.loadProductCategory(this.categoryId);
    });

  }
  loadProductCategory(categoryId: number) {
    this.productService
      .GetByCategoryId(categoryId)
      .pipe(first())
      .subscribe((res) => {
        this.lstProducts = res;
      });
  }
  addToCart(product: any): void {
    this.cartService.addToCart(product);
    this.notificationService.printSuccessMessage('Thêm giỏ hàng thành công');
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
        this.lstHotProduct = products;
      });
  }


}


