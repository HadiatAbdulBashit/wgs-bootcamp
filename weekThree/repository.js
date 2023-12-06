const { query } = require('./db');

exports.addContact = async (contact) => {
    try {
        const queryText = 'INSERT INTO contacts (email, name, phone) VALUES ($1, $2, $3)';
        const value = [contact.email, contact.name, contact.phone];
        const result = await query(queryText, value);
        
        return result.rows;
    } catch (error) {
        console.log(error);
        return null;
    }
}

exports.getAllContact = async () => {
    try {
        const queryText = 'SELECT * FROM contacts ORDER BY id ASC';
        const result = await query(queryText);

        return result.rows;
    } catch (error) {
        console.log(error);
        return null;
    }
}

exports.getContact = async (id) => {
    try {
        const queryText = 'SELECT * FROM contacts WHERE id = $1';
        const result = await query(queryText, [id]);

        return result.rows[0];
    } catch (error) {
        console.log(error);
        return null;
    }
}


exports.updateContact = async (contact) => {
    try {
        const queryText = 'UPDATE contacts SET name = $1, phone = $2, email=$3 WHERE id = $4';
        const value = [contact.name, contact.phone, contact.email, contact.id];
        const result = await query(queryText, value);
        
        return result.rows;
    } catch (error) {
        console.log(error);
        return null;
    }
}

exports.deleteContact = async (id) => {
    try {
        const queryText = 'DELETE FROM contacts WHERE id = $1';
        const result = await query(queryText, [id]);
        
        return result.rows;
    } catch (error) {
        console.log(error);
        return null;
    }
}