import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-todo-completed-filter',
  templateUrl: './todo-completed-filter.component.html',
  styleUrl: './todo-completed-filter.component.scss'
})
export class TodoCompletedFilterComponent implements OnInit {
  currentRoute= ""

  private readonly services = {
    activeRotue: inject(ActivatedRoute),
    destroyRef: inject(DestroyRef)

  }

  ngOnInit(): void {
    const { activeRotue, destroyRef } = this.services
    activeRotue.queryParamMap
      .pipe(
        takeUntilDestroyed(destroyRef),
        map(query=> query.get("is_completed") || "")
      )
      .subscribe(data => this.currentRoute = data)
  }


}
