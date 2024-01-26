import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  formData: any;
   private apiUrl = "https://fakestoreapi.com/products";

  constructor(private http:HttpClient) { }

  product(){
    return this.http.get('https://fakestoreapi.com/products')
  }

  delete(id:any){
    return this.http.delete('https://fakestoreapi.com/product' +id)
  }

  editProduct(id:any,formData:any): Observable<any>{
    return this.http.put('https://fakestoreapi.com/products/${id}`', formData)

  }

  getPaginationData(skip: number, limit: number): Observable<any> {
    //for skip users records
     let params = new HttpParams();
     params = params.set('skip', skip.toString());
     params = params.set('limit', limit.toString());
 
     return this.http.get(this.apiUrl, { params });
   }
}
