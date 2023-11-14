const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

const saveContact = require('./save_contact');

const argv = yargs(hideBin(process.argv))
  .option('name', {
    alias: 'n',
    type: 'string',
    description: 'Input your name',
    demandOption: true
  })
  .option('phone', {
    alias: 'p',
    type: 'string',
    description: 'input your phone number',
    demandOption: true
  })
  .option('email', {
    alias: 'e',
    type: 'string',
    description: 'Input your email'
  })
  .help()
  .argv;

console.log(`Name         : ${argv.name}`);
console.log(`Phone Number : ${argv.phone}`);
console.log(`Email        : ${argv.email}`);

const newContact = {name:argv.name, phone:argv.phone, email:argv.email}

saveContact(newContact);
