const express = require("express");
const router = express.Router();
const Note = require("../models/Note");
const fetchuser = require("../Middleware/fetchuser");
const { body, validationResult } = require("express-validator");
//Router 1: Get all the notes

router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("some error occured");
  }
});

//Route 2
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "enter the vaild name").isLength({ min: 3 }),
    body("description", "password must be at least 5 charactor").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(401).json({ error: errors.array() });
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
      console.error(error.message);
      res.status(500).send("some error occured");
    }
  }
);

//Router 3:

router.put("/updatenote/:id", fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;
  try {
    const newNote = {};
  if (title) {
    newNote.title = title;
  }
  if (description) {
    newNote.description = description;
  }
  if (tag) {
    newNote.tag = tag;
  }
  let note = await Note.findById(req.params.id);
  if (!note) {
    return res.status(404).send("Not found");
  }
  if (note.user.toString() !== req.user.id) {
    return res.status(401).send("Not Allowed");
  }
  note = await Note.findByIdAndUpdate(
    req.params.id,
    { $set: newNote },
    { new: true }
  );
  res.json(note);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("some error occured");
  }
  
});

//Router 4

router.delete("/deleteenote/:id", fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;
  try {
    let note = await Note.findById(req.params.id);
  if (!note) {
    return res.status(404).send("Not found");
  }
  if (note.user.toString() !== req.user.id) {
    return res.status(401).send("Not Allowed");
  }
  note = await Note.findByIdAndDelete(
    req.params.id
  );
 res.json({"success":"Note has been deleted",note:note});
  } catch (error) {
    console.error(error.message);
    res.status(500).send("some error occured");
  }
  
});
module.exports = router;