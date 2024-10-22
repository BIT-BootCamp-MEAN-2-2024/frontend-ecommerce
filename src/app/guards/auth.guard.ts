import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { catchError, tap } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject( AuthService );
  const router = inject ( Router );

  return authService.verifyUser()
    .pipe(
      tap( data => {
        console.log( data );
      
        if ( ! data )
          router.navigateByUrl( 'home' );

      })
    );
};
