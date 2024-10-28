import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private token!: string;
  private headers!: HttpHeaders;

  constructor( private http: HttpClient ) { 
    this.token = localStorage.getItem( 'token' ) || '';
    this.headers = new HttpHeaders().set( 'X-Token', this.token );
  }

  getProducts() {
    return this.http.get<any>( 'http://localhost:3000/api/products' );
  }

  registerProduct( newProduct: any ) {
    return this.http.post( 'http://localhost:3000/api/products', newProduct, { headers: this.headers } )
  }

  deleteProduct( id: any ) {
    return this.http.delete( `http://localhost:3000/api/products/${ id }`, { headers: this.headers } );
  }

}