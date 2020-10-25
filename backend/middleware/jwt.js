const { response, request } = require ( 'express' );
const jwt = require("jwt-simple");
const { message } = require( '../helpers/response' );
const seed = process.env.SECRET;

const validateJWT = ( req = request, res = response, next ) => {
    let payload = {};
    if( !req.headers.authorization ) {
        return res.send( message( 400, false, 'Falta token' ) );
    }
    const userToken = req.headers.authorization.replace('Bearer ','');
    try {
        payload = jwt.encode( userToken, seed );
    }catch( error ) {
        console.log( error );
        return res.send( message( 400, false, 'Token incorrecto' ) );
    }
    req.uid = payload.uid;
    next();
};

const validateAdmin = async ( req = request, res = response, next ) => {
    let payload = {};
    if( !req.headers.authorization ) {
        return res.send( message( 400, false, 'Falta token' ) );
    }
    const userToken = req.headers.authorization.replace('Bearer ','');
    try {
        payload = await jwt.decode( userToken, seed );
        if( payload.user.rol !== 'ADMIN_ROL' ){
            return res.send( message( 400, false, 'Sin permiso' ) );
        }
        next();
    }catch( error ) {
        console.log( error );
        return res.send( message( 400, false, 'Token incorrecto' ) );
    }
};

module.exports = {
    validateJWT,
    validateAdmin
}