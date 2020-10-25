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

const validateAdmin = ( req = request, res = response, next ) => {
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
    if( payload.rol === 'ADMIN_ROL' ){
        next();
    }
    return res.send( message( 400, false, 'Sin permiso' ) );
};

module.exports = {
    validateJWT,
    validateAdmin
}