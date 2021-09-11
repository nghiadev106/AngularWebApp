import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};
@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  private API_URL = environment.BASE_API;
  constructor(private readonly http: HttpClient) {}
  checkout(order: any): Observable<number> {
    const url = `${this.API_URL}/api/client/create-order`;
    var orderString = JSON.stringify(order);
    return this.http.post<any>(url, orderString, httpOptions);
  }
}
