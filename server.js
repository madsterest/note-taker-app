const fs = require("fs");
const express = require("express");
const path = require("path");

app = express();

const PORT = process.env.PORT || 8080;

fs.readFile("./db/db.json", "utf8", (err, data) => {
  let noteData = JSON.parse(data);

  app.get("/api/notes", (req, res) => {
    res.json(noteData);
  });

  app.post("/api/notes", (req, res) => {
    const note = {
      id: data.length + 1,
      title: req.body.title,
      text: req.body.text,
    };
    noteData.push(note);
    res.json(noteData);
  });
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.listen(PORT, () => {
  console.log(`App Listening at PORT: ${PORT}`);
});
