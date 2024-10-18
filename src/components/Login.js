import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from "react-router-dom";

const Login = ({ setAlert }) => {
  const [formData, setFormData] = useState({ email: "", password: "" })
  const navigate = useNavigate();
  useEffect(()=>{
    if(localStorage.getItem('token'))
    navigate('/');
  // eslint-disable-next-line
  },[])
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    const json = await response.json();
    if (json.success) {
      //save the authToken and redirect
      localStorage.setItem('token', json.authToken);
      setAlert("success", "Logged in successfully");
      navigate('/');
    }
    else {
      setAlert("danger", "Invalid credentials");
    }
    console.log(json);
  }

  return (
    !localStorage.getItem('token') &&
    <div className='container my-5 d-flex justify-content-center'>
      <div className="card my-4" style={{width:"450px", minWidth: "350px"}}>
        <div className="card-body">
          <h3 className="card-title text-center my-3 mb-4">Sign in to your account</h3>
          <form className='my-3' onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email address</label>
              <input type="email" className="form-control" value={formData.email} id="email" name='email' onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input type="password" className="form-control" value={formData.password} id="password" name='password' onChange={handleChange} />
            </div>
            <button type="submit" className="btn btn-primary">Login</button>
          </form>
          <div className='text-center'>
            Don't have an account? <NavLink to='/signup'>Create new</NavLink>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login