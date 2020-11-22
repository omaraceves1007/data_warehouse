const { findExp, findContacts } = require( '../database/search' );
const { message } = require( '../helpers/response' );

const autoExp = async ( search ) => {
    const contacts = await findExp( search );
    if( !contacts.error ) {
        return message( 200, true, contacts );
    }
    return message( 500, false, 'Error en operación' );
};

const searchExp = async ( search ) => {
    const contacts = await findContacts( search );
    if( !contacts.error ) {
        return message( 200, true, contacts );
    }
    return message( 500, false, 'Error en operación' );
};

const searchContacts = async ( field, value, options ) => {
    const query = {};
    query[field] = value;
    const contacts = await findParamContacts( query, options );
    if( !contacts.error ) {
        return message( 200, true, contacts );
    }
    return message( 500, false, 'Error en operación' );
};

module.exports = {
    autoExp,
    searchExp,
    searchContacts
};