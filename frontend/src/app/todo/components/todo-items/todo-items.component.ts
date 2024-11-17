import { Component, DestroyRef, inject, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { Priority, TodoRecord } from '@app/todo/model/todo';
import { combineLatest, debounceTime, delay, filter, map, of, startWith, switchMap } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators as NgxValidator, Editor,Toolbar  } from 'ngx-editor';
import { TodoItemService } from '@app/todo/services/todo-item.service';
import { TodoService } from '@app/todo/services/todo.service';

@Component({
  selector: 'app-todo-items',
  templateUrl: './todo-items.component.html',
  styleUrl: './todo-items.component.scss',
  encapsulation: ViewEncapsulation.None 
})
export class TodoItemsComponent implements OnInit, OnDestroy {

  todoItem!: TodoRecord

  editor!: Editor
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];

  formGroup = new FormGroup({
    title: new FormControl(""),
    description: new FormControl(""),
    is_completed: new FormControl(false),
    priority: new FormControl("NORMAL")
  });
  
  private readonly services = {
    activatedRouter: inject(ActivatedRoute),
    destryoRef: inject(DestroyRef),
    todoItemService: inject(TodoService)
  }

  ngOnInit(): void {
    this.setUpTodoItem()
    this.editor = new Editor()
    this.handleSave()
  }

  ngOnDestroy(): void {
    this.editor.destroy()
  }

  setPriority(priority: string) {
    this.formGroup.patchValue({
      priority: priority
    })
  }

  get isCompleted() {
    return this.formGroup.value.is_completed ?? false
  }

  handleToggleCompleted() {
    this.formGroup.patchValue({
      is_completed :  !this.isCompleted
    })
  }

  private setUpTodoItem() {
    const { activatedRouter, destryoRef } = this.services
    activatedRouter.data
      .pipe(
        takeUntilDestroyed(destryoRef),
        map(data=> data["todoItem"] as TodoRecord)
      )
      .subscribe(data => {
        this.todoItem = data
        this.formGroup.patchValue({
          title: data.title,
          description: data.description,
          is_completed: data.is_completed,
          priority: data.priority
        })
    })
  }

  private handleSave() {
    const { formGroup, todoItem } = this
    const { todoItemService, destryoRef } = this.services
    combineLatest([
      formGroup.valueChanges.pipe(startWith(formGroup.value)), 
      formGroup.statusChanges.pipe(startWith(formGroup.status)), 
    ])
    .pipe(
      takeUntilDestroyed(destryoRef),
      debounceTime(300),
      delay(300),
      switchMap(([values, status]) => {
        if (status === "VALID") {
          const updatedTodo = {
            description: values?.description ?? todoItem.description,
            is_completed: values?.is_completed ?? todoItem.is_completed,
            priority: (values?.priority as Priority) ?? todoItem.priority,
            title: values?.title ?? todoItem.title,
            id: todoItem.id,
          };
          return todoItemService.putTodo(updatedTodo,todoItem.id )
        }
        return of(null)
      }),
      filter(data=> data !== null)
    ).subscribe()
  }

}
