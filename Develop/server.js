const fs = require('fs');
const path = require('path');
const express = require('express');
const { notes } = require('./db/db');
const PORT = process.env.PORT || 3001;
const app = express();
// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
   res.sendFile(path.join(__dirname, './public/notes.html'));
 });


app.get('/api/notes', (req, res) => {
  let results = notes;
  if (req.query) {
      results= getAndRenderNotes(req.query, results);
  }
  res.json(results);
});
  
app.post('/api/notes', (req, res) =>{
  req.body.id = notes.length.toString();

  const newNote = (req.body, notes);

  res.json(req.body);
});

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
  });