import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../hooks/useTheme';
import { getTasks, createTask, updateTask, deleteTask } from '../api/tasks';
import { getCategories, createCategory, deleteCategory } from '../api/categories';
import TaskCard from '../components/tasks/TaskCard';
import TaskModal from '../components/tasks/TaskModal';
import CategoryBadge from '../components/categories/CategoryBadge';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const [tasks, setTasks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ status: '', priority: '', search: '' });
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const fetchTasks = async () => {
    try {
      const { data } = await getTasks(filters);
      setTasks(data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchCategories = async () => {
    try {
      const { data } = await getCategories();
      setCategories(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      await Promise.all([fetchTasks(), fetchCategories()]);
      setLoading(false);
    };
    init();
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [filters]);

  const handleSaveTask = async (formData) => {
    if (editingTask) {
      await updateTask(editingTask.id, formData);
    } else {
      await createTask(formData);
    }
    setShowTaskModal(false);
    setEditingTask(null);
    fetchTasks();
  };

  const handleToggleStatus = async (task) => {
    await updateTask(task.id, {
      status: task.status === 'pending' ? 'completed' : 'pending',
    });
    fetchTasks();
  };

  const handleDeleteTask = async (id) => {
    if (confirm('¿Eliminar esta tarea?')) {
      await deleteTask(id);
      fetchTasks();
    }
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setShowTaskModal(true);
  };

  const pendingCount = tasks.filter((t) => t.status === 'pending').length;
  const completedCount = tasks.filter((t) => t.status === 'completed').length;

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-base)', color: 'var(--text-primary)' }}>
      {/* Navbar */}
      <nav style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border)' }} className="border-b px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-sm font-bold text-white">T</div>
          <span className="font-semibold text-lg" style={{ color: 'var(--text-primary)' }}>TodoApp</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>Hola, {user?.name}</span>
          <button
            onClick={toggleTheme}
            className="w-9 h-9 rounded-lg flex items-center justify-center transition hover:opacity-80"
            style={{ backgroundColor: 'var(--bg-elevated)', color: 'var(--text-primary)' }}
            title="Cambiar tema"
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
          <button
            onClick={logout}
            className="text-sm transition hover:opacity-70"
            style={{ color: 'var(--text-secondary)' }}
          >
            Cerrar sesión
          </button>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="rounded-xl p-4 border" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border)' }}>
            <p className="text-sm mb-1" style={{ color: 'var(--text-muted)' }}>Total</p>
            <p className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>{tasks.length}</p>
          </div>
          <div className="rounded-xl p-4 border" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border)' }}>
            <p className="text-sm mb-1" style={{ color: 'var(--text-muted)' }}>Pendientes</p>
            <p className="text-3xl font-bold text-yellow-400">{pendingCount}</p>
          </div>
          <div className="rounded-xl p-4 border" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border)' }}>
            <p className="text-sm mb-1" style={{ color: 'var(--text-muted)' }}>Completadas</p>
            <p className="text-3xl font-bold text-green-400">{completedCount}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-6">
          <input
            type="text"
            placeholder="Buscar tareas..."
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            className="flex-1 min-w-48 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition border"
            style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
          />
          <select
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            className="rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition border"
            style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
          >
            <option value="">Todos los estados</option>
            <option value="pending">Pendiente</option>
            <option value="completed">Completada</option>
          </select>
          <select
            value={filters.priority}
            onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
            className="rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition border"
            style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
          >
            <option value="">Todas las prioridades</option>
            <option value="low">Baja</option>
            <option value="medium">Media</option>
            <option value="high">Alta</option>
          </select>
          <button
            onClick={() => { setEditingTask(null); setShowTaskModal(true); }}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-2 rounded-lg text-sm transition"
          >
            + Nueva tarea
          </button>
        </div>

        {/* Categories */}
        {categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {categories.map((cat) => (
              <CategoryBadge key={cat.id} category={cat} onDelete={() => {
                deleteCategory(cat.id).then(fetchCategories);
              }} />
            ))}
          </div>
        )}

        {/* Tasks */}
        {loading ? (
          <div className="text-center py-20" style={{ color: 'var(--text-muted)' }}>Cargando tareas...</div>
        ) : tasks.length === 0 ? (
          <div className="text-center py-20" style={{ color: 'var(--text-muted)' }}>
            <p className="text-lg mb-2">No hay tareas aún</p>
            <p className="text-sm">Crea tu primera tarea con el botón de arriba</p>
          </div>
        ) : (
          <div className="space-y-3">
            {tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onToggle={() => handleToggleStatus(task)}
                onEdit={() => handleEditTask(task)}
                onDelete={() => handleDeleteTask(task.id)}
              />
            ))}
          </div>
        )}
      </div>

      {showTaskModal && (
        <TaskModal
          task={editingTask}
          categories={categories}
          onSave={handleSaveTask}
          onClose={() => { setShowTaskModal(false); setEditingTask(null); }}
          onCreateCategory={async (data) => {
            await createCategory(data);
            fetchCategories();
          }}
        />
      )}
    </div>
  );
}