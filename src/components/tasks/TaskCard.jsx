export default function TaskCard({ task, onToggle, onEdit, onDelete }) {
  const priorityStyles = {
    low: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    medium: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
    high: 'bg-red-500/10 text-red-400 border-red-500/20',
  };

  const priorityLabels = { low: 'Baja', medium: 'Media', high: 'Alta' };

  const formatDate = (date) => {
  if (!date) return null;
  const [year, month, day] = date.split('T')[0].split('-');
  return `${day}/${month}/${year}`;
};

  return (
    <div
      className="rounded-xl p-4 flex items-start gap-4 transition border"
      style={{
        backgroundColor: 'var(--bg-surface)',
        borderColor: 'var(--border)',
        opacity: task.status === 'completed' ? 0.6 : 1,
      }}
    >
      {/* Checkbox */}
      <button
        onClick={onToggle}
        className={`mt-0.5 w-5 h-5 rounded-full border-2 shrink-0 flex items-center justify-center transition ${
          task.status === 'completed'
            ? 'bg-green-500 border-green-500'
            : 'border-gray-500 hover:border-indigo-500'
        }`}
      >
        {task.status === 'completed' && (
          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        )}
      </button>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <h3
            className="font-medium"
            style={{
              color: task.status === 'completed' ? 'var(--text-muted)' : 'var(--text-primary)',
              textDecoration: task.status === 'completed' ? 'line-through' : 'none',
            }}
          >
            {task.title}
          </h3>
          <span className={`text-xs px-2 py-0.5 rounded-full border shrink-0 ${priorityStyles[task.priority]}`}>
            {priorityLabels[task.priority]}
          </span>
        </div>

        {task.description && (
          <p className="text-sm mt-1 truncate" style={{ color: 'var(--text-secondary)' }}>
            {task.description}
          </p>
        )}

        <div className="flex items-center gap-3 mt-2 flex-wrap">
          {task.dueDate && (
            <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
              📅 {formatDate(task.dueDate)}
            </span>
          )}
          {task.categories?.map((cat) => (
            <span
              key={cat.id}
              className="text-xs px-2 py-0.5 rounded-full"
              style={{ backgroundColor: cat.color + '20', color: cat.color }}
            >
              {cat.name}
            </span>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={onEdit}
          className="hover:text-indigo-400 transition"
          style={{ color: 'var(--text-muted)' }}
          title="Editar"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </button>
        <button
          onClick={onDelete}
          className="hover:text-red-400 transition"
          style={{ color: 'var(--text-muted)' }}
          title="Eliminar"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>
  );
}