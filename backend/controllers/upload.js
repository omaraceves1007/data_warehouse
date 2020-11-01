const { updateIma } = require( '../database/contact' );
const { message } = require( '../helpers/response' );
const path = require( 'path' );

const extensions = [ 'jpg', 'jpeg', 'png', 'gif' ];

const upload = async ( image, id ) => {
    const validExt = await checkValidExt( image );
    if( !validExt ) {
        return message( 500, false, 'Archivo invalido' );
    }
    const name = `${id}.${validExt}`;
    const path = `./uploads/contacts/${id}.${validExt}`;
    await image.mv( path , err => {
        if ( err ) {
            console.log( err );
            return message( 500, false, 'Error al guardar archivo' );
        }
    });
    const result = await updateIma( name, id );
    if( !result.error ){
        return message( 200, true, { name, text: 'Archivo guardado' } );
    }
    return message( 500, false, 'Error al guardar archivo' );
};

const getImage = async ( image ) => {
    let pathImage;
    if ( image === 'no-image.png' ) {
        pathImage = path.join( __dirname, `../uploads/no-image.png` );
    } else {
        pathImage = path.join( __dirname, `../uploads/contacts/${image}` );
    }
    return ( pathImage );
};

const checkValidExt = async ( image ) => {
    const splitName = image.name.split('.');
    const ext = splitName[ splitName.length - 1 ];
    if( !extensions.includes( ext ) ) {
        return false;
    }
    return ext;
};

module.exports = {
    upload,
    getImage
}