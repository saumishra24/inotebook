import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from './components/About';
import Home from './components/Home';
import Navbar from './components/Navbar';
import NoteState from './context/notes/NoteState';
import Login from './components/Login';
import Signup from './components/Signup';
import Alert from './components/Alert';
import { useState } from 'react';
import ErrorPage from './components/ErrorPage';

function App() {
  const [alert, setAlert] = useState(null)
  const setAlertValues = (type, message) =>{
    setAlert({type:type, message:message});
  }
  return (
    <div>
      <NoteState>
        <Router>
          <Navbar setAlert={setAlertValues}/>
          {alert && <Alert alert={alert}/>}
          <div className='container'>
            <Routes>
              <Route path="/" element={<Home setAlert={setAlertValues}/>} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login setAlert={setAlertValues}/>} />
              <Route path="/signup" element={<Signup setAlert={setAlertValues}/>} />
              <Route path='*' element={<ErrorPage/>} />
            </Routes>
          </div>
        </Router>
      </NoteState>
    </div>
  );
}

export default App;
