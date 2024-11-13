import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from "@environments/environment"
import { CalendarData, HeatMapFilter } from "@app/todo/model/heat-map-calender"
import { Todo,TodoRecord, TodoResponse } from "@app/todo/model/todo"
import { TodoFilterRequest } from "@app/todo/model/todo-request"
import { PaginationResponse } from "@app/shared/models/shared"
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private readonly endpoint = `${environment.domain}/todo`

  private readonly services = {
    httpClient: inject(HttpClient)
  }

  getAllTodo(query:Partial<TodoFilterRequest>) {
    return this.services.httpClient.get<PaginationResponse<TodoRecord>>(this.endpoint, {
      params: {
        name: query.name || "",
        from: query.from || "",
        to: query.to || "",
        is_comleted: query.is_comleted || "",
        limit:query.limit || ""
      }
    })
  }

  postNewTodo(pyload:Todo ) {
    return this.services.httpClient.post<TodoResponse>(this.endpoint, pyload)
      .pipe(map(r=> r.data))
  }

  getTodoById(id: number) {
    return this.services.httpClient.get<TodoResponse>(`this.endpoint/${id}`)
    .pipe(map(r=> r.data))
  }

  putTodo(pyload: Todo, id: number) {
    return this.services.httpClient.put<TodoResponse>(`this.endpoint/${id}`, pyload)
       .pipe(map(r=> r.data))
  }
  
  completeTodo(pyload: Todo, id: number) {
    return this.services.httpClient.put<TodoResponse>(`this.endpoint/toggle-completion/${id}`, pyload)
  }

  getTodoHeatMap(query: Partial<HeatMapFilter>) {
    return this.services.httpClient
      .get<CalendarData[]>(`${this.endpoint}/todo-heatmap`, {
        params: {
          cuartel: query.cuartel || "Q1",
          year: query.year || new Date().getFullYear().toString()
          }
        })
  }

}


