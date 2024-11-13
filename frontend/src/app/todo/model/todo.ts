export interface Todo {
  title: string;
  is_completed: boolean;
  description: string;
  priority: 'HIGHT' | 'MID' | 'NORMAL' | 'LOW';
}

export interface GetAllTodoRequest {
  from: string;
  is_completed: boolean;
  name: string;
  to: string;
}

export interface TodoResponse {
  data: TodoRecord;
}

export interface TodoRecord extends Todo {
  id: string;
  created_at: string;
  updated_at: string;
  user_id: string;
}
