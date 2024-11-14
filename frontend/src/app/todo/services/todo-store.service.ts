import { DestroyRef, inject, Injectable } from '@angular/core';
import { BehaviorSubject, finalize, from, map, Observable, scan, Subject, switchMap, tap } from 'rxjs';
import { TodoRecord } from '../model/todo';
import { TodoFilterRequest } from '../model/todo-request';
import { TodoService } from './todo.service';
import { ActivatedRoute } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TodoItemService } from './todo-item.service';
import { Link } from "@app/shared/models/shared"


@Injectable({
  providedIn: 'root'
})
export class TodoStoreService {
  private readonly todoData$!: Subject<TodoRecord>
  readonly todoDataStore$!: Observable<TodoRecord[]>
  readonly metaData = new BehaviorSubject<Link[]>([])
  readonly isFetching$ = new BehaviorSubject<boolean>(false)

  private readonly services = {
    destroyRef: inject(DestroyRef),
    todoServices: inject(TodoService),
    activatedRouter: inject(ActivatedRoute),
    todoItem: inject(TodoItemService)
  }

  constructor() {
    const { todoItem, destroyRef } = this.services
    this.todoData$ = new Subject()
    this.todoDataStore$ = this.todoData$
      .pipe(
        scan((acc, data) => [data, ...acc], [] as TodoRecord[]),
        map(data => data.length <= 10 ? data : data.slice(0, 10))
    )
    
    this.setUpQueryData()

    todoItem.todoOutput$
      .pipe(takeUntilDestroyed(destroyRef))
      .subscribe((data) => {
      switch (data.type) {
        case "add":
          this.todoData$.next(data.todo as TodoRecord)
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
          let is_completed = data.get("is_completed") || undefined
          let limit = data.get("limit") || undefined
          return {name, from, to, is_completed, limit} as TodoFilterRequest
        }),
        switchMap(query => {
          this.isFetching$.next(true)
          return todoServices.getAllTodo(query)
            .pipe(finalize(()=>this.isFetching$.next(false)))
        }),
        tap((response)=> this.metaData.next(response.meta.links)),
        switchMap(response => from(response.data))
      )
      .subscribe((data) => {
        this.todoData$.next(data)
      })
  }
}
