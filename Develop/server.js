const fs = require('fs');
const path = require('path');
const express = require('express');
const notes = require('./db/db');
console.log(notes);
const PORT = process.env.PORT || 3001;
const app = express();
const { v4:uuidv4 } = require('uuid');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
   res.sendFile(path.join(__dirname, './public/notes.html'));
 });

 app.get('/api/notes/:id', (req, res) => {
  const result = findById(req.params.id, notes);
  if (result){ 
    res.json(result);
  } else {
      res.send(404);
  }
});

app.get('/api/notes', (req, res) => {
  let results = notes;
  res.json(results);
});
  
app.post('/api/notes', (req, res) =>{
 const {title, text} = req.body; 
 const newNote = {title, text, id:uuidv4()} ;
 notes.push(newNote);
 console.log(newNote);

 //createNewNote(newNote);
 res.json(newNote);
  fs.writeFile(
    path.join(__dirname, './db/db.json'),
    JSON.stringify(notes, null, 2),
    (error, data) => {
        if (error) throw error;
        else res.json(data);
    }
  )
});

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
  });