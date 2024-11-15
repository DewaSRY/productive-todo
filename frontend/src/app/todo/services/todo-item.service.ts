import { inject, Injectable } from '@angular/core';
import { map, Observable, of, Subject, switchMap, tap } from 'rxjs';
import { Todo, TodoRecord } from '../model/todo';
import { TodoService } from './todo.service';
import { NotificationsService } from '@app/layout/services/notifications.service';

type InputType = "add" | "update" | "remove" | "toggle"

interface InputCommand{
  todo: Todo
  type: InputType
}


type OutpuType= "add" | "refresh"

interface OutputCommand{
  todo?: TodoRecord,
  id?:number,
  type:OutpuType
}

@Injectable({
  providedIn: 'root'
})
export class TodoItemService {
  private readonly todoData$!: Subject<InputCommand>
  readonly todoOutput$!: Observable<OutputCommand>
  
  private readonly services = {
    todoServices: inject(TodoService),
    notification: inject(NotificationsService)
  }

  constructor() {
    const { todoServices, notification } = this.services
    this.todoData$ = new Subject();
    this.todoOutput$ = this.todoData$
      .pipe(
        switchMap(data => {
          switch (data.type) {
            case "add":
              return todoServices.postNewTodo(data.todo)
                    .pipe(map((data)=>({todo:data, type: "add"}) as OutputCommand))
            case "update":
              return todoServices.putTodo(data.todo, data.todo.id)
                     .pipe(map((data)=>({todo:data, type: "add"}) as OutputCommand));
            case "toggle":
              return todoServices.completeTodo(data.todo, data.todo.id)
                     .pipe(map((data)=>({todo:data, type: "add"}) as OutputCommand))
            default:
              return todoServices.deleteTodo(data.todo.id)
                .pipe(
                  tap(() => notification.addSuccess("Deleted")),
                  map(id=> ({id, type:"refresh"}) as OutputCommand)
                );
          }
        }),
      )
  }
  
  createTodo() {
    this.todoData$.next({
      todo: {
        id: this.randoId() * -1,
        description: "",
        is_completed: false, 
        priority: "NORMAL",
        title : "new Todo"
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

  togleComplitionTodo(todo: Todo) {
    this.todoData$.next({ todo: todo, type: "toggle"})
  }

  private randoId() {
    return Math.round(Math.random() * 10000)
  }

  todoMapper(todo: TodoRecord): Todo {
    return {
      description: todo.description,
      id: todo.id,
      is_completed: todo.is_completed,
      priority: todo.priority,
      title: todo.title
    }
  }
}
