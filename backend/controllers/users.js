const { save, findAll, findById, findOne, updateU, deleteU } = require( '../database/users' );
const { message } = require( '../helpers/response' );

const newUser =  async( data ) => {
    const user = await save( data );
    if( user.uid ) {
        return message( 200, true, user );
    }
    return message( 500, false, 'Error en operación' );
};

const findUsers = async() => {
    const users = await findAll();
    if( !users.error ){
        return message ( 200, true, users );
    }
    return message ( 500, false, 'Error en operación' );
};

const findUserById = async( id ) => {
    const user = await findById( id );
    if( !user.error ) {
        return message ( 200, true, user );
    }
    return message ( 500, false, 'Error en operación' );
};

const findUser = async ( param ) => {
    const user = await findOne( param );
    if( !user.error ) {
        return message ( 200, true, user );
    }
    return message ( 500, false, 'Error en operación' );
};

const updateUser = async ( id, data ) => {
    const { email, password, ...campos } = data;
    const exist = await findById( id );
    if ( !exist.error ) {
        const updatedUser = await updateU( id, campos );
        if( !updatedUser.error ) {
            return message ( 200, true, updatedUser );
        }
    }
    return message ( 500, false, 'Error en operación' );
};

const deleteUser = async ( id ) => {
    const deleted = await deleteU( id );
    if( deleted ) {
        return message ( 200, true, 'Borrado correctamente' );
    }
    return message ( 500, false, 'Error en operación' );
};

module.exports = {
    newUser,
    findUsers,
    findUserById,
    findUser,
    updateUser,
    deleteUser
};