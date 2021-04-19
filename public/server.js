const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();


const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.json());

fs.readFile("../db/db.json", "utf8", (err, data) => {
    if (err) throw err;
    var notes = JSON.parse(data);

    app.get("/api/notes", function (req, res) {
        res.json(notes);
    });
    
    app.post("/api/notes", function (req, res) {
        let newNote = req.body;
        notes.push(newNote);
        updateDb();
        return console.log("Made a note of: " + newNote.title);
    });

    app.get("/api/notes/:id", function (req, res) {
        res.json(notes[req.params.id]);
    });



    app.get("/", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/index.html"));
    });

    app.get("/notes", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/notes.html"));
    })

    function updateDb() {
        fs.writeFile("db/db.json", JSON.stringify(notes, '\t'), err => {
            if (err) throw err;
            return true;
        });
    }
});
    app.listen(PORT, () => {
        console.log(`Aye Captain, we be sailing towards PORT: ${PORT}!`);
    });
