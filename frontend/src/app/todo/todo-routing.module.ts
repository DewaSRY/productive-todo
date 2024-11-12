import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeTodoComponent } from './components/home-todo/home-todo.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MyCalenderComponent } from './components/my-calender/my-calender.component';
import { MyTaskComponent } from './components/my-task/my-task.component';

const routes: Routes = [
  {
    path: "",
    component: HomeTodoComponent,
    children: [
      {
        path: "dashboard",
        component: DashboardComponent
      },
      {
        path: "my-calender",
        component: MyCalenderComponent
      },
      {
        path: "my-task",
        component: MyTaskComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TodoRoutingModule { }
