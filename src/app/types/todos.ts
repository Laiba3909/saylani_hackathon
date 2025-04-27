export type TodoStatus = 'pending' | 'in-progress' | 'completed';
export type TodoPriority = 'low' | 'medium' | 'high';

export interface Todo {
  id: string;
  task: string;
  completed: boolean;
  status: TodoStatus;  
  priority: TodoPriority;
  dueDate?: string;
}

