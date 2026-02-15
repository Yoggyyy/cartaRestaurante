import { Component, Input } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { IDish } from '../interfaces/i-dish';

@Component({
  selector: 'dish-item',
  imports: [CurrencyPipe],
  templateUrl: './dish-item.html',
  styleUrl: './dish-item.css',
})
export class DishItem {
  @Input() dish!: IDish;
}
