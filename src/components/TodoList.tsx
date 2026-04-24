import { useState } from "react";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export function TodoList({ initialTodos = [] }: { initialTodos?: Todo[] }) {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [newTodo, setNewTodo] = useState("");

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, { id: Date.now(), text: newTodo.trim(), completed: false }]);
      setNewTodo("");
    }
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(t => t.id !== id));
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg border border-gray-100">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Todo List</h1>
      
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          data-testid="todo-input"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="What needs to be done?"
          className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700"
        />
        <button 
          data-testid="add-button" 
          onClick={addTodo}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
        >
          Add
        </button>
      </div>

      <ul data-testid="todo-list" className="space-y-3">
        {todos.map(todo => (
          <li 
            key={todo.id} 
            data-testid="todo-item"
            className={`flex items-center justify-between p-3 rounded-lg border ${todo.completed ? 'bg-gray-50 border-gray-100' : 'bg-white border-gray-200'}`}
          >
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                data-testid="todo-checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
                className="w-5 h-5 cursor-pointer"
              />
              <span 
                data-testid="todo-text"
                className={`text-gray-700 ${todo.completed ? 'line-through text-gray-400' : ''}`}
              >
                {todo.text}
              </span>
            </div>
            <button
              data-testid="delete-button"
              onClick={() => deleteTodo(todo.id)}
              className="text-red-400 hover:text-red-600 font-medium text-sm"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      <div data-testid="todo-count" className="mt-6 pt-4 border-t text-sm text-gray-500 font-medium">
        {todos.length} items ({todos.filter(t => t.completed).length} completed)
      </div>
    </div>
  );
}