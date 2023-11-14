const fs = require('fs');
const { isEmail, isMobilePhone } = require('validator');
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

const saveContact = require('./save_contact');

// Make function questions that will return promise form question from aks
const questions = (ask) => {
    return new Promise((resolve) => {
        readline.question(ask, (inputVariable) => {
            resolve(inputVariable);
        })
    })
}

const showNewContact = (newContact) => {
    console.log(`\nName : ${newContact.name}`);
    console.log(`Phone : ${newContact.phone}`);
    console.log(`Email : ${newContact.email}`);
}

// Function aksQuestion that will call function question and save new contact to json
const askQuestion = async () => {
    let newContact = {};
    newContact.name = await questions('what is your name: ');
    do {
        newContact.phone = await questions('what is your phone number: ', isMobilePhone);
        !isMobilePhone(newContact.phone, 'id-ID') ? console.log('Phone number not valid') : null;
    } while (!isMobilePhone(newContact.phone, 'id-ID'));
    do {
        newContact.email = await questions('what is your email: ', isEmail);
        !isEmail(newContact.email) ? console.log('Email not valid') : null;
    } while (!isEmail(newContact.email));
    readline.close();

    showNewContact(newContact);
    saveContact(newContact.name, newContact.phone, newContact.email)
}

askQuestion();