import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-todo-priority-filter',
  templateUrl: './todo-priority-filter.component.html',
  styleUrl: './todo-priority-filter.component.scss'
})
export class TodoPriorityFilterComponent implements OnInit {
  currentRoute = ""

  private readonly services = {
    activeRotue: inject(ActivatedRoute),
    destroyRef: inject(DestroyRef)

  }

  ngOnInit(): void {
    const { activeRotue, destroyRef } = this.services
    activeRotue.queryParamMap
      .pipe(
        takeUntilDestroyed(destroyRef),
        map(query=> query.get("priority") || "")
      )
      .subscribe(data => this.currentRoute = data)
  }


}
