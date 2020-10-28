const { save, findAll, findById, findOne, updateR, deleteR } = require( '../database/region' );
const { message } = require( '../helpers/response' );

const newRegion = async ( data ) => {
    const region = await save( data );
    if( !region.error ) {
        return message( 200, true, region );
    }
    return message( 500, false, 'Error en operación' );
};

const findRegions = async () => {
    const regions = await findAll();
    if( !regions.error ) {
        return message( 200, true, regions );
    }
    return message( 500, false, 'Error en operación' );
};

const findRegionById = async ( id ) => {
    const region = await findById( id );
    if( !region.error ) {
        return message( 200, true, region );
    }
    return message( 500, false, 'Error en operación' );
}

const findRegion = async ( param ) => {
    const region = await findOne( param );
    if( !region.error ) {
        return message ( 200, true, region );
    }
    return message ( 500, false, 'Error en operación' );
};

const updateRegion = async ( id, data ) => {
    const { ...campos } = data;
    const exist = await findById( id );
    if ( !exist.error ) {
        const updatedRegion = await updateR( id, campos );
        if( !updatedRegion.error ) {
            return message ( 200, true, updatedRegion );
        }
    }
    return message ( 500, false, 'Error en operación' );
};

const deleteRegion = async ( id ) => {
    const deleted = await deleteR( id );
    if( deleted ) {
        return message ( 200, true, 'Borrado correctamente' );
    }
    return message ( 500, false, 'Error en operación' );
};

module.exports = {
    newRegion,
    findRegions,
    findRegionById,
    findRegion,
    updateRegion,
    deleteRegion
};