import { useEffect, useState } from 'react'
import { responsiblePersons } from '../data'

const emptyTask = {
  title: '',
  description: '',
  category: '',
  startDate: '',
  dueDate: '',
  responsiblePerson: '',
  status: 'TO DO',
}

function TaskForm({
  editingTask,
  categories,
  onSave,
  onCancel,
  onAddCategory,
}) {
  const [formData, setFormData] = useState(emptyTask)
  const [newCategory, setNewCategory] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    setFormData(editingTask || emptyTask)
    setError('')
  }, [editingTask])

  function handleChange(event) {
    const { name, value } = event.target

    setFormData((current) => ({
      ...current,
      [name]: value,
    }))
  }

  function handleSubmit(event) {
    event.preventDefault()

    if (
      !formData.title.trim() ||
      !formData.category ||
      !formData.startDate ||
      !formData.dueDate ||
      !formData.responsiblePerson
    ) {
      setError('Please complete all required fields.')
      return
    }

    if (formData.dueDate < formData.startDate) {
      setError('The due date cannot be before the start date.')
      return
    }

    onSave(formData)
    setFormData(emptyTask)
    setError('')
  }

  function handleAddCategory() {
    const category = newCategory.trim()

    if (!category) {
      return
    }

    const added = onAddCategory(category)

    if (added) {
      setFormData((current) => ({
        ...current,
        category,
      }))
      setNewCategory('')
      setError('')
    } else {
      setError('This category already exists.')
    }
  }

  return (
    <div className="form-overlay">
      <form className="task-form" onSubmit={handleSubmit}>
        <div className="form-heading">
          <h2>{editingTask ? 'Edit Task' : 'Create New Task'}</h2>
          <button type="button" className="close-button" onClick={onCancel}>
            ×
          </button>
        </div>

        {error && <p className="form-error">{error}</p>}

        <label>
          Title *
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter the task title"
          />
        </label>

        <label>
          Description
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter the task description"
            rows="3"
          />
        </label>

        <label>
          Category *
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="">Select a category</option>

            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>

        <div className="new-category">
          <input
            value={newCategory}
            onChange={(event) => setNewCategory(event.target.value)}
            placeholder="Add a new category"
          />

          <button type="button" onClick={handleAddCategory}>
            Add
          </button>
        </div>

        <div className="date-fields">
          <label>
            Start date *
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
            />
          </label>

          <label>
            Due date *
            <input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
            />
          </label>
        </div>

        <label>
          Responsible person *
          <select
            name="responsiblePerson"
            value={formData.responsiblePerson}
            onChange={handleChange}
          >
            <option value="">Select a person</option>

            {responsiblePersons.map((person) => (
              <option key={person.id} value={person.name}>
                {person.name}
              </option>
            ))}
          </select>
        </label>

        <label>
          Status
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="TO DO">TO DO</option>
            <option value="DOING">DOING</option>
            <option value="DONE">DONE</option>
          </select>
        </label>

        <div className="form-actions">
          <button type="button" className="cancel-button" onClick={onCancel}>
            Cancel
          </button>

          <button type="submit" className="save-button">
            {editingTask ? 'Save Changes' : 'Create Task'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default TaskForm