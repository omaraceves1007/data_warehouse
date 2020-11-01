const { Router, response, request } = require ( 'express' );
const fileUpload = require('express-fileupload');
const { validateJWT } = require( '../middleware/jwt' );
const { upload, getImage } = require( '../controllers/upload' );

const router = Router();
router.use( fileUpload( {
    createParentPath: true,
    abortOnLimit: true,
    limits: { fileSize: 5 * 1024 * 1024 }
} ) );

router.get( '/images/:image', validateJWT, async ( req = request, res = response ) => {
    const name = req.params.image;
    const image = await getImage( name );
    res.sendFile( image );
});

router.post( '/images/:id', validateJWT ,async ( req = request, res = response ) => {
    const image = req.files.image;
    const id = req.params.id;
    const result = await upload( image, id);
    res.send( result );
} );

module.exports = router;
