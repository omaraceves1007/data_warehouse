const { save, findAll, findById, findOne, updateC, deleteC } = require( '../database/country' );
const { message } = require( '../helpers/response' );

const newCountry = async ( data ) => {
    const country = await save( data );
    if( !country.error ) {
        return message( 200, true, country );
    }
    return message( 500, false, 'Error en operación' );
};

const findCountries = async () => {
    const countries = await findAll();
    if( !countries.error ) {
        return message( 200, true, countries );
    }
    return message( 500, false, 'Error en operación' );
};

const findCountryById = async ( id ) => {
    const country = await findById( id );
    if( !country.error ) {
        return message( 200, true, country );
    }
    return message( 500, false, 'Error en operación' );
}

const findCountry = async ( param ) => {
    const country = await findOne( param );
    if( !country.error ) {
        return message ( 200, true, country );
    }
    return message ( 500, false, 'Error en operación' );
};

const updateCountry = async ( id, data ) => {
    const { ...campos } = data;
    const exist = await findById( id );
    if ( !exist.error ) {
        const updatedCountry = await updateC( id, campos );
        if( !updatedCountry.error ) {
            return message ( 200, true, updatedCountry );
        }
    }
    return message ( 500, false, 'Error en operación' );
};

const deleteCountry = async ( id ) => {
    const deleted = await deleteC( id );
    if( deleted ) {
        return message ( 200, true, 'Borrado correctamente' );
    }
    return message ( 500, false, 'Error en operación' );
};

module.exports = {
    newCountry,
    findCountries,
    findCountryById,
    findCountry,
    updateCountry,
    deleteCountry
};