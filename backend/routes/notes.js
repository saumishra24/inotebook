const express = require('express');
const router = express.Router();
const Notes = require('../models/Notes');
const fetchuser = require('../middleware/fetchuser');
const { validationResult, body } = require('express-validator');


//ROUTE 1 : Add a new note using POST: /api/notes/addnote. Login Required
router.post('/addnote', fetchuser, [
  body('title', 'Enter length of atleast 3').isLength({ min: 3 }),
  body('description', 'Description must be atleast 8 characters').isLength({ min: 5 })
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { title, description, tag } = req.body;
    const notes = new Notes({
      userId: req.user.id,
      title: title,
      description: description,
      tag: tag
    });
    const savedNote = await notes.save();
    res.json(savedNote);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server error");
  }
})


//ROUTE 2 : Fetch all notes using GET: /api/notes/fetchall. Login Required
router.get('/fetchall', fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ userId: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server error");
  }

})


//ROUTE 3 : Update a note using PUT: /api/notes/updatenote/:id. Login Required
router.put('/updatenote/:id', fetchuser, [
  body('title', 'Enter length of atleast 3').optional().isLength({ min: 3 }),
  body('description', 'Description must be atleast 8 characters').optional().isLength({ min: 5 })
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { title, description, tag } = req.body;
    let newNote = {};
    if (title) { newNote.title = title };
    if (description) { newNote.description = description };
    if (tag) { newNote.tag = tag };

    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }
    // console.log(note.userId.toString()," ", req.user.id)
    if (note.userId.toString() !== req.user.id) {
      return res.status(401).send("Access Denied");
    }

    note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
    res.json(note);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server error");
  }
})


//ROUTE 4 : Delete a note using DELETE: /api/notes/deletenote/:id. Login Required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
  try {

    //Find the note if it is present in database
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }

    // Check if the user owns the note
    if (note.userId.toString() !== req.user.id) {
      return res.status(401).send("Access Denied");
    }

    note = await Notes.findByIdAndDelete(req.params.id);
    res.json({ "success": "Note has been deleted", note: note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server error");
  }
})

module.exports = router;