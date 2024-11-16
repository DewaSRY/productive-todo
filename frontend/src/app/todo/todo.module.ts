import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LucideAngularModule, X,Search } from 'lucide-angular';


import { LayoutModule } from '@app/layout/layout.module';

import { TodoRoutingModule } from './todo-routing.module';
import { HomeTodoComponent } from './components/home-todo/home-todo.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MyCalenderComponent } from './components/my-calender/my-calender.component';
import { MyTaskComponent } from './components/my-task/my-task.component';
import { TodoHeatMapComponent } from "./components/todo-heat-map/todo-heat-map.component"
import { TodoHeatMapFilterComponent } from './components/todo-heat-map-filter/todo-heat-map-filter.component'
import { TodoContainerComponent } from "./components/todo-container/todo-container.component"
import { TodoCompletedFilterComponent } from "./components/todo-completed-filter/todo-completed-filter.component"
import { TodoPriorityFilterComponent } from './components/todo-priority-filter/todo-priority-filter.component'
import { TodoItemsComponent } from "./components/todo-items/todo-items.component"

import { ProprityDirective } from './directive/proprity.directive'

import { SharedModule } from "@app/shared/shared.module"
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    HomeTodoComponent,
    DashboardComponent,
    MyCalenderComponent,
    MyTaskComponent,
    TodoHeatMapComponent,
    TodoHeatMapFilterComponent,
    TodoContainerComponent,
    TodoCompletedFilterComponent,
    TodoPriorityFilterComponent,
    TodoItemsComponent,
    ProprityDirective
  ],
  imports: [
    CommonModule,
    TodoRoutingModule,
    LayoutModule,
    NgxChartsModule,
    RouterModule,
    MatListModule,
    MatButtonModule,
    MatMenuModule,
    SharedModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    LucideAngularModule.pick({X, Search})
  ],
})
export class TodoModule { }
