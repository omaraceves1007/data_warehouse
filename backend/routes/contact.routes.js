const { Router, response, request } = require ( 'express' );
const { validateJWT } = require( '../middleware/jwt' );
const { newContact, findContacts, findContactById, updateContact, deleteContact } = require( '../controllers/contact' );
const router = Router();

router.get( '/', [ validateJWT ], async ( req = request , res = response ) => {
    const resp = await findContacts();
    res.send( resp );
} );

router.get( '/:id', [ validateJWT ], async ( req = request , res = response ) => {
    const id = req.params.id;
    const resp = await findContactById( id );
    res.send( resp );
} );

router.post( '/', [ validateJWT ], async ( req = request , res = response ) => {
    const data = req.body;
    const resp = await newContact( data );
    res.send( resp );
} );

router.put( '/:id', [ validateJWT ], async ( req = request , res = response ) => {
    const id = req.params.id;
    const data = req.body;
    const resp = await updateContact( id, data );
    res.send( resp );
} );

router.delete( '/:id', [ validateJWT ], async ( req = request , res = response ) => {
    const id = req.params.id;
    const resp = await deleteContact( id );
    res.send( resp );
} );

module.exports = router;