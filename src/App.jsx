import { useEffect, useState } from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import KanbanBoard from './pages/KanbanBoard'
import Dashboard from './pages/Dashboard'
import { defaultCategories } from './data'

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks')

    try {
      return savedTasks ? JSON.parse(savedTasks) : []
    } catch {
      return []
    }
  })

  const [categories, setCategories] = useState(() => {
    const savedCategories = localStorage.getItem('categories')

    try {
      return savedCategories
        ? JSON.parse(savedCategories)
        : defaultCategories
    } catch {
      return defaultCategories
    }
  })

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  useEffect(() => {
    localStorage.setItem('categories', JSON.stringify(categories))
  }, [categories])

  return (
    <HashRouter>
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={
            <KanbanBoard
              tasks={tasks}
              setTasks={setTasks}
              categories={categories}
              setCategories={setCategories}
            />
          }
        />

        <Route
          path="/dashboard"
          element={<Dashboard tasks={tasks} />}
        />
      </Routes>
    </HashRouter>
  )
}

export default App