import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {

  const host = "http://localhost:5000/";
  const [notes, setNotes] = useState([]);

  // crud operation on note

  // getting all notes 

  const getNotes = async () => {

    // todo Api call

    const response = await fetch(
      `${host}api/notes/fetchallnotes`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            localStorage.getItem("authToken"),
        }
      }
    );

    const json = await response.json();
    setNotes(json);

  };

  // add a note
  const addNote = async (title, description, tag) => {

    // todo Api call

    const response = await fetch(
      `${host}api/notes/addnote`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            localStorage.getItem("authToken"),
        },
        body: JSON.stringify({title, description, tag}),
      }
    );
    const note = await response.json();
    setNotes(notes.concat(note));
    props.showAlert("Note added successfully", "success");
  };

  // delete a note

  const deleteNote = async (id) => {

    // todo Api call

    const response = await fetch(
      `${host}api/notes/deletenote/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            localStorage.getItem("authToken"),
        }
      }
    );
    const json = await response.json();

    // logic to delete a note 

    console.log("Deleting a note with id " + id);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
    props.showAlert("Note deleted successfully", "success");
  };

  // edit a note
  const editNote = async (id, title, description, tag) => {

    // todo Api call

    const response = await fetch(
      `${host}api/notes/updatenote/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            localStorage.getItem("authToken"),
        },
        body: JSON.stringify({title, description, tag}),
      }
    );

    const json = await response.json();

    // logic to edit the note

    const newNotes = JSON.parse(JSON.stringify(notes));

    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
    props.showAlert("Note updated successfully", "success");
  };

  return (
    <NoteContext.Provider
      value={{ notes, setNotes, addNote, deleteNote, editNote, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
