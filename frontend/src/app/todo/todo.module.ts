import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

import { LayoutModule } from '@app/layout/layout.module';

import { TodoRoutingModule } from './todo-routing.module';
import { HomeTodoComponent } from './components/home-todo/home-todo.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MyCalenderComponent } from './components/my-calender/my-calender.component';
import { MyTaskComponent } from './components/my-task/my-task.component';
import { TodoHeatMapComponent } from "./components/todo-heat-map/todo-heat-map.component"
import { TodoHeatMapFilterComponent } from './components/todo-heat-map-filter/todo-heat-map-filter.component'

@NgModule({
  declarations: [
    HomeTodoComponent,
    DashboardComponent,
    MyCalenderComponent,
    MyTaskComponent,
    TodoHeatMapComponent,
    TodoHeatMapFilterComponent
  ],
  imports: [
    CommonModule,
    TodoRoutingModule,
    LayoutModule,
    NgxChartsModule,
    RouterModule,
    MatListModule,
    MatButtonModule
  ],
})
export class TodoModule { }
