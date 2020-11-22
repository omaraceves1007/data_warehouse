const { Router, response, request } = require ( 'express' );
const { auth } = require ( '../controllers/login' );
const router = Router();

router.post( '/', async ( req = request , res = response ) => {
    const info = req.body;console.log
    const resp = await auth( info );
    res.send( resp );
});

module.exports = router;