import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor( private http: HttpClient ) { }

  getCategories() {
    return this.http.get<any>( 'http://localhost:3000/api/categories' );
  }
}
