const express = require("express");
const path = require("path");
const fs = require("fs")
const app = express();

PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

//INDEX.HTML ROUTE
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

//NOTES.HTML ROUTE
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

//READS db.json RETURNS SAVED NOTES AS JSON
app.get("/api/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./db/db.json"));
});

//POSTS NEW NOTE TO db.json RETURNS NEW NOTE TO CLIENT
app.post("/api/notes", (req, res) => {
    let savedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    let newNotes = req.body;

    savedNotes.push(newNotes);

    fs.writeFileSync("./db/db.json", JSON.stringify(savedNotes));
    res.json(savedNotes);
});

//LISTENER
app.listen(PORT, () => {
    console.log(`App listening on PORT ${PORT} Woo!`);
});



/*
Tried to make delete work 

app.get("/api/notes/:id", (req, res) => {
    let savedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    res.json(savedNotes[Number(req.params.id)]);
});

app.delete("/api/notes:id", (req, res) => { 
    let savedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    let noteID = (req.params.id).toString();

    savedNotes = savedNotes.filter(selected => {
        return selected.id !=noteID;
    })

    fs.writeFileSync("./db/db.json", JSON.stringify(savedNotes));
    res.json(savedNotes);
});
*/



