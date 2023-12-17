import React, { useState } from "react";
import { json } from "react-router-dom";
import NoteContext from "./noteContext";
const NoteState = (props) => {
 const host="http://localhost:5000"
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);
  // Get ALL notes
  const getNotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "auth-token":localStorage.getItem('token'),
      } 
    });
    const json=await response.json();
      setNotes(json);
  }
  // ADD Notes
  const addNote = async (title, description, tag) => {
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token":localStorage.getItem('token'),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const note=response.json();
    setNotes(notes.concat(note));
 
  };
  // Delete Note
  const deleteNote =async (id) => {
    const response = await fetch(`${host}/api/notes/deleteenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "auth-token":localStorage.getItem('token'),
      }
    });
    const json = response.json();
    console.log(json);
    console.log("delete the funvv" + id);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };
  // Edit Notes
  const editNote = async (id, title, description, tag) => {
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "auth-token":localStorage.getItem('token'),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json=response.json();
    console.log(json);
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
  };
  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote ,getNotes}}>
      {props.children}
    </NoteContext.Provider>
  );
};
export default NoteState;
