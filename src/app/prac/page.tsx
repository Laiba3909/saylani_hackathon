'use client';
import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { FiPlus, FiCheck, FiTrash2, FiEdit2 } from 'react-icons/fi';
import { BsGripVertical } from 'react-icons/bs';

interface Todo {
  id: string;
  task: string;
  completed: boolean;
}

export default function TodoApp() {
  const [task, setTask] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState('');

  const addTodo = () => {
    if (task.trim()) {
      setTodos([...todos, { 
        id: `todo-${Date.now()}`, 
        task, 
        completed: false 
      }]);
      setTask('');
    }
  };

  const startEditing = (id: string, text: string) => {
    setEditingId(id);
    setEditText(text);
  };

  const saveEdit = (id: string) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, task: editText } : todo
    ));
    setEditingId(null);
  };

  const completeTodo = (id: string) => {
    const todoToComplete = todos.find(todo => todo.id === id);
    if (!todoToComplete) return;
    
    setTodos(todos.filter(todo => todo.id !== id));
    setCompletedTodos([...completedTodos, { ...todoToComplete, completed: true }]);
  };

  const deleteTodo = (id: string, isCompleted: boolean) => {
    if (isCompleted) {
      setCompletedTodos(completedTodos.filter(todo => todo.id !== id));
    } else {
      setTodos(todos.filter(todo => todo.id !== id));
    }
  };

  const handleDragEnd = (result: any) => {
    const { destination, source } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

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
          
          {/* Add Todo Section */}
          <div className="flex mb-8 shadow-sm">
            <input
              type="text"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              placeholder="What needs to be done?"
              className="flex-1 p-3 border border-r-0 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              onKeyPress={(e) => e.key === 'Enter' && addTodo()}
            />
            <button 
              onClick={addTodo}
              className="bg-indigo-600 text-white px-4 py-3 rounded-r-lg hover:bg-indigo-700 transition-colors flex items-center"
            >
              <FiPlus className="mr-1" /> Add
            </button>
          </div>

          {/* Active Todos Section */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
              <span className="bg-indigo-100 text-indigo-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded-full">
                {todos.length}
              </span>
              Active Tasks
            </h2>
            
            {todos.length === 0 ? (
              <div className="text-center py-6 text-gray-500">
                No active tasks. Add one above!
              </div>
            ) : (
              <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="todos">
                  {(provided) => (
                    <ul
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className="space-y-3"
                    >
                      {todos.map((todo, index) => (
                        <Draggable key={todo.id} draggableId={todo.id} index={index}>
                          {(provided, snapshot) => (
                            <li
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              className={`group relative rounded-lg transition-all ${
                                snapshot.isDragging ? 'shadow-lg transform scale-105' : 'shadow-sm'
                              }`}
                            >
                              <div className={`flex items-center p-4 bg-white rounded-lg border-l-4 ${
                                snapshot.isDragging ? 'border-indigo-500' : 'border-transparent'
                              }`}>
                                {/* Drag Handle */}
                                <div 
                                  {...provided.dragHandleProps}
                                  className="mr-3 text-gray-400 hover:text-gray-600 cursor-grab active:cursor-grabbing"
                                >
                                  <BsGripVertical size={16} />
                                </div>
                                
                                {/* Task Content */}
                                {editingId === todo.id ? (
                                  <input
                                    type="text"
                                    value={editText}
                                    onChange={(e) => setEditText(e.target.value)}
                                    onBlur={() => saveEdit(todo.id)}
                                    onKeyPress={(e) => e.key === 'Enter' && saveEdit(todo.id)}
                                    className="flex-1 border-b border-gray-300 focus:outline-none focus:border-indigo-500 mr-2"
                                    autoFocus
                                  />
                                ) : (
                                  <span className="flex-1 text-gray-800">{todo.task}</span>
                                )}
                                
                                {/* Action Buttons */}
                                <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                  {editingId !== todo.id && (
                                    <>
                                      <button 
                                        onClick={() => startEditing(todo.id, todo.task)}
                                        className="p-1 text-blue-500 hover:text-blue-700"
                                        title="Edit"
                                      >
                                        <FiEdit2 size={18} />
                                      </button>
                                      <button 
                                        onClick={() => completeTodo(todo.id)}
                                        className="p-1 text-green-500 hover:text-green-700"
                                        title="Complete"
                                      >
                                        <FiCheck size={18} />
                                      </button>
                                    </>
                                  )}
                                  <button 
                                    onClick={() => deleteTodo(todo.id, false)}
                                    className="p-1 text-red-500 hover:text-red-700"
                                    title="Delete"
                                  >
                                    <FiTrash2 size={18} />
                                  </button>
                                </div>
                              </div>
                            </li>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </ul>
                  )}
                </Droppable>
              </DragDropContext>
            )}
          </div>

          {/* Completed Todos Section */}
          <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
              <span className="bg-green-100 text-green-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded-full">
                {completedTodos.length}
              </span>
              Completed Tasks
            </h2>
            
            {completedTodos.length === 0 ? (
              <div className="text-center py-6 text-gray-500">
                No completed tasks yet. Complete some tasks above!
              </div>
            ) : (
              <ul className="space-y-3">
                {completedTodos.map((todo) => (
                  <li 
                    key={todo.id} 
                    className="group relative bg-gray-50 rounded-lg p-4 shadow-sm flex items-center"
                  >
                    <span className="flex-1 text-gray-500 line-through">{todo.task}</span>
                    <button 
                      onClick={() => deleteTodo(todo.id, true)}
                      className="opacity-0 group-hover:opacity-100 p-1 text-red-500 hover:text-red-700 transition-opacity"
                      title="Delete"
                    >
                      <FiTrash2 size={18} />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}