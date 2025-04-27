// addtodo.tsx
import React, { useState } from 'react';
import { TodoPriority } from '../types/todos';

interface AddTodoProps {
  onAdd: (task: string, priority: TodoPriority) => Promise<void>;
}

const AddTodo: React.FC<AddTodoProps> = ({ onAdd }) => {
  const [task, setTask] = useState('');
  const [priority, setPriority] = useState<TodoPriority>('medium');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onAdd(task, priority);
    setTask('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Add a new task"
        required
      />
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value as TodoPriority)}
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <button type="submit">Add Todo</button>
    </form>
  );
};

export default AddTodo;
