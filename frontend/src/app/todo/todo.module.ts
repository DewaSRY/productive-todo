import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodoRoutingModule } from './todo-routing.module';
import { LayoutModule } from '@app/layout/layout.module';
import { HomeTodoComponent } from './components/home-todo/home-todo.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MyCalenderComponent } from './components/my-calender/my-calender.component';
import { MyTaskComponent } from './components/my-task/my-task.component';

@NgModule({
  declarations: [HomeTodoComponent, DashboardComponent, MyCalenderComponent, MyTaskComponent],
  imports: [
    CommonModule,
    TodoRoutingModule,
    LayoutModule
  ],
  exports: [HomeTodoComponent, DashboardComponent, MyCalenderComponent, MyTaskComponent],
})
export class TodoModule { }
