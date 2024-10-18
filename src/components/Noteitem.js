import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext'

const Noteitem = (props) => {
  const { note, currentNote, setCurrentNote, setAlert } = props;
  const context = useContext(noteContext);
  const { editnote, deletenote } = context;

  const handleClick = () => {
    setCurrentNote(note);
  }
  const handleChange = (e) => {
    setCurrentNote({ ...currentNote, [e.target.name]: e.target.value });
  }
  const handleDelete = () => {
    setAlert("success", "Note has been deleted");
    deletenote(currentNote._id);
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    setAlert("success", "Note has been edited");
    await editnote(currentNote);
  }
  return (
    <div className='col-md-4'>
      <div className="card my-3">
        <div className="card-body">
          <div className="d-flex justify-content-between">
            <h5 className="card-title">{note.title}</h5>
            <div>
              <i className="fa-solid fa-pen-to-square mx-3" data-bs-toggle="modal" data-bs-target="#editModal" onClick={handleClick}></i>
              <i className="fa-solid fa-trash" data-bs-toggle="modal" data-bs-target="#deleteModal" onClick={handleClick}></i>
            </div>
          </div>
          <p className="card-text">{note.description}</p>
        </div>
      </div>


      {/* MODAL for editing a note */}
      <div className="modal fade" id="editModal" tabIndex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="editModalLabel">Update note</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">

              <form className='my-3'>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title</label>
                  <input type="text" className="form-control" id="etitle" name='title' value={currentNote ? currentNote.title : ''} onChange={handleChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <input type="text" className="form-control" id="edescription" name='description' value={currentNote ? currentNote.description : ''} onChange={handleChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">Tag</label>
                  <input type="text" className="form-control" id="etag" name='tag' value={currentNote ? currentNote.tag : ''} onChange={handleChange} />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" disabled={currentNote && (currentNote.title.length<3 || currentNote.description.length<5)} className="btn btn-primary" data-bs-dismiss="modal" onClick={handleSubmit}>Save changes</button>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL for deleting a note */}
      <div className="modal fade" id="deleteModal" tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-sm modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="deleteModalLabel">Delete note</h1>
            </div>
            <div className='modal-body'>
              <div>Are you sure you want to delete?</div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-outline-secondary" data-bs-dismiss="modal">Cancel</button>
              <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleDelete}>Delete</button>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Noteitem