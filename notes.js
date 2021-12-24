const fs = require('fs');
const chalk = require('chalk');

const getNote = () =>
  loadNotes().forEach((note) => {
    console.log(chalk.green.inverse.bold(note.title));
  });

const readNote = (title) => {
  const notes = loadNotes();

  const filteredNote = notes.find((note) => note.title === title);
  if (filteredNote) {
    console.log(chalk.green.inverse.bold(filteredNote.title));
    console.log(chalk.green.inverse.bold(filteredNote.body));
  }
  console.log(
    chalk.red.inverse.bold(
      `failed to add note. title: ${title}, note not found `
    )
  );
};

const addNote = (title, body) => {
  const notes = loadNotes();

  const filterNotes = notes.find((note) => note.title === title);

  if (filterNotes.length) {
    notes.push({ title: title, body: body });
    saveNotes(notes);
    console.log(chalk.green.inverse.bold('note successfully added'));
  } else
    console.log(
      chalk.red.inverse.bold(
        `failed to add note. title: ${title}, already taken `
      )
    );
};

const removeNote = (title) => {
  const notes = loadNotes();

  const filteredNotes = notes.filter((note) => note.title !== title);
  if (notes.length > filteredNotes.length) {
    saveNotes(filteredNotes);
    console.log(chalk.green.inverse.bold('note successfully removed'));
  } else
    console.log(
      chalk.red.inverse.bold(
        `failed to remove note. title: ${title}, does not exist`
      )
    );
};

const saveNotes = (notes) => {
  const dataJson = JSON.stringify(notes);
  fs.writeFileSync('notes.json', dataJson);
};

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync('notes.json');
    const notesJson = dataBuffer.toString();
    return JSON.parse(notesJson);
  } catch (e) {
    return [];
  }
};

module.exports = {
  getNote,
  addNote,
  removeNote,
  readNote,
};
