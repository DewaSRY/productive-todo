import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { TodoRecord } from '@app/todo/model/todo';
import { map } from 'rxjs';

@Component({
  selector: 'app-todo-items',
  templateUrl: './todo-items.component.html',
  styleUrl: './todo-items.component.scss'
})
export class TodoItemsComponent implements OnInit {

  todoItem!: TodoRecord
  
  

  private readonly services = {
    activatedRouter: inject(ActivatedRoute),
    destryoRef: inject(DestroyRef)
  }

  ngOnInit(): void {
    this.setUpTodoItem()
  }

  private setUpTodoItem() {
    const { activatedRouter, destryoRef } = this.services
    activatedRouter.data
      .pipe(
        takeUntilDestroyed(destryoRef),
        map(data=> data["todoItem"] as TodoRecord)
      )
      .subscribe(data => {
        this.todoItem= data
    })
  }
}
