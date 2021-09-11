import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private API_URL = environment.BASE_API + "/api";
  constructor(private readonly http: HttpClient) { }

  GetCategory() {
    const url = `${this.API_URL}/client/get-category`;
    return this.http.get(url);
  }
}
