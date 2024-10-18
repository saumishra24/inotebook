import React, { useEffect } from 'react'
import Notes from './Notes';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';
const Home = ({setAlert}) => {
  const navigate = useNavigate();
  useEffect(()=>{
    if(!localStorage.getItem('token'))
    navigate('/login');
  // eslint-disable-next-line
  },[])
  return (
    localStorage.getItem('token') && 
    <div>
      <AddNote setAlert ={setAlert}/>
      <Notes setAlert = {setAlert}/>
    </div>
  )
}

export default Home