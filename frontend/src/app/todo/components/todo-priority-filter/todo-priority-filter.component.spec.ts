import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoPriorityFilterComponent } from './todo-priority-filter.component';

describe('TodoPriorityFilterComponent', () => {
  let component: TodoPriorityFilterComponent;
  let fixture: ComponentFixture<TodoPriorityFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoPriorityFilterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoPriorityFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
