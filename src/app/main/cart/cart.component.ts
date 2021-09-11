import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { CartService } from 'src/app/core/services/cart.service';
import { CheckoutService } from 'src/app/core/services/checkout.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  isCheckout:boolean=false;
  isCheckoutSuccess!: boolean;
  public entity: any = { Status: true };
  products: any[] = [];
  totalMoney!: number;
  public orderDetails: any[] = [];
  public baseFolder = environment.BASE_API;
  constructor(
    private readonly cartService: CartService,
    private readonly checkoutService: CheckoutService,
    private router: Router,
    private readonly notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.loadCart();
    this.isCheckoutSuccess=false;
  }
  loadCart(){
    this.cartService.products$.subscribe((res) => {
      this.products = res;
      this.totalMoney = 0;
      for (let p of this.products) {
        this.totalMoney += p.Quantity * p.PromotionPrice;
      }
    });
  }
  deleteProduct(id: number): void {
    this.cartService.deleteProduct(id);

  }

  updateProduct(id: number, Quantity: number): void {
    if (Quantity > 0) {
       this.cartService.updateProduct(id, Quantity);
    }
  }

  showCheckout(){
    this.isCheckout=true;
  }


  public Checkout(valid: boolean | null) {
    var order = {
      CustomerName: this.entity.CustomerName,
      CustomerAddress: this.entity.CustomerAddress,
      CustomerEmail: this.entity.CustomerEmail,
      CustomerMobile: this.entity.CustomerMobile,
      CustomerMessage: this.entity.CustomerMessage,
      PaymentMethod: this.entity.PaymentMethod,
      orderDetails: JSON.stringify(this.products),
    };

    this.checkoutService
      .checkout(order)
      .pipe(first())
      .subscribe((res) => {
        if (res > 0) {
          this.isCheckout = false;
          this.isCheckoutSuccess=true;
          this.entity={};
          this.cartService.clearCart();
          this.notificationService.printSuccessMessage('Thanh toán thành công');
        }
      });
  }
}
