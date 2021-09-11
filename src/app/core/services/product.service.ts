import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { first, map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private API_URL = environment.BASE_API+"/api";
  private productsSearch = new BehaviorSubject<any>([]);
  products$ = this.productsSearch.asObservable();
  constructor(private readonly http: HttpClient) { }

  Search(pageIndex: number, pageSize: number, keyword: string,sort:string){
    let url = this.API_URL +
      "/client/search?page=" +
      pageIndex +
      "&pageSize=" +
      pageSize +
      "&keyword=" +
      keyword +
      "&sort=" +
      sort;
    return this.http.get<any>(url).pipe(first())
      .subscribe((res) => {
        this.productsSearch.next(res);
      });;
  }

  GetShop() {
    const url = `${this.API_URL}/client/get-shop`;
    return this.http.get(url);
  }

  GetById(id: number) {
    const url = `${this.API_URL}/client/detail/${id}`;
    return this.http.get(url);
  }

  GetLastestProduct(){
    const url = `${this.API_URL}/client/get-lastest`;
    return this.http.get(url);
  }

  GetHotProduct() {
    const url = `${this.API_URL}/client/get-hot-product`;
    return this.http.get(url);
  }

  GetReatedProduct(id: number) {
    const url = `${this.API_URL}/client/get-reated-products/${id}`;
    return this.http.get(url);
  }

  GetByCategoryId(id: number) {
    const url = `${this.API_URL}/client/get-by-categoryId/${id}`;
    return this.http.get(url);
  }

}
