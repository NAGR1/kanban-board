import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import KanbanBoard from './pages/KanbanBoard'
import Dashboard from './pages/Dashboard'
import { defaultCategories } from './data'
import './App.css'

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('kanbanTasks')
    return savedTasks ? JSON.parse(savedTasks) : []
  })

  const [categories, setCategories] = useState(() => {
    const savedCategories = localStorage.getItem('kanbanCategories')
    return savedCategories
      ? JSON.parse(savedCategories)
      : defaultCategories
  })

  useEffect(() => {
    localStorage.setItem('kanbanTasks', JSON.stringify(tasks))
  }, [tasks])

  useEffect(() => {
    localStorage.setItem('kanbanCategories', JSON.stringify(categories))
  }, [categories])

  return (
    <BrowserRouter>
      <Navbar />

      <main className="main-content">
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
      </main>
    </BrowserRouter>
  )
}

export default App