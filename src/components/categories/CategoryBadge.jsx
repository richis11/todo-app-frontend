export default function CategoryBadge({ category, onDelete }) {
  return (
    <div
      className="flex items-center gap-1.5 text-xs px-3 py-1 rounded-full border"
      style={{
        backgroundColor: category.color + '20',
        color: category.color,
        borderColor: category.color + '50',
      }}
    >
      <span>{category.name}</span>
      <button
        onClick={onDelete}
        className="hover:opacity-70 transition ml-1"
        title="Eliminar categoría"
      >
        ×
      </button>
    </div>
  );
}