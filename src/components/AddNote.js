import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext'


const AddNote = ({setAlert}) => {
  const [note, setnote] = useState({title: "", description: "", tag:""})
  const context = useContext(noteContext);
  const {addnote} = context;
  
  const handleChange = (e) =>{
    setnote({...note, [e.target.name] : e.target.value});
  }

  const handleSubmit = async (e) =>{
    e.preventDefault();
    await addnote(note);
    setAlert("success", " New note has been created");
    setnote({title: "", description: "", tag:""});
  }

  return (
    <div className='container my-5'>
    <h2 className='my-3'>Create Note</h2> 
    <form className='my-2' onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="title" className="form-label">Title</label>
        <input type="text" className="form-control" id="title" name='title' value={note.title} onChange={handleChange}/>
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">Description</label>
        <input type="text" className="form-control" id="description" name='description' value={note.description} onChange={handleChange}/>
      </div>
      <div className="mb-3">
        <label htmlFor="tag" className="form-label">Tag</label>
        <input type="text" className="form-control" id="tag" name='tag' value={note.tag} onChange={handleChange}/>
      </div>
      <button type="submit" disabled={note.title.length<3 || note.description.length<5} className="btn btn-primary">Add Note</button>
    </form>
  </div>
  )
}

export default AddNote