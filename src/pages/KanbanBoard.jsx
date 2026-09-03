import { useState } from 'react'
import TaskCard from '../components/TaskCard'
import TaskForm from '../components/TaskForm'

const statuses = ['TO DO', 'DOING', 'DONE']

function getToday() {
  return new Date().toISOString().split('T')[0]
}

function KanbanBoard({
  tasks,
  setTasks,
  categories,
  setCategories,
}) {
  const [showForm, setShowForm] = useState(false)
  const [editingTask, setEditingTask] = useState(null)
  const [deletingTaskId, setDeletingTaskId] = useState(null)

  function openCreateForm() {
    setEditingTask(null)
    setShowForm(true)
  }

  function openEditForm(task) {
    setEditingTask(task)
    setShowForm(true)
  }

  function closeForm() {
    setEditingTask(null)
    setShowForm(false)
  }

  function saveTask(formData) {
    if (editingTask) {
      setTasks((currentTasks) =>
        currentTasks.map((task) => {
          if (task.id !== editingTask.id) {
            return task
          }

          return {
            ...formData,
            id: task.id,
            completeDate:
              formData.status === 'DONE'
                ? task.completeDate || getToday()
                : '',
          }
        }),
      )
    } else {
      const newTask = {
        ...formData,
        id: Date.now(),
        completeDate:
          formData.status === 'DONE' ? getToday() : '',
      }

      setTasks((currentTasks) => [...currentTasks, newTask])
    }

    closeForm()
  }

  function requestDelete(taskId) {
    setDeletingTaskId(taskId)
  }

  function confirmDelete() {
    setTasks((currentTasks) =>
      currentTasks.filter(
        (task) => task.id !== deletingTaskId,
      ),
    )

    setDeletingTaskId(null)
  }

  function cancelDelete() {
    setDeletingTaskId(null)
  }

  function moveTask(taskId, newStatus) {
    setTasks((currentTasks) =>
      currentTasks.map((task) => {
        if (task.id !== taskId) {
          return task
        }

        return {
          ...task,
          status: newStatus,
          completeDate:
            newStatus === 'DONE'
              ? task.completeDate || getToday()
              : '',
        }
      }),
    )
  }

  function addCategory(newCategory) {
    const categoryExists = categories.some(
      (category) =>
        category.toLowerCase() === newCategory.toLowerCase(),
    )

    if (categoryExists) {
      return false
    }

    setCategories((currentCategories) => [
      ...currentCategories,
      newCategory,
    ])

    return true
  }

  return (
    <section>
      <div className="page-heading">
        <div>
          <h1>Kanban Board</h1>
          <p>Create, organize and track your team’s tasks.</p>
        </div>

        <button
          className="primary-button"
          onClick={openCreateForm}
        >
          + Add Task
        </button>
      </div>

      <div className="kanban-board">
        {statuses.map((status) => {
          const columnTasks = tasks.filter(
            (task) => task.status === status,
          )

          const columnClass = status
            .toLowerCase()
            .replace(' ', '-')

          return (
            <div
              className={`kanban-column ${columnClass}`}
              key={status}
            >
              <div className="column-heading">
                <h2>{status}</h2>
                <span>{columnTasks.length}</span>
              </div>

              <div className="task-list">
                {columnTasks.length === 0 ? (
                  <p className="empty-column">No tasks</p>
                ) : (
                  columnTasks.map((task) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      onEdit={openEditForm}
                      onDelete={requestDelete}
                      onMove={moveTask}
                    />
                  ))
                )}
              </div>
            </div>
          )
        })}
      </div>

      {showForm && (
        <TaskForm
          editingTask={editingTask}
          categories={categories}
          onSave={saveTask}
          onCancel={closeForm}
          onAddCategory={addCategory}
        />
      )}

      {deletingTaskId !== null && (
        <div className="confirm-overlay">
          <div className="confirm-dialog">
            <div className="confirm-icon">!</div>

            <h2>Delete Task?</h2>

            <p>
              Are you sure you want to delete this task?
              This action cannot be undone.
            </p>

            <div className="confirm-actions">
              <button
                className="confirm-cancel"
                onClick={cancelDelete}
              >
                Cancel
              </button>

              <button
                className="confirm-delete"
                onClick={confirmDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default KanbanBoard