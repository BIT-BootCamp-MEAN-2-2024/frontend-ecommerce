import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ ReactiveFormsModule ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  formData!: FormGroup;
  message: string|undefined;
  subscribe!: Subscription

  constructor( 
    private authService: AuthService,
    private router: Router
  ) {
    this.formData = new FormGroup({
      username: new FormControl( '', [ Validators.required, Validators.email ] ),
      password: new FormControl( '', [ Validators.required, Validators.minLength( 8 ), Validators.maxLength( 20 ) ] )
    });

    console.log( 
      'Constructor'
    )
  }

  handleSubmit() {
    if( this.formData.valid ) {
      console.log(this.formData.value);
      this.subscribe = this.authService.loginUser( this.formData.value ).subscribe( ( data ) => {
        console.log( data );

        if ( typeof data === 'string' ) {
          this.message = data;
        } else {
          this.message = 'Ingresando al sistema...';

          setTimeout( () => {
            this.router.navigateByUrl( 'dashboard' );   // Redireccionamos al dashboard
          }, 4000 );
        }

        /** Ocultamos los mensajes que se visualizan en el formulario */
        setTimeout( () => {
          this.message = '';
        }, 2000 );

      });

      this.formData.reset();
    }
  }

  ngOnDestroy() {
    if( this.subscribe ) {
      this.subscribe.unsubscribe();
      console.log( 'Destruye el componente pero antes desubcribe el observable' )
    }

    console.log( 'ngOnDestroy' );
  }

  ngDoCheck() {
    console.log( 'ngDoCheck' );
  }

  ngAfterViewInit() {
    console.log( 'ngAfterViewInit' );
  }

  ngAfterViewChecked() {
    console.log( 'ngAfterViewChecked' );
  }

  ngAfterContentChecked() {
    console.log( 'ngAfterContentChecked' );
  }

  ngAfterContentInit() {
    console.log( 'ngAfterContentInit' );
  }

  ngOnChanges() {
    console.log( 'ngOnChanges' );
  }

  ngOnInit() {
    console.log( 'ngOnInit' );
  }
}
