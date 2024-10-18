import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
const Navbar = ({setAlert}) => {
  const navigate = useNavigate();
  const handleLogout = () =>{
    localStorage.removeItem('token');
    setAlert('success', 'Logged out successfully')
    navigate('/login');
  }
  return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
        <div className="container-fluid">
          <div className="navbar-brand">inotebook</div>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to="/">Home</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/about">About</NavLink>
              </li>
            </ul>
          </div>
          {localStorage.getItem('token') &&
          <button className="btn btn-primary mx-2" aria-disabled="true" onClick={handleLogout}>Logout</button>
          }
        </div>
      </nav>
  )
}

export default Navbar