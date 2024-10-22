import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../interfaces/user';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  
  constructor( 
    private authService: AuthService,
    private router: Router 
  ) {}

  /** Getters */
  get userData(): User | null {
    // Obtenemos datos del usuario autenticado
    return this.authService.userData;  
  }

  logout() {
    this.authService.logoutUser().subscribe( data => {
      this.router.navigateByUrl( 'login' );
    } );
  }
}
