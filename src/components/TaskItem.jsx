import { useState, useRef } from 'react'

const CATEGORY_EMOJI = {
  work: '💼',
  personal: '🏠',
  shopping: '🛒',
  health: '💪',
}

const PRIORITY_COLOR = {
  high: '#ef4444',
  medium: '#f59e0b',
  low: '#22c55e',
}

export default function TaskItem({ task, onToggle, onDelete }) {
  const [swiped, setSwiped] = useState(false)
  const startX = useRef(null)

  const handleTouchStart = (e) => {
    startX.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e) => {
    if (startX.current === null) return
    const diff = startX.current - e.changedTouches[0].clientX
    if (diff > 60) setSwiped(true)
    else if (diff < -20) setSwiped(false)
    startX.current = null
  }

  return (
    <div
      className={`task-wrapper ${swiped ? 'swiped' : ''}`}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className={`task-item ${task.completed ? 'completed' : ''}`}
        onClick={() => onToggle(task.id)}
      >
        <div
          className="priority-bar"
          style={{ backgroundColor: PRIORITY_COLOR[task.priority] }}
        />
        <div className="task-check">
          {task.completed ? (
            <span className="checkmark">✓</span>
          ) : (
            <span className="circle" />
          )}
        </div>
        <div className="task-content">
          <span className="task-title">{task.title}</span>
          <span className="task-meta">
            {CATEGORY_EMOJI[task.category]}
          </span>
        </div>
      </div>
      <button
        className="delete-btn"
        onClick={() => onDelete(task.id)}
        aria-label="削除"
      >
        🗑
      </button>
    </div>
  )
}
