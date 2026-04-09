import { useState } from 'react'

const CATEGORIES = [
  { value: 'work', label: '仕事', emoji: '💼' },
  { value: 'personal', label: '個人', emoji: '🏠' },
  { value: 'shopping', label: '買い物', emoji: '🛒' },
  { value: 'health', label: '健康', emoji: '💪' },
]

const PRIORITIES = [
  { value: 'high', label: '高', color: '#ef4444' },
  { value: 'medium', label: '中', color: '#f59e0b' },
  { value: 'low', label: '低', color: '#22c55e' },
]

export default function AddTask({ onAdd, onClose }) {
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('personal')
  const [priority, setPriority] = useState('medium')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title.trim()) return
    onAdd({ title, category, priority })
    onClose()
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>新しいタスク</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label>タスク名</label>
            <input
              autoFocus
              type="text"
              placeholder="何をする？"
              value={title}
              onChange={e => setTitle(e.target.value)}
              maxLength={100}
            />
          </div>

          <div className="field">
            <label>カテゴリ</label>
            <div className="chip-group">
              {CATEGORIES.map(c => (
                <button
                  key={c.value}
                  type="button"
                  className={`chip ${category === c.value ? 'active' : ''}`}
                  onClick={() => setCategory(c.value)}
                >
                  {c.emoji} {c.label}
                </button>
              ))}
            </div>
          </div>

          <div className="field">
            <label>優先度</label>
            <div className="chip-group">
              {PRIORITIES.map(p => (
                <button
                  key={p.value}
                  type="button"
                  className={`chip priority-chip ${priority === p.value ? 'active' : ''}`}
                  style={priority === p.value ? { backgroundColor: p.color, borderColor: p.color } : { borderColor: p.color, color: p.color }}
                  onClick={() => setPriority(p.value)}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="submit-btn"
            disabled={!title.trim()}
          >
            追加する
          </button>
        </form>
      </div>
    </div>
  )
}
