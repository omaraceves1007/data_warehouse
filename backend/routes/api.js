const { Router } = require( 'express' );
const cors = require( 'cors' );

const router = Router();

router.use( cors() );

// import routes
const usersRoute = require( './user.routes' );
const loginRoute = require( './login.routes' );

// use routes
router.use( '/users', usersRoute );
router.use( '/login', loginRoute );
//export router

module.exports = router;