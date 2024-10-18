import React, { useContext, useEffect, useState } from 'react'
import noteContext from '../context/notes/noteContext'
import Noteitem from './Noteitem';
const Notes = ({setAlert}) => {
  const context = useContext(noteContext);
  const [currentNote, setCurrentNote] = useState(null);
  const {notes, getallnotes} = context;

  useEffect(() => {
    getallnotes()
    // eslint-disable-next-line
  },[]);
  

  return (
    <div className='row'>
    <h2>Your Notes</h2>
    {notes.length === 0 && <div className='mx-2'>No notes to display</div>}
    {notes.map( (note)=>{
      return <Noteitem key = {note._id} note = {note} currentNote = {currentNote} setCurrentNote = {setCurrentNote} setAlert={setAlert}/>
    })}
  </div>
  )
}

export default Notes