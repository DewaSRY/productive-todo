import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Meta } from '@app/shared/models/shared';
import { TodoItemService } from '@app/todo/services/todo-item.service';
import { TodoStoreService } from '@app/todo/services/todo-store.service';
import { debounceTime, delay, map, tap } from 'rxjs';

@Component({
  selector: 'app-my-task',
  templateUrl: './my-task.component.html',
  styleUrl: './my-task.component.scss'
})
export class MyTaskComponent implements OnInit {

  readonly formGroup = new FormGroup({
    search: new FormControl('', [
      Validators.pattern('^[a-zA-Z0-9]+(\\s{0,2}[a-zA-Z0-9]+)*$')
    ])
  })

  private readonly services = {
    todoItem: inject(TodoItemService),
    destroyRef: inject(DestroyRef),
    itemStore: inject(TodoStoreService),
    router: inject(Router)
  }

  ngOnInit(): void {
    const { router, destroyRef } = this.services
    this.formGroup.valueChanges
      .pipe(
        takeUntilDestroyed(destroyRef),
        map((data) => data.search || ""),
        debounceTime(300),
        delay(300)
      )
      .subscribe((data) => {
        router.navigate([], {
          queryParams: {
            title: data
          }
        })
      })
  }

  handleClear() {
    this.formGroup.reset()
    this.services.router.navigate([], {
      queryParams: {
        title: ""
      }
    })

  }
  
  handleCreateNewTodo() {
    const { todoItem } = this.services
    todoItem.createTodo()
  }

  get metaData() {
    const { itemStore } = this.services
    return itemStore.metaData 
  }

  get isHavePagination() {
    const { metaData } = this.services.itemStore
    if(!metaData) return false
    const {  last_page } = metaData
    return last_page !== 1
  }

}
