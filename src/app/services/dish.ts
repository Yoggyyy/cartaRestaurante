import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IDish } from '../interfaces/i-dish';

@Injectable({
  providedIn: 'root',
})
export class DishService {
  private dishesEndpoint = 'http://localhost:3000/dishes';

  constructor(private http: HttpClient) {}

  // Obtiene todos los platos
  // GET /dishes
  getDishes(): Observable<IDish[]> {
    return this.http
      .get<IDish[]>(this.dishesEndpoint)
      .pipe(
        catchError((resp: HttpErrorResponse) =>
          throwError(
            () =>
              new Error(
                `Error obteniendo platos. Código: ${resp.status}. Mensaje: ${resp.message}`
              )
          )
        )
      );
  }

  // Obtiene un plato por su id
  // GET /dishes/:id
  getDish(id: number): Observable<IDish> {
    return this.http
      .get<IDish>(`${this.dishesEndpoint}/${id}`)
      .pipe(
        catchError((resp: HttpErrorResponse) =>
          throwError(
            () =>
              new Error(
                `Error obteniendo plato. Código: ${resp.status}. Mensaje: ${resp.message}`
              )
          )
        )
      );
  }

  // Añade un nuevo plato (sin enviar id, json-server lo genera)
  // POST /dishes
  addDish(dish: IDish): Observable<IDish> {
    const { id, ...dishWithoutId } = dish;
    return this.http
      .post<IDish>(this.dishesEndpoint, dishWithoutId)
      .pipe(
        catchError((resp: HttpErrorResponse) =>
          throwError(
            () =>
              new Error(
                `Error creando plato. Código: ${resp.status}. Mensaje: ${resp.message}`
              )
          )
        )
      );
  }

  // Actualiza un plato completo
  // PUT /dishes/:id
  updateDish(dish: IDish): Observable<IDish> {
    return this.http
      .put<IDish>(`${this.dishesEndpoint}/${dish.id}`, dish)
      .pipe(
        catchError((resp: HttpErrorResponse) =>
          throwError(
            () =>
              new Error(
                `Error actualizando plato. Código: ${resp.status}. Mensaje: ${resp.message}`
              )
          )
        )
      );
  }

  // Habilita o deshabilita un plato
  // PATCH /dishes/:id { enabled: boolean }
  toggleEnabled(id: number, enabled: boolean): Observable<IDish> {
    return this.http
      .patch<IDish>(`${this.dishesEndpoint}/${id}`, { enabled })
      .pipe(
        catchError((resp: HttpErrorResponse) =>
          throwError(
            () =>
              new Error(
                `Error cambiando estado del plato. Código: ${resp.status}. Mensaje: ${resp.message}`
              )
          )
        )
      );
  }

  // Elimina un plato
  // DELETE /dishes/:id
  deleteDish(id: number): Observable<void> {
    return this.http
      .delete<void>(`${this.dishesEndpoint}/${id}`)
      .pipe(
        catchError((resp: HttpErrorResponse) =>
          throwError(
            () =>
              new Error(
                `Error eliminando plato. Código: ${resp.status}. Mensaje: ${resp.message}`
              )
          )
        )
      );
  }
}
