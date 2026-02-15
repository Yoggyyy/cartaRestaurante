import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { IUser } from '../interfaces/i-user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private usersEndpoint = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {}

  // Inicia sesión buscando el usuario por username y comprobando la contraseña
  // GET /users?username=xxx
  login(username: string, password: string): Observable<IUser> {
    return this.http
      .get<IUser[]>(`${this.usersEndpoint}?username=${username}`)
      .pipe(
        map((users) => {
          // Comprobamos que existe el usuario y la contraseña coincide
          if (users.length === 0 || users[0].password !== password) {
            throw new Error('Usuario o contraseña incorrectos');
          }
          // Guardamos el usuario en localStorage
          localStorage.setItem('user', JSON.stringify(users[0]));
          return users[0];
        }),
        catchError((error: HttpErrorResponse | Error) => {
          if (error instanceof Error) {
            return throwError(() => error);
          }
          return throwError(
            () =>
              new Error(
                `Error en el login. Código: ${error.status}. Mensaje: ${error.message}`
              )
          );
        })
      );
  }

  // Cierra la sesión eliminando el usuario de localStorage
  logout(): void {
    localStorage.removeItem('user');
  }

  // Obtiene el usuario logueado desde localStorage
  getLoggedUser(): IUser | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  // Comprueba si hay un usuario logueado
  isLogged(): boolean {
    return this.getLoggedUser() !== null;
  }

  // Comprueba si el usuario logueado es chef
  isChef(): boolean {
    const user = this.getLoggedUser();
    return user !== null && user.role === 'chef';
  }
}
