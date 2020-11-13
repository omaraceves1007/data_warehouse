const { Router, response, request } = require ( 'express' );
const { newUser, findUsers, findUserById, updateUser, deleteUser } = require( '../controllers/users' );
const { validateJWT, validateAdmin } = require( '../middleware/jwt' );
const { userNotNull, uUserNotNull } = require( '../middleware/validators' );

const router = Router();

router.get( '/', [ validateJWT, validateAdmin ], async ( req = request , res = response ) => {
    const query = req.query;
    const resp = await findUsers( query );
    res.send( resp );
});

router.get( '/:id', [ validateJWT, validateAdmin ], async ( req = request , res = response ) => {
    const id = req.params.id;
    const user = await findUserById( id );
    res.send( user );
});

router.post( '/', [ validateJWT, validateAdmin, userNotNull ], async ( req = request , res = response ) => {
    const resp = await newUser( req.body );
    res.send( resp );
});

router.put( '/:id', [ validateJWT, validateAdmin, uUserNotNull ], async ( req = request , res = response ) => {
    const id = req.params.id;
    const data = req.body;
    const resp = await updateUser( id, data );
    res.send( resp );
});

router.delete( '/:id', [ validateJWT, validateAdmin ], async ( req = request , res = response ) => {
    const id = req.params.id;
    const resp = await deleteUser( id );
    res.send( resp );
});

module.exports = router;