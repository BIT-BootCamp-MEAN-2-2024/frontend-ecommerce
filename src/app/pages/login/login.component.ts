import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ ReactiveFormsModule ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  formData!: FormGroup;

  constructor( private authService: AuthService ) {
    this.formData = new FormGroup({
      username: new FormControl( '', [ Validators.required, Validators.email ] ),
      password: new FormControl( '', [ Validators.required, Validators.minLength( 8 ), Validators.maxLength( 20 ) ] )
    });
  }

  handleSubmit() {
    if( this.formData.valid ) {
      console.log(this.formData.value);
      this.authService.loginUser( this.formData.value ).subscribe( function( data ) {
        console.log( data );
      });
    }
  }
}
