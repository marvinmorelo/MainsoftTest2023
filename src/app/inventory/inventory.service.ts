import { Injectable } from '@angular/core';
import { Product } from '../shared/models/product-model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InventoryService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    const productsUrl = `${this.apiUrl}/products`;
    return this.http.get<Product[]>(productsUrl);
  }

  getProductById(id: string): Observable<Product> {
    const productUrl = `${this.apiUrl}/products/${id}`;
    return this.http.get<Product>(productUrl);
  }

  createProduct(product: Product): Observable<Product> {
    const productsUrl = `${this.apiUrl}/products`;
    return this.http.post<Product>(productsUrl, product);
  }

  updateProduct(id: string, product: Product): Observable<Product> {
    const productUrl = `${this.apiUrl}/products/${id}`;
    return this.http.put<Product>(productUrl, product);
  }

  deleteProduct(id: string): Observable<void> {
    const productUrl = `${this.apiUrl}/products/${id}`;
    return this.http.delete<void>(productUrl);
  }
}
