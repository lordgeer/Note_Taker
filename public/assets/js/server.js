const express = require('express');


const app = express();


const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.json());


app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
})


app.route("/api/notes")
    .get(function (req, res) {
    res.json(database);
})



app.listen(PORT, () => {
    console.log(`App listening on PORT: ${PORT}`);
  });
  