import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router';
import { NotificationsService } from '@app/layout/services/notifications.service';
import { TodoService } from '../services/todo.service';
import { Observable } from 'rxjs';
import { TodoRecord } from '../model/todo';

export const todoItemResolver: ResolveFn<Observable<TodoRecord> | null> = (route, state) => {
  const notification = inject(NotificationsService)
  const todoServices = inject(TodoService)
  const routerSrvices = inject(Router)
  let todoId = route.params['todoId']
  todoId = parseInt(todoId)
  if (!todoId) {
    notification.addError(`todo with id ${todoId} not found`)
    routerSrvices.navigateByUrl('/')
    return null
  }

  return todoServices.getTodoById(todoId)
};
