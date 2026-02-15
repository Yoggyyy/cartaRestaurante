import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IDish } from '../interfaces/i-dish';

@Component({
  selector: 'dish-form',
  imports: [FormsModule],
  templateUrl: './dish-form.html',
  styleUrl: './dish-form.css',
})
export class DishForm implements OnInit {
  // Si se pasa un plato, es edición; si no, es creación
  @Input() dish: IDish | null = null;
  @Output() saved = new EventEmitter<IDish>();
  @Output() cancelled = new EventEmitter<void>();

  // Propiedades del formulario
  name = '';
  description = '';
  price: number = 0;
  category = '';
  image = '';
  enabled = true;

  // Categorías disponibles
  categories: string[] = ['entrantes', 'principales', 'postres', 'bebidas'];

  ngOnInit(): void {
    // Si estamos editando, rellenamos los campos con los datos del plato
    if (this.dish) {
      this.name = this.dish.name;
      this.description = this.dish.description;
      this.price = this.dish.price;
      this.category = this.dish.category;
      this.image = this.dish.image;
      this.enabled = this.dish.enabled;
    }
  }

  // Envía el formulario
  onSubmit(): void {
    const dishData: IDish = {
      id: this.dish ? this.dish.id : 0,
      name: this.name,
      description: this.description,
      price: this.price,
      category: this.category,
      image: this.image,
      enabled: this.enabled,
    };
    this.saved.emit(dishData);
  }

  // Cancela la edición/creación
  onCancel(): void {
    this.cancelled.emit();
  }
}
