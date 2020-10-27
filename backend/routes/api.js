const { Router } = require( 'express' );
const cors = require( 'cors' );

const router = Router();

router.use( cors() );

// import routes
const usersRoutes = require( './user.routes' );
const loginRoutes = require( './login.routes' );
const regionRoutes = require( './region.routes' );
const countryRoutes = require( './country.routes' );
const cityRoutes = require( './city.routes' );

// use routes
router.use( '/users', usersRoutes );
router.use( '/login', loginRoutes );
router.use( '/regions', regionRoutes );
router.use( '/countries', countryRoutes );
router.use( '/cities', cityRoutes );
//export router

module.exports = router;