import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, tap, map, catchError, of } from 'rxjs';

import { User } from '../interfaces/user';
import { Response } from '../interfaces/response';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  /** Forma anterior a la version Angular 16 */
  constructor( private http: HttpClient ) { }

  registerUser ( newUser: User ): Observable<string|undefined> {
    return this.http.post<Response>( 'http://localhost:3000/api/auth/register', newUser )
      .pipe(
        tap( ( data ) => {
          console.log( data );
        }),
        map( ( data ) => {
          if( ! data.ok )
            return data.msg;

          return 'Registro realizado con éxitosamente';
        } ),
        catchError( error => of ( 'Error en el servidor' ) )
      );
  }

  loginUser( credencials: User ): Observable<string|boolean|undefined> {
    return this.http.post<Response>( 'http://localhost:3000/api/auth/login', credencials )
      .pipe(
        tap( data => {

          if( data.token )
            localStorage.setItem( 'token', data.token );      // Guarda el Token en el LocalStorage del Navegador
          
        }),
        map( data => {
          if( ! data.ok ) {
            return data.msg;
          }
            
          return data.ok;
        }),
        catchError( error => of ( 'Error en el servidor' ) )
      );
  }
}
