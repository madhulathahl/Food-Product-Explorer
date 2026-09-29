import { NavLink } from 'react-router-dom'

export function Navbar() {
  return (
    <header className="site-header">
      <div className="nav-inner">
        <NavLink className="brand" to="/products" aria-label="Food Explorer home">
          <span className="brand-mark" aria-hidden="true">f</span>
          <span>Food Explorer</span>
        </NavLink>
        <nav className="primary-nav" aria-label="Main navigation">
          <NavLink to="/products" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Products</NavLink>
          <NavLink to="/about" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>About</NavLink>
        </nav>
      </div>
    </header>
  )
}