const fs = require("fs");
const express = require("express");
const path = require("path");
const uniqid = require("uniqid");

app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const PORT = process.env.PORT || 8080;

app.get("/api/notes", (req, res) => {
  fs.readFile("./db/db.json", "utf8", (err, data) => {
    let noteData = JSON.parse(data);
    res.json(noteData);
  });
});

app.post("/api/notes", (req, res) => {
  fs.readFile("./db/db.json", "utf8", (err, data) => {
    let noteData = JSON.parse(data);
    const newNote = {
      title: req.body.title,
      text: req.body.text,
      id: uniqid(),
    };

    const newNoteData = noteData.concat(newNote);
    modifyDB(newNoteData);
    res.json(newNoteData);
  });
});

function modifyDB(modify) {
  fs.writeFile("./db/db.json", JSON.stringify(modify), (err) => {
    if (err) throw err;
  });
}
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.listen(PORT, () => {
  console.log(`App Listening at PORT: ${PORT}`);
});
