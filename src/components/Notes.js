import Noteitem from "./Noteitem";
import AddNote from "./addNote";
import { useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/noteContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

function Notes(props) {
  const context = useContext(noteContext);
  const navigate = useNavigate();
  const { notes, getNotes,editNote } = context;
  useEffect(() => {
    if(localStorage.getItem('token'))
    {
      getNotes();
    }
    else
    {
      navigate('/login', {replace: true});
    }
    
    // eslint-disable-next-line
  });

  const ref = useRef(null);
  const refcloce=useRef(null);
  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "",
  });
  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({id:currentNote._id, etitle: currentNote.title,edescription: currentNote.description,etag:currentNote.tag});
 
  };
  const handleclick = (e) => {
    console.log("Updateing the note...",note);
    editNote(note.id,note.etitle,note.edescription,note.etag) 
    refcloce.current.click();
  
  };
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      <AddNote
/>
<div className="container m ">
      <div>
        <button
          ref={ref}
          type="button"
          className="btn btn-primary d-none"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          data-bs-whatever="@mdo"
        >
          Open modal for @mdo
        </button>
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex={-1}
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Update Note
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>
              <div className="modal-body">
                <form className="my-3">
                  <div className="form-group mb-3">
                    <label htmlFor="etitle">Title</label>
                    <input
                      type="text"
                      className="form-control"
                      id="etitle"
                      name="etitle"
                      value={note.etitle}
                      aria-describedby="emailHelp"
                      placeholder="Enter Title"
                      minLength={5}
                      required
                      onChange={onChange}
                    />
                  </div>
                  <div className="form-group mb=3">
                    <label htmlFor="edescription">Description</label>
                    <input
                      type="text"
                      className="form-control"
                      id="edescription"
                      name="edescription"
                      value={note.edescription}
                      
                      placeholder="Enter Description"
                      minLength={5}
                      required
                      onChange={onChange}
                    />
                  </div>
                  <div className="form-group mb=3">
                    <label htmlFor="tag">Tag</label>
                    <input
                      type="text"
                      className="form-control"
                      id="etag"
                      name="etag"
                      value={note.etag}
                      placeholder="Enter Tag"
                      
                      onChange={onChange}
                    />
                  </div>
                 
                </form>
              </div>
              <div className="modal-footer">
                <button ref={refcloce} 
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button  onClick={handleclick} type="button" className="btn btn-primary">
                  Update Note
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <h2 className="no-h2">Your Note</h2>
        <div>
          {notes.length===0 && "No notes to display"}
        </div>
        {notes.map((note) => {
          return (
            <Noteitem key={note._id} updateNote={updateNote} showAlert={props.showAlert} note={note} />
          );
        })}
      </div>
      </div>
    </>
  );
}

export default Notes;
