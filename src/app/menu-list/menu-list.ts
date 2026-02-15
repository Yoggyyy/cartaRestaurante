import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IDish } from '../interfaces/i-dish';
import { DishService } from '../services/dish';
import { DishItem } from '../dish-item/dish-item';

@Component({
  selector: 'menu-list',
  imports: [FormsModule, DishItem],
  templateUrl: './menu-list.html',
  styleUrl: './menu-list.css',
})
export class MenuList implements OnInit {
  dishes: IDish[] = [];
  filterCategory = '';
  sortOrder = '';

  // Categorías disponibles para filtrar
  categories: string[] = [];

  constructor(
    private dishService: DishService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.dishService.getDishes().subscribe((dishes) => {
      // Solo mostramos los platos habilitados en la carta
      this.dishes = dishes.filter((dish) => dish.enabled);
      // Extraemos las categorías únicas
      this.categories = [...new Set(this.dishes.map((dish) => dish.category))];
      // Notificamos a Angular que los datos han cambiado
      this.cdr.detectChanges();
    });
  }

  // Devuelve los platos ordenados según el criterio seleccionado
  get sortedDishes(): IDish[] {
    const filtered = this.filterCategory
      ? this.dishes.filter(
          (d) => d.category.toLocaleLowerCase() === this.filterCategory.toLocaleLowerCase()
        )
      : [...this.dishes];

    if (this.sortOrder === 'price-asc') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (this.sortOrder === 'price-desc') {
      filtered.sort((a, b) => b.price - a.price);
    }

    return filtered;
  }
}
