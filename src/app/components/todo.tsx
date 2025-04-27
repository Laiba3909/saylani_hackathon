// 'use client';
// import { useState } from 'react';
// import AddTodo from './addtodo';
// import PendingTodos from './pendingtodo';
// import CompletedTodos from './completetodo';
// import { Todo } from '../types/todos';

// export default function TodoApp() {
//   const [todos, setTodos] = useState<Todo[]>([]);
//   const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);
//   const [editingId, setEditingId] = useState<string | null>(null);
//   const [editText, setEditText] = useState('');

//   const addNewTodo = async (task: string) => {
//     if (task.trim()) {
//       setTodos([...todos, { 
//         id: `todo-${Date.now()}`, 
//         task, 
//         completed: false,
//         status: 'pending',
//         priority: 'medium'
//       }]);
//     }
//   };

//   const startEditing = (id: string, text: string) => {
//     setEditingId(id);
//     setEditText(text);
//   };

//   const saveEdit = (id: string) => {
//     setTodos(todos.map(todo => 
//       todo.id === id ? { 
//         ...todo, 
//         task: editText,
//         status: todo.status,
//         priority: todo.priority
//       } : todo
//     ));
//     setEditingId(null);
//   };

//   const updateTodo = (updatedTodo: Todo) => {
//     setTodos(todos.map(todo => 
//       todo.id === updatedTodo.id ? updatedTodo : todo
//     ));
//   };

//   const completeTodo = (id: string) => {
//     const todoToComplete = todos.find(todo => todo.id === id);
//     if (!todoToComplete) return;
    
//     setTodos(todos.filter(todo => todo.id !== id));
//     setCompletedTodos([...completedTodos, { 
//       ...todoToComplete, 
//       completed: true,
//       status: 'completed'
//     }]);
//   };

//   const deleteTodo = (id: string, isCompleted: boolean) => {
//     if (isCompleted) {
//       setCompletedTodos(completedTodos.filter(todo => todo.id !== id));
//     } else {
//       setTodos(todos.filter(todo => todo.id !== id));
//     }
//   };

//   const handleDragEnd = (result: any) => {
//     const { destination, source } = result;
//     if (!destination) return;
//     if (destination.droppableId === source.droppableId &&
//         destination.index === source.index) return;

//     const items = Array.from(todos);
//     const [removed] = items.splice(source.index, 1);
//     items.splice(destination.index, 0, removed);
//     setTodos(items);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
//       <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
//         <div className="p-8">
//           <h1 className="text-3xl font-bold text-center text-indigo-600 mb-8">Todo App</h1>
          
//           <AddTodo onAdd={addNewTodo} />
          
//           <PendingTodos
//             todos={todos}
//             editingId={editingId}
//             editText={editText}
//             onEditChange={setEditText}
//             onSaveEdit={saveEdit}
//             onStartEdit={startEditing}
//             onComplete={completeTodo}
//             onDelete={(id) => deleteTodo(id, false)}
//             onDragEnd={handleDragEnd}
//             onUpdate={updateTodo}
//             showHeader={true}
//           />
          
//           <CompletedTodos
//             todos={completedTodos}
//             onDelete={(id) => deleteTodo(id, true)}
//             onUpdate={updateTodo}
//             showHeader={true}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }
'use client'
import { useState, useEffect } from 'react';
import AddTodo from './addtodo';
import PendingTodos from './pendingtodo';
import CompletedTodos from './completetodo';
import { Todo, TodoStatus, TodoPriority } from '../types/todos';

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState('');
  
  // Fetch todos from an API (Example)
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch('/api/todo');
        const data = await response.json();
        setTodos(data.filter((todo: Todo) => todo.status === 'pending')); // Filter only pending todos
        setCompletedTodos(data.filter((todo: Todo) => todo.status === 'completed'));
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };
    
    fetchTodos();
  }, []);

  const addNewTodo = async (task: string, priority: TodoPriority) => {
    if (task.trim()) {
      const newTodo: Todo = { 
        id: `todo-${Date.now()}`, 
        task, 
        completed: false,
        status: 'pending',  // Ensure status is 'pending'
        priority,
      };
      setTodos([...todos, newTodo]);

      // Optionally: Sync with the backend
      // await fetch('/api/todos', { method: 'POST', body: JSON.stringify(newTodo) });
    }
  };

  const startEditing = (id: string, text: string) => {
    setEditingId(id);
    setEditText(text);
  };

  const saveEdit = (id: string) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { 
        ...todo, 
        task: editText,
        status: todo.status,
        priority: todo.priority
      } : todo
    ));
    setEditingId(null);
  };

  const completeTodo = (id: string) => {
    const todoToComplete = todos.find(todo => todo.id === id);
    if (!todoToComplete) return;

    setTodos(todos.filter(todo => todo.id !== id));
    setCompletedTodos([...completedTodos, { 
      ...todoToComplete, 
      completed: true,
      status: 'completed'  // Change status to 'completed'
    }]);
  };

  const deleteTodo = (id: string, isCompleted: boolean) => {
    if (isCompleted) {
      setCompletedTodos(completedTodos.filter(todo => todo.id !== id));
    } else {
      setTodos(todos.filter(todo => todo.id !== id));
    }
  };

  const updateTodo = (updatedTodo: Todo) => {
    setTodos(todos.map(todo => 
      todo.id === updatedTodo.id ? updatedTodo : todo
    ));
    setCompletedTodos(completedTodos.map(todo => 
      todo.id === updatedTodo.id ? updatedTodo : todo
    ));
  };

  const handleDragEnd = (result: any) => {
    const { destination, source } = result;
    if (!destination) return;
    if (destination.droppableId === source.droppableId &&
        destination.index === source.index) return;

    const items = Array.from(todos);
    const [removed] = items.splice(source.index, 1);
    items.splice(destination.index, 0, removed);
    setTodos(items);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-8">
          <h1 className="text-3xl font-bold text-center text-indigo-600 mb-8">Todo App</h1>
          
          <AddTodo onAdd={addNewTodo} />
          
          <PendingTodos
            todos={todos}
            editingId={editingId}
            editText={editText}
            onEditChange={setEditText}
            onSaveEdit={saveEdit}
            onStartEdit={startEditing}
            onComplete={completeTodo}
            onDelete={(id) => deleteTodo(id, false)}
            onDragEnd={handleDragEnd}
            onUpdate={updateTodo}
            showHeader={true}
          />
          
          <CompletedTodos
            todos={completedTodos}
            onDelete={(id) => deleteTodo(id, true)}
            onUpdate={updateTodo}
            showHeader={true}
          />
        </div>
      </div>
    </div>
  );
}
