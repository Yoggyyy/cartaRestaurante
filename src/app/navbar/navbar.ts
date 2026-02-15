import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth';

@Component({
  selector: 'navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  constructor(
    public authService: AuthService,
    private router: Router
  ) {}

  // Cierra la sesión y redirige a la página de inicio
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/home']);
  }
}
