import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DishItem } from './dish-item';

describe('DishItem', () => {
  let component: DishItem;
  let fixture: ComponentFixture<DishItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DishItem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DishItem);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
