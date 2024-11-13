import { Component, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Cuartel } from "@app/todo/model/heat-map-calender"
import { TodoHeatMapService } from '@app/todo/services/todo-heat-map.service';
import { tap } from 'rxjs';
@Component({
  selector: 'app-todo-heat-map-filter',
  templateUrl: './todo-heat-map-filter.component.html',
  styleUrl: './todo-heat-map-filter.component.scss'
})
export class TodoHeatMapFilterComponent  {
  currentCuartal!: string
  
  constructor(
    private heatMapServices: TodoHeatMapService,
    private destroyRef: DestroyRef) {
    this.heatMapServices.currectCuartal$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .pipe(tap(d=> console.log(d)))
      .subscribe((c) => this.currentCuartal = c)
  }
}
