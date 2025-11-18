const API_URL = "http://localhost:3000/notes";

// Fetch all notes on load
async function loadNotes() {
  const res = await fetch(API_URL);
  const notes = await res.json();

  const list = document.getElementById("notesList");
  list.innerHTML = "";

  notes.forEach((note) => {
    const div = document.createElement("div");
    div.classList.add("note");

    div.innerHTML = `
      <p>${note.text}</p>
      <button class="delete-btn" onclick="deleteNote(${note.id})">Delete</button>
    `;

    list.appendChild(div);
  });
}

async function addNote() {
  const text = document.getElementById("noteInput").value;

  if (!text.trim()) return alert("Note can’t be empty!");

  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });

  document.getElementById("noteInput").value = "";
  loadNotes();
}

async function deleteNote(id) {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  loadNotes();
}

loadNotes();
