const express = require("express");
const fetchuser = require("../middleware/fetchuser");
const router = express.Router();
const Note = require("../models/Notes");
const { body, validationResult } = require("express-validator");

// Route 1 : Fetching all notes of a user using GET request

router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Some error occured");
  }
});

// Route 2 : Adding a note from user using post method

router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Description should be atleast of length 5").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Some error occured");
    }
  }
);

// Route 3 : updating a note from user using put method --> login required

router.put("/updatenote/:id", fetchuser, async (req, res) => {
  try { 
    const {title, description, tag} = req.body;

    // creating a newNote of updated data
    const newNote = {};
    if(title){
      newNote.title = title;
    }
    if(description){
      newNote.description = description;
    }
    if(tag){
      newNote.tag = tag;
    }

    // finding the updated note and then updating it
    let note = await Note.findById(req.params.id);
    if(!note){
      return res.status(404).send("Note not found");
    }
    // console.log(note.id.toString());
    // console.log(req.params.id);
    if(note.user.toString() !== req.user.id){
      return res.status(401).send("Not allowed");
    }

    note = await Note.findByIdAndUpdate(req.params.id, {$set : newNote}, {new : true});
    res.json({note})
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Some error occured");
  }
});

// Route 4 : Deleting a note from user using delete method --> login required

router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try { 
    // finding the note to be deleted and then deleting it
    let note = await Note.findById(req.params.id);
    if(!note){
      return res.status(404).send("Note not found");
    }
    // console.log(note.id.toString());
    // console.log(req.params.id);
    if(note.user.toString() !== req.user.id){
      return res.status(401).send("Not allowed");
    }

    note = await Note.findByIdAndDelete(req.params.id);
    res.json({"Success" : "Note has been deleted"});
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Some error occured");
  }
});

module.exports = router;
