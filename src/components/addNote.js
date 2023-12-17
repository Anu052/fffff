import React from 'react'
import noteContext from '../context/notes/noteContext';
import { useContext } from 'react';
import { useState } from 'react';
function AddNote() {
const context=useContext(noteContext);
const {addNote}=context;
const [note, setNote] = useState({ title: "", description: "", tag: "" })
const handleclick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({title: "", description: "", tag: "" });
}
const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
}
  return (
    <div className='container my-3 add notes'>
    <h2 className='h2-add'>Add Note</h2>
  <form className='my-3'>
    <div className="form-group mb-3">
      <label htmlFor="exampleInputEmail1">Title</label>
      <input type="text" className="form-control" id="title" name='title' aria-describedby="emailHelp" value={note.title} placeholder="Enter Title" minLength={5} required onChange={onChange}/>
    </div>
    <div className="form-group mb-3">
      <label htmlFor="exampleInputPassword1">Description</label>
      <input type="text" className="form-control" id="description" name='description' value={note.description} placeholder="Enter Description" minLength={5} required onChange={onChange} />
    </div>
    <div className="form-group mb-3">
                    <label htmlFor="tag">Tag</label>
                    <input
                      type="text"
                      className="form-control"
                      id="tag"
                      name="tag"
                      value={note.tag}
                      placeholder="Enter Tag"
                      onChange={onChange}
                    />
                  </div>
    <button  disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary my-3"onClick={handleclick}>Add Note</button>
  </form>
</div>
  )
}

export default AddNote