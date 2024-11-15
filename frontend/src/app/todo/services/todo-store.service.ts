import { DestroyRef, inject, Injectable } from '@angular/core';
import { BehaviorSubject, filter, finalize, from, map, Observable, ReplaySubject, scan, Subject, switchMap, tap } from 'rxjs';
import { TodoRecord } from '../model/todo';
import { TodoFilterRequest } from '../model/todo-request';
import { TodoService } from './todo.service';
import { ActivatedRoute } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TodoItemService } from './todo-item.service';
import { Meta } from "@app/shared/models/shared"

type Type="add" | "remove" | "clear"

interface Command{
  todo?: TodoRecord,
  id?: number
  type:Type
}


@Injectable({
  providedIn: 'root'
})
export class TodoStoreService {
  private readonly todoData$!: Subject<Command>
  readonly todoDataStore$!: Observable<TodoRecord[]>
  readonly isFetching$ = new BehaviorSubject<boolean>(false)
  metaData:Meta | null =null 

  private readonly services = {
    destroyRef: inject(DestroyRef),
    todoServices: inject(TodoService),
    activatedRouter: inject(ActivatedRoute),
    todoItem: inject(TodoItemService)
  }

  constructor() {
    const { todoItem, destroyRef } = this.services
    this.todoData$ = new ReplaySubject()
    this.todoDataStore$ = this.todoData$
      .pipe(
        filter(data=> data !== null),
        scan((accTodos, data) => {
          switch (data.type) {
            case "add": {
              const existingIndex = accTodos.findIndex(d => d.id === data.id);
              return existingIndex !== -1
                ? [...accTodos.slice(0, existingIndex), data.todo!, ...accTodos.slice(existingIndex + 1)]
                : [data.todo!, ...accTodos];
            }
            case "remove":
              return accTodos.filter(x => x.id !== data.id);
            default:
              return [];
          }
        }, [] as TodoRecord[]),
        map(data=> data.length <= 10 ? data : data.slice(0,10))
    )

    this.setUpQueryData()

    todoItem.todoOutput$
      .pipe(takeUntilDestroyed(destroyRef))
      .subscribe((data) => {
      switch (data.type) {
        case "add":
          this.todoData$.next({
            type: "add",
            todo: data.todo as TodoRecord
          })
          break
        case "refresh":
          this.todoData$.next({
            type: "remove",
            id: data.id
          })
          break
        default:
          this.setUpQueryData()
          break
      }
    })

  }

  private setUpQueryData() {
    const { todoServices, destroyRef, activatedRouter } = this.services
    activatedRouter.queryParamMap
      .pipe(
        takeUntilDestroyed(destroyRef),
        map(data => {

          let name= data.get("name") || undefined
          let from= data.get("from") || undefined
          let to= data.get("to") || undefined
          let is_completed = data.get("is_completed")  || undefined
          let limit = data.get("limit") || undefined
          let priority = data.get("priority") || undefined

          return {name, from, to, is_completed,priority, limit} as TodoFilterRequest
        }),
        switchMap(query => {
          this.isFetching$.next(true)
          this.todoData$.next({ type: "clear" })
          
          return todoServices.getAllTodo(query)
            .pipe(finalize(()=>this.isFetching$.next(false)))
        }),
        tap((response)=> this.metaData = response.meta),
        switchMap(response => from(response.data))
      )
      .subscribe((data) => {
        this.todoData$.next({
          type: "add",
          todo: data
        })
      })
  }
}
