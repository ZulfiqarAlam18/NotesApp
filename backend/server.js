// const express = require("express");
// const fs = require("fs");
// const cors = require("cors");

// const app = express();

// // Allow requests from your Netlify frontend
// const corsOptions = {
//   origin: "https://papaya-pasca-2670a3.netlify.app", // <- your Netlify URL
//   methods: "GET,POST,DELETE",
//   allowedHeaders: "Content-Type",
// };

// app.use(cors(corsOptions));
// app.use(express.json());

// const FILE_PATH = "./notes.json";

// // Helper function: read file
// function readNotes() {
//   const data = fs.readFileSync(FILE_PATH, "utf8");
//   return JSON.parse(data);
// }

// // Helper function: save file
// function saveNotes(notes) {
//   fs.writeFileSync(FILE_PATH, JSON.stringify(notes, null, 2));
// }

// // GET — fetch all notes
// app.get("/notes", (req, res) => {
//   const notes = readNotes();
//   res.json(notes);
// });

// // POST — add a note
// app.post("/notes", (req, res) => {
//   const notes = readNotes();
//   const newNote = {
//     id: Date.now(),
//     text: req.body.text,
//   };

//   notes.push(newNote);
//   saveNotes(notes);

//   res.json(newNote);
// });

// // DELETE — remove note
// app.delete("/notes/:id", (req, res) => {
//   const id = Number(req.params.id);
//   const notes = readNotes().filter((n) => n.id !== id);

//   saveNotes(notes);
//   res.json({ message: "Deleted!" });
// });

// // Start server
// app.listen(3000, "0.0.0.0", () =>
//   console.log("Backend running on http://0.0.0.0:3000")
// );



















const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const FILE_PATH = "./notes.json";

// Helper function: read file
function readNotes() {
  const data = fs.readFileSync(FILE_PATH, "utf8");
  return JSON.parse(data);
}

// Helper function: save file
function saveNotes(notes) {
  fs.writeFileSync(FILE_PATH, JSON.stringify(notes, null, 2));
}

// GET — fetch all notes
app.get("/notes", (req, res) => {
  const notes = readNotes();
  res.json(notes);
});

// POST — add a note
app.post("/notes", (req, res) => {
  const notes = readNotes();
  const newNote = {
    id: Date.now(),
    text: req.body.text,
  };

  notes.push(newNote);
  saveNotes(notes);

  res.json(newNote);
});

// DELETE — remove note
app.delete("/notes/:id", (req, res) => {
  const id = Number(req.params.id);
  const notes = readNotes().filter((n) => n.id !== id);

  saveNotes(notes);
  res.json({ message: "Deleted!" });
});

// Start server
app.listen(3000, () => console.log("Backend running on http://localhost:3000"));
