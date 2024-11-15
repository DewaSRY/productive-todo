import { Component, inject, OnInit } from '@angular/core';
import { TodoRecord, Todo } from '@app/todo/model/todo';
import { TodoItemService } from '@app/todo/services/todo-item.service';
import { TodoStoreService } from '@app/todo/services/todo-store.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-todo-container',
  templateUrl: './todo-container.component.html',
  styleUrl: './todo-container.component.scss'
})
export class TodoContainerComponent  {
  todoItems$!: Observable<TodoRecord[]>
  isFetching: Observable<boolean>
  
  private readonly services = {
    todoStore: inject(TodoStoreService),
    todoItem: inject(TodoItemService)
  }
  constructor() {
    const { todoStore } = this.services
    this.todoItems$ = todoStore.todoDataStore$
    this.isFetching = todoStore.isFetching$
  }

  handleDeleteTodo(todo: TodoRecord) {
    const { todoItem } = this.services
    todoItem.deleteTodo(todoItem.todoMapper(todo))
  }
  
  handTogleCompletion(todo: TodoRecord) {
    const { todoItem } = this.services
    todoItem.togleComplitionTodo(todoItem.todoMapper(todo))
  }
  
}
