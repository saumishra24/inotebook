import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const [notes, setNotes] = useState([])

  // Get all Notes
  const getallnotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchall`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token'),
      }
    })
    const data = await response.json();
    setNotes(data);
  }

  //ADD a note
  const addnote = async({ title, description, tag }) => {
    //API call
    var data ={title: title, description: description}
    if(tag!==''){
      data.tag = tag
    }
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token'),
      },
      body: JSON.stringify(data)
    })
    const note = await response.json();
    setNotes(notes.concat(note));
  }

  //DELETE a note
  const deletenote = async(id) => {
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token'),
      }
    })
    const res = await response.json();
    console.log(res);
    const newNotes = notes.filter((note) => note._id !== id);
    setNotes(newNotes);
  }

  //EDIT a note
  const editnote = async({_id:id, title, description, tag}) => {
    // API call
    var data ={title: title, description: description}
    if(tag!==''){
      data.tag = tag
    }
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token'),
      },
      body: JSON.stringify(data)
    })
    const res = await response.json();
 

    //client side edit
      setNotes(prevData => {
        return prevData.map(note => {
          if (note._id === id) {
            return { ...note, title: title, description:description, tag:tag}; 
          }
          return note;
        });
      });
   console.log("Note has been updated", res);
  }




  return (
    <NoteContext.Provider value={{ notes, addnote, deletenote, editnote, getallnotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;