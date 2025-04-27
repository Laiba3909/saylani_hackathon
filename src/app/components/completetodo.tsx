'use client';
import { FiTrash2, FiRotateCcw } from 'react-icons/fi';
import type { Todo } from '../types/todos';

interface CompletedTodosProps {
  todos: Todo[];
  onDelete: (id: string) => void;
  onUpdate?: (updatedTodo: Todo) => void;
  showHeader?: boolean;
}

export default function CompletedTodos({
  todos,
  onDelete,
  onUpdate,
  showHeader = true,
}: CompletedTodosProps) {
  const handleRestore = (todo: Todo) => {
    if (onUpdate) {
      const updatedTodo: Todo = {
        ...todo,
        completed: false,
        status: 'pending',
      };
      onUpdate(updatedTodo);
    }
  };

  return (
    <div className="mt-8">
      {showHeader && (
        <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
          <span className="bg-green-100 text-green-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded-full">
            {todos.length}
          </span>
          Completed Tasks
        </h2>
      )}

      {todos.length === 0 ? (
        <div className="text-center py-6 text-gray-500">
          No completed tasks yet
        </div>
      ) : (
        <ul className="space-y-3">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="group relative bg-gray-50 rounded-lg p-4 shadow-sm flex items-center justify-between"
            >
              <span className="flex-1 text-gray-500 line-through">{todo.task}</span>
              <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                {onUpdate && (
                  <button
                    onClick={() => handleRestore(todo)}
                    className="p-1 text-blue-500 hover:text-blue-700"
                    title="Restore"
                  >
                    <FiRotateCcw size={18} />
                  </button>
                )}
                <button
                  onClick={() => onDelete(todo.id)}
                  className="p-1 text-red-500 hover:text-red-700"
                  title="Delete"
                >
                  <FiTrash2 size={18} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
