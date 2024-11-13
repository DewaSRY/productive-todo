import { DestroyRef, inject, Injectable } from '@angular/core';
import { TodoService } from './todo.service';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, finalize, map, switchMap } from 'rxjs';
import { CalendarData,Cuartel } from '../model/heat-map-calender';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class TodoHeatMapService {

  readonly heatMapData$ = new BehaviorSubject<CalendarData[]>([])
  readonly isFetching$ = new BehaviorSubject<boolean>(false)
  readonly currectCuartal$ = new BehaviorSubject<Cuartel>("Q1")
  readonly currentDate = new Date()
  
  private readonly services = {
    todoServices: inject(TodoService),
    activatedRoute: inject(ActivatedRoute),
    destroyRef: inject(DestroyRef)

  }

  constructor() { 
    const { todoServices, activatedRoute, destroyRef } = this.services
    activatedRoute.queryParamMap
      .pipe(takeUntilDestroyed(destroyRef))
      .pipe(map((data) => {
        let cuartel = data.get("cuartel")
        if (!cuartel) {
          cuartel= this.getCuartel()
        }
        return cuartel as Cuartel
      }))
      .pipe(switchMap((cuartel) => {
        const currentYear = this.currentDate.getFullYear().toString()
        this.currectCuartal$.next(cuartel)
        this.isFetching$.next(true);

        return todoServices.getTodoHeatMap({
          year: currentYear,
          cuartel: cuartel
        }).pipe(
          finalize(()=> this.isFetching$.next(false))
        )

      } ))
      .subscribe((data) => {
        this.heatMapData$.next(data)
      })
  }

  private getCuartel() {
    const currentMonth = new Date().getMonth()
    if (currentMonth <= 3) {
      return "Q1"
    } else if (currentMonth <= 6) {
      return "Q2"
    } else if (currentMonth <= 9) {
      return "Q3"
    } else {
      return "Q4"
    }
  }

}
