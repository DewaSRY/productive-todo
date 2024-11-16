import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeTodoComponent } from './components/home-todo/home-todo.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MyCalenderComponent } from './components/my-calender/my-calender.component';
import { MyTaskComponent } from './components/my-task/my-task.component';
import { userAuthGuard } from "@app/auth/guard/user-auth.guard"
import { TodoItemsComponent } from './components/todo-items/todo-items.component';

import { todoItemResolver } from "./resolver/todo-item.resolver"

const routes: Routes = [
  {
    path: "",
    component: HomeTodoComponent,
    canActivate: [userAuthGuard],
    children: [
      {
        path: "dashboard",
        component: DashboardComponent,
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
  {
    path: ":todoId",
    component: TodoItemsComponent,
    canActivate: [userAuthGuard],
    resolve: {
      todoItem: todoItemResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TodoRoutingModule { }
