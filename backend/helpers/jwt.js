const jwt = require( 'jwt-simple' );
const moment = require( 'moment' );
const seed = process.env.SECRET;

const generateJWT = ( info ) => {
    const payload = { 
        user : info,
        createdAt: moment().unix,
    };
    return jwt.encode( payload, seed );
}

module.exports = { generateJWT };