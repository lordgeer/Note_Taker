const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.json());

app.post("/api/notes", function (req, res) {
    fs.readFile("./db/db.json", "utf8", (err, data) => {
        if (err) throw err;
        var notes = JSON.parse(data);
        let newNote = req.body;
        newNote.id = Math.floor(Math.random() * 5000)
        notes.push(newNote);
        fs.writeFile("./db/db.json", JSON.stringify(notes),(err, data) => {
            res.json(newNote)
        }
            );
    
    })
});

app.delete("/api/notes/:id", function (req, res) {
console.log(req.params.id);
    fs.readFile("./db/db.json", "utf8", (err, data) => {
        if (err) throw err;
        var notes = JSON.parse(data);
        const newNotes = notes.filter(note => note.id !== parseInt(req.params.id))
        console.log(newNotes);
        fs.writeFile("./db/db.json", JSON.stringify(newNotes),(err, data) => {
            res.json({msg: 'Successfully deleted'})
        }
            );
    
    })
});

app.get("/api/notes/:id", function (req, res) {
    res.json(notes[req.params.id]);
});


app.get("/api/notes/", function (req, res) {
    fs.readFile("./db/db.json", "utf8", (err, data) => {
        if (err) throw err;
        var notes = JSON.parse(data);
        res.json(notes);
    });
})

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});
app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
})
app.listen(PORT, () => {
    console.log(`Aye Captain, we be sailing towards PORT: ${PORT}!`);
});