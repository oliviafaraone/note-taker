const fs = require("fs");
const path = require("path");



function findById(id, notesArray) {
    const result = notesArray.filter(note => note.id === id)[0];
    return result;
  }
  
function createNewNote(body) {
    fs.writeFileSync(
      path.join(__dirname, './db/db.json'),
      JSON.stringify(body, null, 2),
      (error, data) => {
          if (error) throw error;
          else res.json(data);
      }

    );
    return body;
  }
  
  module.exports = {
    findById,
    createNewNote
  };