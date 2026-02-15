import { Component, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth';

@Component({
  selector: 'login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  username = '';
  password = '';
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  // Envía el formulario de login
  onSubmit(): void {
    this.errorMessage = '';

    if (!this.username || !this.password) {
      this.errorMessage = 'Debes rellenar todos los campos.';
      return;
    }

    this.authService.login(this.username, this.password).subscribe({
      next: (user) => {
        // Si es chef, redirigir a gestión; si no, a la carta
        if (user.role === 'chef') {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/menu']);
        }
      },
      error: (err: Error) => {
        this.errorMessage = err.message;
        this.cdr.detectChanges();
      },
    });
  }
}
