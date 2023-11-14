const yargs = require('yargs');
const fs = require('fs');

const saveContact = require('./save_contact');
const savedContact = require('./read_contact');

yargs.command({
  command: 'add',
  describe: 'Add new contact',
  builder: {
    name: {
      describe: 'Name',
      demandOption: true,
      type: 'string'
    },
    phone: {
      describe: 'Phone',
      demandOption: true,
      type: 'string'
    },
    email: {
      describe: 'Email',
      demandOption: true,
      type: 'string'
    },
  },
  handler(argv) {
    saveContact(argv.name, argv.phone, argv.email);
  }
})

yargs.command({
  command: 'list',
  describe: 'List of saved contact',
  handler() {
    const data = JSON.parse(savedContact);
    data.forEach(element => {
      console.log(`${element.name} - ${element.phone}`);
    });
  }
})

yargs.command({
  command: 'detail',
  describe: 'Detail of selected contact',
  builder: {
    name: {
      describe: 'Name',
      demandOption: true,
      type: 'string'
    }
  },
  handler (argv) {
    const data = JSON.parse(savedContact);
    const selectedData = data.find(contact => contact.name = argv.name);
    console.log('Name  ', selectedData.name);
    console.log('Phone ', selectedData.phone);
    console.log('Email ', selectedData.email);
  }
})

yargs.parse();
