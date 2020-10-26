const { Router, response, request } = require ( 'express' );
const { validateJWT } = require( '../middleware/jwt' );
const { newCountry, findCountries, findCountryById, updateCountry, deleteCountry } = require( '../controllers/country' );
const router = Router();

router.get( '/', [ validateJWT ], async ( req = request , res = response ) => {
    const resp = await findCountries();
    res.send( resp );
} );

router.get( '/:id', [ validateJWT ], async ( req = request , res = response ) => {
    const id = req.params.id;
    const resp = await findCountryById( id );
    res.send( resp );
} );

router.post( '/', [ validateJWT ], async ( req = request , res = response ) => {
    const data = req.body;
    const resp = await newCountry( data );
    res.send( resp );
} );

router.put( '/:id', [ validateJWT ], async ( req = request , res = response ) => {
    const id = req.params.id;
    const data = req.body;
    const resp = await updateCountry( id, data );
    res.send( resp );
} );

router.delete( '/:id', [ validateJWT ], async ( req = request , res = response ) => {
    const id = req.params.id;
    const resp = await deleteCountry( id );
    res.send( resp );
} );

module.exports = router;