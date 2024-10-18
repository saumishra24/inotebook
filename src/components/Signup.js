import React, { useState, useEffect} from 'react'
import { useNavigate, NavLink } from "react-router-dom";
import { validateSignup } from '../utils/ValidateSignup';

const Signup = ({ setAlert }) => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "", cpassword: "" })
  const [matchError, setMatchError] = useState(false);
  const navigate = useNavigate();
  useEffect(()=>{
    if(localStorage.getItem('token'))
    navigate('/');
  // eslint-disable-next-line
  },[])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
  const handleFocus = () => {
    setMatchError(false);
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateSignup(formData);
    if(validationError){
      setAlert("danger", validationError);
      return ;
    }
    if (formData.password !== formData.cpassword) {
      setMatchError(true);
      return;
    }
    const { name, email, password } = formData;
    const response = await fetch("http://localhost:5000/api/auth/signup", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, password })
    })
    const json = await response.json();
    console.log(password, json);
    if (json.success) {
      //save the authToken and redirect
      setAlert("success", "Account created successfully");
      localStorage.setItem('token', json.authToken);
      navigate('/');
    }
    else {
      setAlert("danger", json.error);
    }
  }

  return (
    !localStorage.getItem('token') && 
    <div className='container my-5 d-flex justify-content-center'>
      <div className="card my-4" style={{ width: "450px", minWidth: "350px" }}>
        <div className="card-body">
          <h3 className="card-title text-center my-3 mb-4">Create new account</h3>
          <form className='my-3' onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input type="text" className="form-control" value={formData.name} id="name" name='name' onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email address</label>
              <input type="email" className="form-control" value={formData.email} id="email" name='email' onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input type="password" className="form-control" value={formData.password} id="password" name='password' onChange={handleChange} onFocus={handleFocus} />
            </div>
            <div className="mb-3">
              <label htmlFor="cpassword" className="form-label">Confirm password</label>
              <input type="password" className={`form-control ${matchError?'is-invalid':''}`} value={formData.cpassword} id="cpassword" name='cpassword' onChange={handleChange} onFocus={handleFocus} />
              <div  id="cpasswordFeedback" className="invalid-feedback">
                Passwords do not match
              </div>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
          <div className='text-center'>
            Already have an account? <NavLink to='/login'>Login</NavLink>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup