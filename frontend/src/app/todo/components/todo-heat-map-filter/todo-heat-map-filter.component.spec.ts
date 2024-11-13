import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoHeatMapFilterComponent } from './todo-heat-map-filter.component';

describe('TodoHeatMapFilterComponent', () => {
  let component: TodoHeatMapFilterComponent;
  let fixture: ComponentFixture<TodoHeatMapFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoHeatMapFilterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoHeatMapFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
