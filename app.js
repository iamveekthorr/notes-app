const { argv } = require('process');
const yargs = require('yargs');
const { addNote, removeNote, getNote, readNote } = require('./notes');

yargs.command({
  command: 'add',
  describe: 'Adding notes',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string',
    },
    body: {
      describe: 'Note body',
      demandOption: true,
      type: 'string',
    },
  },
  handler: (argv) => {
    addNote(argv.title, argv.body);
  },
});

yargs.command({
  command: 'remove',
  describe: 'Removing notes',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string',
    },
  },
  handler: (argv) => {
    removeNote(argv.title);
  },
});

yargs.command({
  command: 'list',
  describe: 'Print all notes',
  builder: {
    title: {
      describe: 'Prints notes',
      demandOption: true,
      type: 'string',
    },
  },
  handler: () => {
    getNote();
  },
});

yargs.command({
  command: 'read',
  describe: 'Read a note',
  builder: {
    title: {
      describe: 'Read notes',
      demandOption: true,
      type: 'string',
    },
  },
  handler: (argv) => {
    readNote(argv.title);
  },
});

yargs.parse();
