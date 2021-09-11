import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { MessageService } from 'primeng/api';
import { map, switchMap, first } from 'rxjs/operators';
import { CartService } from 'src/app/core/services/cart.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { ProductService } from 'src/app/core/services/product.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product: any;
  lstHotProduct:any;
  productId!: number;
  Quantity: number = 1;
  imageUrl!: string;
  public baseFolder = environment.BASE_API;
  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private readonly cartService: CartService,
    private readonly notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.productId = params["id"];
      this.loadProductDetail(this.productId);
    });

  }
  incrementQuantity() {
    this.Quantity++;
  }
  loadProductDetail(productId: number) {
    this.productService
      .GetById(productId)
      .pipe(first())
      .subscribe((res) => {
        this.product = res;
        console.log(this.product);
      });
  }

  addToCart(product: any, Quantity: any) {
    console.log(this.Quantity);
    var pro = {
      ID: product.ID,
      ThumbnailImage: product.ThumbnailImage,
      Name: product.Name,
      Price: product.Price,
      PromotionPrice: product.PromotionPrice,
    };
    this.cartService.addToCart(pro, parseInt(Quantity));
    this.notificationService.printSuccessMessage('Thêm giỏ hàng thành công');
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

}
