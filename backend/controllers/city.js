const { save, findAll, findById, findOne, updateC, deleteC } = require( '../database/city' );
const { message } = require( '../helpers/response' );

const newCity = async ( data ) => {
    const city = await save( data );
    if( !city.error ) {
        return message( 200, true, city );
    }
    return message( 500, false, 'Error en operación' );
};

const findCities = async () => {
    const cities = await findAll();
    if( !cities.error ) {
        return message( 200, true, cities );
    }
    return message( 500, false, 'Error en operación' );
};

const findCityById = async ( id ) => {
    const city = await findById( id );
    if( !city.error ) {
        return message( 200, true, city );
    }
    return message( 500, false, 'Error en operación' );
}

const findCity = async ( param ) => {
    const city = await findOne( param );
    if( !city.error ) {
        return message ( 200, true, city );
    }
    return message ( 500, false, 'Error en operación' );
};

const updateCity = async ( id, data ) => {
    const { ...campos } = data;
    const exist = await findById( id );
    if ( !exist.error ) {
        const updatedCity = await updateC( id, campos );
        if( !updatedCity.error ) {
            return message ( 200, true, updatedCity );
        }
    }
    return message ( 500, false, 'Error en operación' );
};

const deleteCity = async ( id ) => {
    const deleted = await deleteC( id );
    if( deleted ) {
        return message ( 200, true, 'Borrado correctamente' );
    }
    return message ( 500, false, 'Error en operación' );
};

module.exports = {
    newCity,
    findCities,
    findCityById,
    findCity,
    updateCity,
    deleteCity
};