const { Router, response, request } = require ( 'express' );
const { validateJWT } = require( '../middleware/jwt' );
const { newCompany, findCities, findCompanyById, updateCompany, deleteCompany } = require( '../controllers/company' );
const router = Router();

router.get( '/', [ validateJWT ], async ( req = request , res = response ) => {
    const resp = await findCities();
    res.send( resp );
} );

router.get( '/:id', [ validateJWT ], async ( req = request , res = response ) => {
    const id = req.params.id;
    const resp = await findCompanyById( id );
    res.send( resp );
} );

router.post( '/', [ validateJWT ], async ( req = request , res = response ) => {
    const data = req.body;
    const resp = await newCompany( data );
    res.send( resp );
} );

router.put( '/:id', [ validateJWT ], async ( req = request , res = response ) => {
    const id = req.params.id;
    const data = req.body;
    const resp = await updateCompany( id, data );
    res.send( resp );
} );

router.delete( '/:id', [ validateJWT ], async ( req = request , res = response ) => {
    const id = req.params.id;
    const resp = await deleteCompany( id );
    res.send( resp );
} );

module.exports = router;