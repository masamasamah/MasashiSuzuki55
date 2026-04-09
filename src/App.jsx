import { useState, useMemo } from 'react'
import { useTasks } from './hooks/useTasks'
import AddTask from './components/AddTask'
import TaskItem from './components/TaskItem'
import FilterBar from './components/FilterBar'
import './App.css'

export default function App() {
  const { tasks, addTask, toggleTask, deleteTask, clearCompleted } = useTasks()
  const [showAdd, setShowAdd] = useState(false)
  const [status, setStatus] = useState('all')
  const [category, setCategory] = useState('all')

  const filtered = useMemo(() => {
    return tasks.filter(t => {
      const matchStatus =
        status === 'all' ||
        (status === 'active' && !t.completed) ||
        (status === 'completed' && t.completed)
      const matchCategory = category === 'all' || t.category === category
      return matchStatus && matchCategory
    })
  }, [tasks, status, category])

  const completedCount = tasks.filter(t => t.completed).length
  const totalCount = tasks.length

  return (
    <div className="app">
      <header className="header">
        <div className="header-top">
          <h1>📝 タスク管理</h1>
          <div className="progress-text">
            {completedCount} / {totalCount} 完了
          </div>
        </div>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: totalCount ? `${(completedCount / totalCount) * 100}%` : '0%' }}
          />
        </div>
      </header>

      <FilterBar
        status={status}
        category={category}
        onStatusChange={setStatus}
        onCategoryChange={setCategory}
      />

      <main className="main">
        {filtered.length === 0 ? (
          <div className="empty">
            <div className="empty-icon">✅</div>
            <p>タスクがありません</p>
            <p className="empty-sub">右下の＋ボタンで追加しよう</p>
          </div>
        ) : (
          <ul className="task-list">
            {filtered.map(task => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={toggleTask}
                onDelete={deleteTask}
              />
            ))}
          </ul>
        )}

        {completedCount > 0 && status !== 'active' && (
          <button className="clear-btn" onClick={clearCompleted}>
            完了済みを削除 ({completedCount})
          </button>
        )}
      </main>

      <button className="fab" onClick={() => setShowAdd(true)} aria-label="タスクを追加">
        +
      </button>

      {showAdd && (
        <AddTask onAdd={addTask} onClose={() => setShowAdd(false)} />
      )}
    </div>
  )
}
