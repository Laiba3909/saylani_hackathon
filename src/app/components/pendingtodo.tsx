

import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { FiCheck, FiTrash2, FiEdit2 } from 'react-icons/fi';
import { BsGripVertical } from 'react-icons/bs';
import { Todo } from '../types/todos';

interface ActiveTodosProps {
    todos: Todo[];
    editingId: string | null;
    editText: string;
    onEditChange: (text: string) => void;
    onSaveEdit: (id: string) => void;
    onStartEdit: (id: string, text: string) => void;
    onComplete: (id: string) => void;
    onDelete: (id: string) => void;
    onDragEnd: (result: any) => void;
    onUpdate?: (updatedTodo: Todo) => void;
    showHeader?: boolean;
  }
  


  export default function PendingTodos({
    todos,
    editingId,
    editText,
    onEditChange,
    onSaveEdit,
    onStartEdit,
    onComplete,
    onDelete,
    onDragEnd,
    onUpdate,
    showHeader = true
  }: ActiveTodosProps) 
  {
  return (
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
        <DragDropContext onDragEnd={onDragEnd}>
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
                          <div 
                            {...provided.dragHandleProps}
                            className="mr-3 text-gray-400 hover:text-gray-600 cursor-grab active:cursor-grabbing"
                          >
                            <BsGripVertical size={16} />
                          </div>
                          
                          {editingId === todo.id ? (
                            <input
                              type="text"
                              value={editText}
                              onChange={(e) => onEditChange(e.target.value)}
                              onBlur={() => onSaveEdit(todo.id)}
                              onKeyPress={(e) => e.key === 'Enter' && onSaveEdit(todo.id)}
                              className="flex-1 border-b border-gray-300 focus:outline-none focus:border-indigo-500 mr-2"
                              autoFocus
                            />
                          ) : (
                            <span className="flex-1 text-gray-800">{todo.task}</span>
                          )}
                          
                          <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            {editingId !== todo.id && (
                              <>
                                <button 
                                  onClick={() => onStartEdit(todo.id, todo.task)}
                                  className="p-1 text-blue-500 hover:text-blue-700"
                                  title="Edit"
                                >
                                  <FiEdit2 size={18} />
                                </button>
                                <button 
                                  onClick={() => onComplete(todo.id)}
                                  className="p-1 text-green-500 hover:text-green-700"
                                  title="Complete"
                                >
                                  <FiCheck size={18} />
                                </button>
                              </>
                            )}
                            <button 
                              onClick={() => onDelete(todo.id)}
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
  );
}


