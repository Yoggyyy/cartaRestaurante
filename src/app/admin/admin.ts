import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { IDish } from '../interfaces/i-dish';
import { DishService } from '../services/dish';
import { DishForm } from '../dish-form/dish-form';

@Component({
  selector: 'admin',
  imports: [CurrencyPipe, DishForm],
  templateUrl: './admin.html',
  styleUrl: './admin.css',
})
export class Admin implements OnInit {
  dishes: IDish[] = [];
  showForm = false;
  editingDish: IDish | null = null;

  constructor(
    private dishService: DishService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadDishes();
  }

  // Carga todos los platos (incluidos los deshabilitados)
  loadDishes(): void {
    this.dishService.getDishes().subscribe((dishes) => {
      this.dishes = dishes;
      this.cdr.detectChanges();
    });
  }

  // Muestra el formulario para crear un nuevo plato
  showCreateForm(): void {
    // Destruimos el formulario anterior si existía
    this.showForm = false;
    this.editingDish = null;
    this.cdr.detectChanges();

    // Esperamos un ciclo para que Angular destruya el componente y creamos uno nuevo
    setTimeout(() => {
      this.showForm = true;
      this.cdr.detectChanges();
    });
  }

  // Muestra el formulario para editar un plato existente
  showEditForm(dish: IDish): void {
    // Destruimos el formulario anterior si existía
    this.showForm = false;
    this.editingDish = null;
    this.cdr.detectChanges();

    // Esperamos un ciclo para que Angular destruya el componente y creamos uno nuevo con los datos
    setTimeout(() => {
      this.editingDish = dish;
      this.showForm = true;
      this.cdr.detectChanges();
    });
  }

  // Guarda un plato (crear o actualizar)
  saveDish(dish: IDish): void {
    if (this.editingDish) {
      // Edición: actualizamos el plato
      this.dishService.updateDish(dish).subscribe(() => {
        this.showForm = false;
        this.editingDish = null;
        this.cdr.detectChanges();
        this.loadDishes();
      });
    } else {
      // Creación: añadimos el plato y cerramos el formulario
      this.dishService.addDish(dish).subscribe(() => {
        this.showForm = false;
        this.cdr.detectChanges();
        this.loadDishes();
      });
    }
  }

  // Cancela el formulario
  cancelForm(): void {
    this.showForm = false;
    this.editingDish = null;
    this.cdr.detectChanges();
  }

  // Habilita o deshabilita un plato
  toggleEnabled(dish: IDish): void {
    this.dishService.toggleEnabled(dish.id, !dish.enabled).subscribe(() => {
      this.loadDishes();
    });
  }

  // Elimina un plato con confirmación
  deleteDish(dish: IDish): void {
    if (confirm(`¿Estás seguro de que quieres eliminar "${dish.name}"?`)) {
      this.dishService.deleteDish(dish.id).subscribe(() => {
        this.loadDishes();
      });
    }
  }
}
