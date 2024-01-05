import { Note } from "../model/notes.js";
import { User } from "../model/user.js";

// GET /api/notes
export const getAllNotes = async (req, res) => {
  try {
    const userId = req.user._id;
    const notes = await Note.find({
      $or: [{ owner: userId }, { sharedWith: userId }],
    });
    res.status(200).json(notes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "server Error" });
  }
};

// GET /api/notes/:id
export const getNoteById = async (req, res) => {
  try {
    const userId = req.user._id;
    const noteId = req.params.id;
    const note = await Note.findOne({
      _id: noteId,
      $or: [{ owner: userId }, { sharedWith: userId }],
    });

    if (!note) {
      return res.status(404).json({ error: "note not found" });
    }

    res.status(200).json({ note });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "server error" });
  }
};

// POST /api/notes
export const createNote = async (req, res) => {
  try {
    const userId = req.user._id;
    const { title, content } = req.body;

    const newNote = new Note({
      title,
      content,
      owner: userId,
    });
    await newNote.save();
    res.status(200).json({ message: "note created", newNote });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "server error" });
  }
};

// PUT /api/notes/:id
export const updateNoteById = async (req, res) => {
  try {
    const noteId = req.params.id;
    const userId = req.user._id;
    const { title, content } = req.body;

    const updatedNote = await Note.findOneAndUpdate(
      { _id: noteId, owner: userId },
      {
        title,
        content,
      },
      { new: true }
    );

    if (!updatedNote) {
      return res.status(404).json({ error: "note not found" });
    }

    res.status(200).json({ message: "note updated", note: updatedNote });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "server error" });
  }
};

// DELETE /api/delete/:id
export const deleteNoteById = async (req, res) => {
  try {
    const userId = req.user._id;
    const noteId = req.params.id;

    const deletedNote = await Note.findOneAndDelete({
      _id: noteId,
      owner: userId,
    });
    if (!deletedNote) {
      return res.status(404).json({ message: "note not found" });
    }

    res.status(200).json({ message: "note deleted", note: deletedNote });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "server error" });
  }
};

// POST /api/notes/:id/share
export const shareNote = async (req, res) => {
  try {
    const userId = req.user._id;
    const noteId = req.params.id;

    const sharedUsername = req.body.username.trim();

    const note = await Note.findOne({ _id: noteId, owner: userId });

    if (!note) {
      return res.status(404).json({ message: "note not found" });
    }

    // Find the user to share the note with based on their username
    const sharedUser = await User.findOne({ username: sharedUsername });
    if (!sharedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // check if note is already shared
    if (note.sharedWith.includes(sharedUser._id)) {
      return res.status(400).json({ message: "note is already shared" });
    }

    note.sharedWith.push(sharedUser._id);
    await note.save();

    res.status(200).json({ message: "note shared", note });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "server error" });
  }
};

// GET /api/search?q=:query
export const searchNotes = async (req, res) => {
  try {
    const userId = req.user._id;
    const query = req.query.q;

    const notes = await Note.find({
      $or: [{ owner: userId }, { sharedWith: userId }],
      $or: [
        { title: { $regex: query, $options: "i" } },
        { content: { $regex: query, $options: "i" } },
      ],
    });

    res.status(200).json(notes);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "server error" });
  }
};
