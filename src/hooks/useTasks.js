import { useState, useEffect } from 'react'

const STORAGE_KEY = 'mobile-tasks'

const defaultTasks = [
  { id: 1, title: 'Vite + Reactのセットアップ', category: 'work', priority: 'high', completed: true, createdAt: Date.now() - 3600000 },
  { id: 2, 'title': '買い物: 牛乳、卵、パン', category: 'shopping', priority: 'medium', completed: false, createdAt: Date.now() - 1800000 },
  { id: 3, title: 'ランニング 30分', category: 'personal', priority: 'low', completed: false, createdAt: Date.now() - 900000 },
]

function loadTasks() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : defaultTasks
  } catch {
    return defaultTasks
  }
}

export function useTasks() {
  const [tasks, setTasks] = useState(loadTasks)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
  }, [tasks])

  const addTask = ({ title, category, priority }) => {
    setTasks(prev => [
      {
        id: Date.now(),
        title: title.trim(),
        category,
        priority,
        completed: false,
        createdAt: Date.now(),
      },
      ...prev,
    ])
  }

  const toggleTask = (id) => {
    setTasks(prev =>
      prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t)
    )
  }

  const deleteTask = (id) => {
    setTasks(prev => prev.filter(t => t.id !== id))
  }

  const clearCompleted = () => {
    setTasks(prev => prev.filter(t => !t.completed))
  }

  return { tasks, addTask, toggleTask, deleteTask, clearCompleted }
}
