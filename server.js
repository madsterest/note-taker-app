const fs = require("fs");
const express = require("express");
const path = require("path");

app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const PORT = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, "public")));

fs.readFile("./db/db.json", "utf8", (err, data) => {
  let noteData = JSON.parse(data);
  console.log(typeof noteData, noteData);

  app.get("/api/notes", (req, res) => {
    res.json(noteData);
  });

  app.post("/api/notes", (req, res) => {
    const note = {
      id: data.length + 1,
      title: req.body.title.trim(),
      text: req.body.text.trim(),
    };

    let newNoteData = noteData.concat(note);

    fs.writeFile("./db/db.json", JSON.stringify(newNoteData), (err, data) => {
      if (err) throw err;
      res.json(data);
    });
  });
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "public/notes.html"));
});

app.listen(PORT, () => {
  console.log(`App Listening at PORT: ${PORT}`);
});
