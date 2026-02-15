import { Pipe, PipeTransform } from '@angular/core';
import { IDish } from '../interfaces/i-dish';

@Pipe({
  name: 'dishFilter',
})
export class DishFilterPipe implements PipeTransform {
  // Filtra los platos por categoría
  // Si no se indica categoría, devuelve todos los platos
  transform(dishes: IDish[], category: string): IDish[] {
    if (!category || category === '') {
      return dishes;
    }
    return dishes.filter(
      (dish) => dish.category.toLocaleLowerCase() === category.toLocaleLowerCase()
    );
  }
}
