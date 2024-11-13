import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CalendarData } from "@app/todo/model/heat-map-calender"
import { TodoHeatMapService } from '@app/todo/services/todo-heat-map.service';
import { BehaviorSubject, Subject } from 'rxjs';

@Component({
  selector: 'app-todo-heat-map',
  templateUrl: './todo-heat-map.component.html',
  styleUrl: './todo-heat-map.component.scss'
})
export class TodoHeatMapComponent  {
  
  view:[number, number]= [1400, 400];
  showXAxis = true;
  showYAxis = true;
  gradient = true;
  xAxisLabel = 'Week';
  yAxisLabel = 'Day';

  private readonly services = {
    todoHeatMap: inject(TodoHeatMapService)
  }

  calenderData$ = this.services.todoHeatMap.heatMapData$
  isFetching$= this.services.todoHeatMap.isFetching$

}
