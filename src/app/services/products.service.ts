import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor( private http: HttpClient ) { }

  getProducts() {
    return this.http.get<any>( 'http://localhost:3000/api/products' );
  }

  registerProduct( newProduct: any ) {

    const token = localStorage.getItem( 'token' ) || '';
    const headers = new HttpHeaders().set( 'X-Token', token );

    return this.http.post( 'http://localhost:3000/api/products', newProduct, { headers } )
  }

}