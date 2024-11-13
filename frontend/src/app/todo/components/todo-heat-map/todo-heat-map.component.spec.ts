import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoHeatMapComponent } from './todo-heat-map.component';

describe('TodoHeatMapComponent', () => {
  let component: TodoHeatMapComponent;
  let fixture: ComponentFixture<TodoHeatMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoHeatMapComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoHeatMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
