const { findExp, findContacts } = require( '../database/search' );
const { message } = require( '../helpers/response' );

const searchExp = async ( search ) => {
    const contacts = await findExp( search );
    if( !contacts.error ) {
        return message( 200, true, contacts );
    }
    return message( 500, false, 'Error en operación' );
};

const searchContacts = async ( field, value, options ) => {
    const query = {};
    query[field] = value;
    const contacts = await findContacts( query, options );
    if( !contacts.error ) {
        return message( 200, true, contacts );
    }
    return message( 500, false, 'Error en operación' );
};

module.exports = {
    searchExp,
    searchContacts
};