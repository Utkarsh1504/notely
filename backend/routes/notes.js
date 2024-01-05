import express from "express";
import {
  createNote,
  deleteNoteById,
  getAllNotes,
  getNoteById,
  searchNotes,
  shareNote,
  updateNoteById,
} from "../controllers/notes.js";

import { authenticateUser } from "../middleware/auth.js";

const router = express.Router();

// authentication middleware
router.use(authenticateUser);

// GET /api/notes all notes
router.get("/notes", getAllNotes);

// GET /api/notes/:id
router.get("/notes/:id", getNoteById);

// POST /api/notes by id
router.post("/notes", createNote);

// PUT /api/notes/:id update by id
router.put("/notes/:id", updateNoteById);

// DELETE /api/notes/:id delete by id
router.delete("/notes/:id", deleteNoteById);

// POST /api/notes/:id/share share to another user
router.post("/notes/:id/share", shareNote);

// GET /api/search?q=:query search
router.get("/search", searchNotes);

export default router;
