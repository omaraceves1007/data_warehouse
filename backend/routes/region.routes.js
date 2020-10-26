const { Router, response, request } = require ( 'express' );
const { validateJWT } = require( '../middleware/jwt' );
const { newRegion, findRegions, findRegionById, updateRegion, deleteRegion } = require( '../controllers/region' );
const router = Router();

router.get( '/', [ validateJWT ], async ( req = request , res = response ) => {
    const resp = await findRegions();
    res.send( resp );
} );

router.get( '/:id', [ validateJWT ], async ( req = request , res = response ) => {
    const id = req.params.id;
    const resp = await findRegionById( id );
    res.send( resp );
} );

router.post( '/', [ validateJWT ], async ( req = request , res = response ) => {
    const data = req.body;
    const resp = await newRegion( data );
    res.send( resp );
} );

router.put( '/:id', [ validateJWT ], async ( req = request , res = response ) => {
    const id = req.params.id;
    const data = req.body;
    const resp = await updateRegion( id, data );
    res.send( resp );
} );

router.delete( '/:id', [ validateJWT ], async ( req = request , res = response ) => {
    const id = req.params.id;
    const resp = await deleteRegion( id );
    res.send( resp );
} );

module.exports = router;