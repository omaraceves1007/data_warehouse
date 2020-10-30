const { save, findAll, findById, findOne, updateC, deleteC } = require( '../database/contact' );
const { message } = require( '../helpers/response' );

const newContact = async ( data ) => {
    const contact = await save( data );
    if( !contact.error ) {
        return message( 200, true, contact );
    }
    return message( 500, false, 'Error en operación' );
};

const findContacts = async ( query ) => {
    const contacts = await findAll( query );
    if( !contacts.error ) {
        return message( 200, true, contacts );
    }
    return message( 500, false, 'Error en operación' );
};

const findContactById = async ( id ) => {
    const contact = await findById( id );
    if( !contact.error ) {
        return message( 200, true, contact );
    }
    return message( 500, false, 'Error en operación' );
}

const findContact = async ( param ) => {
    const contact = await findOne( param );
    if( !contact.error ) {
        return message ( 200, true, contact );
    }
    return message ( 500, false, 'Error en operación' );
};

const updateContact = async ( id, data ) => {
    const { ...campos } = data;
    const exist = await findById( id );
    if ( !exist.error ) {
        const updatedContact = await updateC( id, campos );
        if( !updatedContact.error ) {
            return message ( 200, true, updatedContact );
        }
    }
    return message ( 500, false, 'Error en operación' );
};

const deleteContact = async ( id ) => {
    const deleted = await deleteC( id );
    if( deleted ) {
        return message ( 200, true, 'Borrado correctamente' );
    }
    return message ( 500, false, 'Error en operación' );
};

module.exports = {
    newContact,
    findContacts,
    findContactById,
    findContact,
    updateContact,
    deleteContact
};