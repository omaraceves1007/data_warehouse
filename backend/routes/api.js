const { Router } = require( 'express' );
const cors = require( 'cors' );

const router = Router();

router.use( cors() );

// import routes
const usersRoute = require( './user.routes' );
const loginRoute = require( './login.routes' );
const regionRoute = require( './region.routes' );
const countryRoute = require( './country.routes' );

// use routes
router.use( '/users', usersRoute );
router.use( '/login', loginRoute );
router.use( '/regions', regionRoute );
router.use( '/countries', countryRoute );
//export router

module.exports = router;