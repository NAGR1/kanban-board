import { NavLink } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="navbar">
      <h2>TaskFlow</h2>

      <div className="nav-links">
        <NavLink to="/">Kanban Board</NavLink>
        <NavLink to="/dashboard">Dashboard</NavLink>
      </div>
    </nav>
  )
}

export default Navbar