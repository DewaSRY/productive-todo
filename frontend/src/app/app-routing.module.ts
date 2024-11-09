import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren:()=> import("@app/auth/auth.module").then(m=> m.AuthModule)
  },
  {
    path: "todo",
    loadChildren: ()=> import("@app/todo/todo.module").then(m=> m.TodoModule)
  },
  {
    path: "",
    loadChildren: ()=> import("@app/index/index.module").then(m=> m.IndexModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
