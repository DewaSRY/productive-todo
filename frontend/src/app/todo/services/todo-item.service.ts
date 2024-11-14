import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of, Subject, switchMap } from 'rxjs';
import { Todo, TodoRecord } from '../model/todo';
import { TodoService } from './todo.service';

type InputType = "add" | "update" | "remove"

interface InputCommand{
  todo: Todo
  type: InputType
}


type OutpuType= "add" | "refresh"

interface OutputCommand{
  todo?: TodoRecord
  type:OutpuType
}

@Injectable({
  providedIn: 'root'
})
export class TodoItemService {
  private readonly todoData$!: Subject<InputCommand>
  readonly todoOutput$!: Observable<OutputCommand>
  
  private readonly services = {
    todoServices: inject(TodoService)
  }

  constructor() {
    const { todoServices } = this.services
    this.todoData$ = new Subject();
    this.todoOutput$ = this.todoData$
      .pipe(
        switchMap(data => {
          switch (data.type) {
            case "add":
              return todoServices.postNewTodo(data.todo);
            case "update":
              return todoServices.putTodo(data.todo, data.todo.id);
            default:
              return todoServices.deleteTodo(data.todo.id);
          }
        }),
        map(data => {
          let type: OutpuType = "add"
          if (data === null) {
            type = "refresh"
          }
          return {data, type}
        })
      )
  }
  
  createTodo() {
    this.todoData$.next({
      todo: {
        id: this.randoId() * -1,
        description: "",
        is_completed: false, 
        priority: "NORMAL",
        title : ""
      },
       type: "add"
    })
  }

  updateTodo(todo: Todo) {
    this.todoData$.next({todo, type:"update"})
  }

  deleteTodo(tood: Todo) {
    this.todoData$.next({todo: tood, type: "remove"})
  }

  private randoId() {
    return Math.round(Math.random() * 10000)
  }

}
