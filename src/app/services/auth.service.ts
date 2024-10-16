import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { User } from '../interfaces/user';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  /** Forma anterior a la version Angular 16 */
  constructor( private http: HttpClient ) { }

  registerUser ( newUser: User ): Observable<Response> {
    return this.http.post<Response>( 'http://localhost:3000/api/auth/register', newUser );
  }

  loginUser( credencials: User ): Observable<Response> {
    return this.http.post<Response>( 'http://localhost:3000/api/auth/login', credencials );
  }
}
