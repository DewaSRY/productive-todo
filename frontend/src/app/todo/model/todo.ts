export type Priority = 'HIGHT' | 'MID' | 'NORMAL' | 'LOW';

export interface Todo {
  title: string;
  is_completed: boolean;
  description: string;
  priority: Priority
  id: number 
}

export interface TodoResponse {
  data: TodoRecord;
}

export interface TodoRecord extends Todo {
  id: number;
  created_at: string;
  updated_at: string;
  user_id: string;
}
