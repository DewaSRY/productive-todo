import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Cuartel } from "@app/todo/model/heat-map-calender"
import { TodoHeatMapService } from '@app/todo/services/todo-heat-map.service';

@Component({
  selector: 'app-todo-heat-map-filter',
  templateUrl: './todo-heat-map-filter.component.html',
  styleUrl: './todo-heat-map-filter.component.scss'
})
export class TodoHeatMapFilterComponent  {
  currentCuartal!: string

  private readonly services = {
    heatMapServices: inject(TodoHeatMapService),
    destroyRef: inject(DestroyRef)
  }
  
  constructor() {
    const {heatMapServices,destroyRef } = this.services
    heatMapServices.currectCuartal$
      .pipe(takeUntilDestroyed(destroyRef))
      .subscribe((c) => this.currentCuartal = c)
  }

  isFeatching$ = this.services.heatMapServices.isFetching$
  
}
