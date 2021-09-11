import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class CartService {
  private productsCart = new BehaviorSubject<any[]>([]);
  local_storage!: any;
  products$ = this.productsCart.asObservable();

  constructor() {
    let carts = localStorage.getItem('carts');
    if (carts) {
      this.local_storage = JSON.parse(carts);
    }

    if (!this.local_storage) this.local_storage = [];
    this.productsCart.next(this.local_storage);
  }
  addToCart(product: any, Quantity: number = 1): void {
    product.Quantity = Quantity;
    let local_storage: any[] = [];
    if (localStorage.getItem('carts') == null) {
      local_storage.push(product);
    } else {
      let carts = localStorage.getItem('carts');
      if (carts) {
        local_storage = JSON.parse(carts);
      }

      let checkProduct: boolean = true;
      for (let p of local_storage) {
        if (p.ID == product.ID) {
          checkProduct = false;
          p.Quantity += Quantity;
          break;
        }
      }
      if (checkProduct) local_storage.push(product);
    }
    localStorage.setItem('carts', JSON.stringify(local_storage));
    this.productsCart.next(local_storage);
  }
  getProducts(): any[] {
    let local_storage = localStorage.getItem('carts');
    return local_storage == null ? [] : JSON.parse(local_storage);
  }
  deleteProduct(id: number) {
    let local_storage = this.getProducts().filter((p) => p.ID != id);
    localStorage.setItem('carts', JSON.stringify(local_storage));
    this.productsCart.next(local_storage);
  }

  updateProduct(id: number, Quantity: number) {
    let products = localStorage.getItem('carts');
    if (products) {
      let lstproducts = JSON.parse(products);
      for (let p of lstproducts) {
        if (p.ID == id) {
          p.Quantity = Quantity;
          break;
        }
      }
      localStorage.setItem('carts', JSON.stringify(lstproducts));
      this.productsCart.next(lstproducts);
    }
  }

  clearCart() {
    localStorage.removeItem('carts');
    this.productsCart.next([]);
  }
}
