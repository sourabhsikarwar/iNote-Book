import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";

const AddNote = (props) => {
    
  const context = useContext(noteContext);
  const { addNote } = context;
  
  const [note, setNote] = useState({title : "", description : "", tag : ""});

  const handleOnClick  = (e) => {
      e.preventDefault();
      addNote(note.title, note.description, note.tag);
      props.showAlert("Note added Successfully", "success");
      setNote({title : "", description : "", tag : ""})
  }

  const onChange = (e) => {
      setNote({...note, [e.target.name] : e.target.value})
  }

  return (
    <section className="container my-4 px-5">
      <h2>Add a Note</h2>
      <div className="mb-3">
        <label htmlFor="title" className="form-label">
          Title
        </label>
        <input
          type="text"
          className="form-control"
          name="title"
          id="title"
          value={note.title}
          onChange={onChange}
          minLength={5}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">
            Description
        </label>
        <textarea
          className="form-control"
          id="description"
          name="description"
          rows="3"
          value={note.description}
          onChange={onChange}
          minLength={5}
          required
        ></textarea>
      </div>
      <div className="mb-3">
        <label htmlFor="tag" className="form-label">
          Tag
        </label>
        <input
          type="text"
          className="form-control"
          name="tag"
          id="tag"
          value={note.tag}
          onChange={onChange}
          minLength={5}
          required
        />
      </div>
      <button disabled={ note.title.length<5 || note.description.length<5 } type="submit" className="btn btn-primary my-3" onClick={handleOnClick}>
        Add note
      </button>
    </section>
  );
};

export default AddNote;
