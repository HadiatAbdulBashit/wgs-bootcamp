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
  handler(argv) {
    const data = JSON.parse(savedContact);
    const selectedData = data.find(contact => contact.name == argv.name);
    console.log('Name  ', selectedData.name);
    console.log('Phone ', selectedData.phone);
    console.log('Email ', selectedData.email);
  }
})

yargs.command({
  command: 'update',
  describe: 'Update selected contact',
  builder: {
    name: {
      describe: 'Name',
      type: 'string'
    },
    phone: {
      describe: 'Phone',
      type: 'string'
    },
    email: {
      describe: 'Email',
      type: 'string'
    },
    selectName: {
      describe: 'Selected name',
      demandOption: true,
      type: 'string'
    }
  },
  handler(argv) {
    const data = JSON.parse(savedContact);
    const selectedData = data.find(contact => contact.name === argv.selectName);
    // const selectedIndex = data.findIndex(contact => contact.name === argv.selectName);

    if (selectedData == undefined) {
      console.log('Data tidak di temukan');
    } else {
      selectedData.name = argv.name ?? selectedData.name
      selectedData.phone = argv.phone ?? selectedData.phone
      selectedData.email = argv.email ?? selectedData.email

      fs.writeFile('./data/contacts.json', JSON.stringify(data), 'utf8', (err) => {
        if (err) {
          console.error('Error write to file:', err);
        } else {
          console.log('Contact updated!');
        }
      });
    }
  }
})

yargs.command({
  command: 'delete',
  describe: 'Delete selected contact',
  builder: {
    name: {
      describe: 'Name',
      demandOption: true,
      type: 'string'
    }
  },
  handler(argv) {
    const data = JSON.parse(savedContact);
    const selectedData = data.find(contact => contact.name === argv.name);
    const selectedIndex = data.findIndex(contact => contact.name === argv.name);

    // console.log(data);
    if (selectedData == undefined) {
      console.log('Data tidak di temukan');
    } else {
      data.splice(selectedIndex, 1)
      
      fs.writeFile('./data/contacts.json', JSON.stringify(data), 'utf8', (err) => {
        if (err) {
          console.error('Error write to file:', err);
        } else {
          console.log('Contact deleted!');
        }
      });
    }
  }
})

yargs.parse();
