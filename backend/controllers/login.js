const { login } = require( '../database/login' );
const { generateJWT } = require( '../helpers/jwt' );
const { message } = require( '../helpers/response' );
const bcrypt = require( 'bcryptjs' );


const auth = async ( info ) => {
    const { email, password } = info;
    const user = await login( email );
    if( !user.error ) {
        if( validPassword( password, user ) ){
            const token = generateJWT( user.toJSON() );
            return message( 200, true, token );
        }
        return message( 400, false, 'Error datos sesion incorrectos' );
    } else {
        return message( 404, false, 'Usuario no existe' );
    }
};

const validPassword = ( pass, user ) => {
    const valid = bcrypt.compareSync( pass, user.password );
    return valid;
};

module.exports = {
    auth
};