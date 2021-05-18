const express = require("express");
const fs = require("fs");
const path = require("path");


const app = express();
PORT = process.env.PORT || 3001;

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static("public"));


//INDEX PAGE Home page
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"))
});

//NOTES page
app.get("/notes", (req, res) =>{
    fs.sendFile(path.join(__dirname, "/public/notes.html"))
});


app.get("/api/notes", (req, res) => {
    fs.readFile(path.join(__dirname, "./db/db.json"), "utf-8", (err, data) => {
        if(err)
        throw err
        res.json(JSON.parse(data))
    });
});


app.post("/api/notes/", (req,res ) => {
    fs.readFile(path.join(__dirname, "./db/db.json"), "utf-8", (err, data) => {
        if(err)
        throw err

        const newNote = req.body;
        var notes = JSON.parse(data);
        notes.push(newNote);
        fs.writeFile(".db/db.json", JSON.stringify(notes), function(err) {
            if(err)
            return console.log(err);
        });
    });   
});



//LISTENER
app.listen(PORT, () => {
    console.log(`App listening on PORT ${PORT}`);
});




