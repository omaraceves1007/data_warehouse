const { save, findAll, findById, findOne, updateC, deleteC } = require( '../database/company' );
const { message } = require( '../helpers/response' );

const newCompany = async ( data ) => {
    const company = await save( data );
    if( !company.error ) {
        return message( 200, true, company );
    }
    return message( 500, false, 'Error en operación' );
};

const findCities = async () => {
    const companies = await findAll();
    if( !companies.error ) {
        return message( 200, true, companies );
    }
    return message( 500, false, 'Error en operación' );
};

const findCompanyById = async ( id ) => {
    const company = await findById( id );
    if( !company.error ) {
        return message( 200, true, company );
    }
    return message( 500, false, 'Error en operación' );
}

const findCompany = async ( param ) => {
    const company = await findOne( param );
    if( !company.error ) {
        return message ( 200, true, company );
    }
    return message ( 500, false, 'Error en operación' );
};

const updateCompany = async ( id, data ) => {
    const { ...campos } = data;
    const exist = await findById( id );
    if ( !exist.error ) {
        const updatedCompany = await updateC( id, campos );
        if( !updatedCompany.error ) {
            return message ( 200, true, updatedCompany );
        }
    }
    return message ( 500, false, 'Error en operación' );
};

const deleteCompany = async ( id ) => {
    const deleted = await deleteC( id );
    if( deleted ) {
        return message ( 200, true, 'Borrado correctamente' );
    }
    return message ( 500, false, 'Error en operación' );
};

module.exports = {
    newCompany,
    findCities,
    findCompanyById,
    findCompany,
    updateCompany,
    deleteCompany
};