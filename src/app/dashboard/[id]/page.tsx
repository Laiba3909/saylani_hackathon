'use client';
import { useParams, useSearchParams } from 'next/navigation';
import Sidebar from '../../components/sidebardashboard';
import CheckInOut from '../../components/CheckInt';
import Profile from '../../components/Profile';
import AddTodo from '../../components/addtodo';
import PendingTodos from '../../components/pendingtodo';
import CompletedTodos from '../../components/completetodo';
import { useEffect, useState } from 'react';
import { Todo } from '../../types/todos';
import {
  FiActivity, FiCalendar, FiClock, FiUser, FiAward,
  FiBarChart2, FiPlus, FiCheck, FiTrash2, FiEdit2, FiRefreshCw
} from 'react-icons/fi';


interface User {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  designation: string;
}

export type TodoStatus = 'pending' | 'in-progress' | 'completed';
export type TodoPriority = 'low' | 'medium' | 'high';

const Dashboard = () => {
  const { id } = useParams<{ id: string }>();
  const searchParams = useSearchParams();
  const section = searchParams.get('section');
  const [user, setUser] = useState<User | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [todos, setTodos] = useState<Todo[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        if (!id) {
          throw new Error('User ID is missing');
        }

        const userRes = await fetch(`/api/user/${id}`);
        if (!userRes.ok) {
          throw new Error('Failed to fetch user data');
        }
        const userData = await userRes.json();
        setUser(userData.user);
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [id]);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const todosRes = await fetch(`/api/todo?userId=${id}`);
      if (!todosRes.ok) {
        throw new Error('Failed to fetch todos');
      }
      const todosData = await todosRes.json();
      setTodos(
        todosData.todos?.map((todo: any) => ({
          id: todo.id || todo._id,
          task: todo.title || todo.task || '', // Make sure to check for title
          completed: todo.completed || todo.status === 'completed',
          status: todo.status || 'pending',
          priority: todo.priority || 'medium',
          dueDate: todo.dueDate
        })) || []
      );
      } catch (err) {
        console.error('Error fetching todos:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch todos');
      } finally {
        setLoading(false);
      }
      
  const addNewTodo = async (task: string): Promise<void> => {
    try {
      const response = await fetch('/api/todo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          task,
          userId: id,
          status: 'pending',
          priority: 'medium'
        }),
      });
  
      const result = await response.json();
  
      if (!response.ok) {
        throw new Error(result.message || 'Failed to add todo');
      }
  
      
      const newTodo: Todo = {
        id: result.todo._id,  // Map MongoDB _id to id
        task: result.todo.task,
        completed: result.todo.completed,
        status: result.todo.status || 'pending',
        priority: result.todo.priority || 'medium',
        ...(result.todo.dueDate && { dueDate: result.todo.dueDate })
      };
  
      setTodos(prev => [...prev, newTodo]);
    } catch (err) {
      console.error('Error adding todo:', err);
      throw err;
    }
  };

  const updateTodo = async (updatedTodo: Todo) => {
    try {
      const response = await fetch(`/api/todos/${updatedTodo.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTodo),
      });

      if (!response.ok) {
        throw new Error('Failed to update todo');
      }

      setTodos(todos.map(todo =>
        todo.id === updatedTodo.id ? updatedTodo : todo
      ));
    } catch (err) {
      console.error('Error updating todo:', err);
      setError(err instanceof Error ? err.message : 'Failed to update todo');
    }
  };

  const removeTodo = async (id: string) => {
    try {
      const response = await fetch(`/api/todo/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete todo');
      }

      setTodos(todos.filter(todo => todo.id !== id));
    } catch (err) {
      console.error('Error deleting todo:', err);
      setError(err instanceof Error ? err.message : 'Failed to delete todo');
    }
  };

  const startEditing = (id: string, text: string) => {
    setEditingId(id);
    setEditText(text);
  };

  const saveEdit = (id: string) => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, task: editText } : todo
    );
    setTodos(updatedTodos);
    setEditingId(null);
    const todoToUpdate = updatedTodos.find(todo => todo.id === id);
    if (todoToUpdate) {
      updateTodo(todoToUpdate);
    }
  };

  const completeTodo = (id: string) => {
    const updatedTodo = todos.find(todo => todo.id === id);
    if (updatedTodo) {
      const completedTodo = { 
        ...updatedTodo, 
        completed: true, 
        status: 'completed' as TodoStatus  
      };
      updateTodo(completedTodo);
    }
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    const items = Array.from(todos);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setTodos(items);
  };

  const completedTodos = todos.filter(todo => todo.completed);
  const pendingTodos = todos.filter(todo => !todo.completed && todo.status === 'pending');
  const inProgressTodos = todos.filter(todo => todo.status === 'in-progress');

  const stats = [
    {
      title: "Tasks Completed",
      value: completedTodos.length.toString(),
      icon: <FiCheck className="text-green-500" size={24} />,
      change: "+2"
    },
    {
      title: "In Progress",
      value: inProgressTodos.length.toString(),
      icon: <FiActivity className="text-blue-500" size={24} />
    },
    {
      title: "Pending Tasks",
      value: pendingTodos.length.toString(),
      icon: <FiClock className="text-yellow-500" size={24} />
    },
    {
      title: "Productivity",
      value: todos.length > 0
        ? `${Math.min(100, Math.floor((completedTodos.length / todos.length) * 100))}%`
        : "0%",
      icon: <FiAward className="text-purple-500" size={24} />
    }
  ];

  if (loading) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        <div className="flex-1 p-8 ml-0 md:ml-64 transition-all duration-300">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="space-y-4">
              <div className="h-20 bg-gray-200 rounded"></div>
              <div className="h-20 bg-gray-200 rounded"></div>
              <div className="h-20 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        <div className="flex-1 p-8 ml-0 md:ml-64 transition-all duration-300">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline"> {error}</span>
            <button 
              className="absolute top-0 bottom-0 right-0 px-4 py-3"
              onClick={() => setError(null)}
            >
              <svg className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <button
            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50 md:ml-56">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      
      <main className={`flex-1 p-4 md:p-8 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0 md:ml-20'}`}>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-blue-900">
              {section === 'profile' ? 'Profile' : 
               section === 'todo' ? 'All Tasks' :
               section === 'pending' ? 'Pending Tasks' :
               section === 'complete' ? 'Completed Tasks' : 'Dashboard'}
            </h1>
            <p className="text-gray-500">
              {currentTime.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
          <div className="bg-white p-3 rounded-lg shadow-sm mt-4 md:mt-0">
            <p className="text-lg font-semibold text-gray-700">
              {currentTime.toLocaleTimeString()}
            </p>
          </div>
        </div>

        {!section && (
          <>
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-6 mb-8 text-white relative overflow-hidden">
              <div className="relative z-10 max-w-md">
                <h2 className="text-2xl md:text-3xl font-bold mb-2">
                  Welcome back, {user?.fullName || 'Employee'}!
                </h2>
                <p className="mb-4 opacity-90">
                  {user?.designation || 'Team Member'} • You have {pendingTodos.length + inProgressTodos.length} tasks pending
                </p>
                <button className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-50 transition">
                  Quick Check-in
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-gray-500 text-sm">{stat.title}</p>
                      <p className="text-2xl font-bold mt-1">{stat.value}</p>
                    </div>
                    <div className="p-2 bg-gray-50 rounded-lg">
                      {stat.icon}
                    </div>
                  </div>
                  {stat.change && (
                    <p className="text-green-500 text-sm mt-2">
                      <span className="font-medium">{stat.change}</span> from yesterday
                    </p>
                  )}
                </div>
              ))}
            </div>
          </>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {section === 'attendance' && <CheckInOut />}
            {section === 'profile' && user && <Profile user_prop={user} />}
            
            {section === 'todo' && (
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="p-6 border-b flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-gray-800">All Tasks</h2>
                  <button 
                    onClick={fetchTodos}
                    className="flex items-center gap-2 bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition"
                  >
                    <FiRefreshCw size={16} />
                    Refresh
                  </button>
                </div>
                <AddTodo userId={id} onAdd={addNewTodo} />
                <PendingTodos
                  todos={pendingTodos}
                  editingId={editingId}
                  editText={editText}
                  onEditChange={setEditText}
                  onSaveEdit={saveEdit}
                  onStartEdit={startEditing}
                  onComplete={completeTodo}
                  onDelete={removeTodo}
                  onDragEnd={handleDragEnd}
                  onUpdate={updateTodo}
                  showHeader={true}
                />
                <CompletedTodos 
                  todos={completedTodos} 
                  onUpdate={updateTodo}
                  onDelete={removeTodo}
                  showHeader={true}
                />
              </div>
            )}

            {section === 'pending' && (
              <PendingTodos
              todos={pendingTodos}
              editingId={editingId}
              editText={editText}
              onEditChange={setEditText}
              onSaveEdit={saveEdit}
              onStartEdit={startEditing}
              onComplete={completeTodo}
              onDelete={removeTodo}
              onDragEnd={handleDragEnd}
              onUpdate={updateTodo}
              showHeader={true}
            />
            )}

            {section === 'complete' && (
              <CompletedTodos 
                todos={completedTodos} 
                onUpdate={updateTodo}
                onDelete={removeTodo}
                showHeader={true}
              />
            )}

            {!section && (
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Weekly Productivity</h2>
                <div className="h-64">
                  <div className="flex items-end h-48 space-x-2 mt-4">
                    {[30, 60, 45, 80, 65, 90, 70].map((height, index) => (
                      <div 
                        key={index} 
                        className="flex-1 bg-blue-100 hover:bg-blue-200 transition rounded-t"
                        style={{ height: `${height}%` }}
                      ></div>
                    ))}
                  </div>
                  <div className="flex justify-between mt-2 text-xs text-gray-500">
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                      <span key={day}>{day}</span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-8">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Activities</h2>
              <div className="space-y-4">
                {[
                  { action: "Completed 'Project Proposal'", time: "10:30 AM", date: "Today" },
                  { action: "Team standup meeting", time: "09:15 AM", date: "Today" },
                  { action: "Added new task 'Client Review'", time: "Yesterday", date: "4:45 PM" },
                  { action: "Completed 'API Documentation'", time: "Yesterday", date: "2:30 PM" }
                ].map((activity, index) => (
                  <div key={index} className="flex items-start">
                    <div className="bg-blue-100 p-2 rounded-full mr-3">
                      <FiActivity className="text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">{activity.action}</p>
                      <p className="text-sm text-gray-500">{activity.date} • {activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="text-blue-600 text-sm font-medium mt-4 w-full text-center">
                View All Activities
              </button>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
              <div className="grid grid-cols-2 gap-3">
                <button 
                  className="bg-blue-50 text-blue-600 p-3 rounded-lg flex flex-col items-center hover:bg-blue-100 transition"
                  onClick={() => window.location.href = `?section=attendance`}
                >
                  <FiClock size={20} className="mb-1" />
                  <span className="text-sm">Check In</span>
                </button>
                <button 
                  className="bg-green-50 text-green-600 p-3 rounded-lg flex flex-col items-center hover:bg-green-100 transition"
                  onClick={() => window.location.href = `?section=todo`}
                >
                  <FiPlus size={20} className="mb-1" />
                  <span className="text-sm">Add Task</span>
                </button>
                <button 
                  className="bg-purple-50 text-purple-600 p-3 rounded-lg flex flex-col items-center hover:bg-purple-100 transition"
                >
                  <FiBarChart2 size={20} className="mb-1" />
                  <span className="text-sm">Reports</span>
                </button>
                <button 
                  className="bg-yellow-50 text-yellow-600 p-3 rounded-lg flex flex-col items-center hover:bg-yellow-100 transition"
                  onClick={() => window.location.href = `?section=profile`}
                >
                  <FiUser size={20} className="mb-1" />
                  <span className="text-sm">Profile</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
}
export default Dashboard;

