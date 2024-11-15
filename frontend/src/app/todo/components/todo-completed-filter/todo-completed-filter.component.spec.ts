import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoCompletedFilterComponent } from './todo-completed-filter.component';

describe('TodoCompletedFilterComponent', () => {
  let component: TodoCompletedFilterComponent;
  let fixture: ComponentFixture<TodoCompletedFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoCompletedFilterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoCompletedFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
