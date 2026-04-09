const FILTERS = [
  { value: 'all', label: 'すべて' },
  { value: 'active', label: '未完了' },
  { value: 'completed', label: '完了' },
]

const CATEGORIES = [
  { value: 'all', label: '全部', emoji: '📋' },
  { value: 'work', label: '仕事', emoji: '💼' },
  { value: 'personal', label: '個人', emoji: '🏠' },
  { value: 'shopping', label: '買い物', emoji: '🛒' },
  { value: 'health', label: '健康', emoji: '💪' },
]

export default function FilterBar({ status, category, onStatusChange, onCategoryChange }) {
  return (
    <div className="filter-bar">
      <div className="filter-row">
        {FILTERS.map(f => (
          <button
            key={f.value}
            className={`filter-btn ${status === f.value ? 'active' : ''}`}
            onClick={() => onStatusChange(f.value)}
          >
            {f.label}
          </button>
        ))}
      </div>
      <div className="category-row">
        {CATEGORIES.map(c => (
          <button
            key={c.value}
            className={`category-btn ${category === c.value ? 'active' : ''}`}
            onClick={() => onCategoryChange(c.value)}
          >
            {c.emoji} {c.label}
          </button>
        ))}
      </div>
    </div>
  )
}
