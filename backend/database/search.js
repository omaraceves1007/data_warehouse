const Contact = require( '../models/contact.model' );
const Company = require( '../models/company.model' );
const Region = require( '../models/region.model' );
const Country = require( '../models/country.model' );
const City = require( '../models/city.model' );

const findExp = async ( exp ) => {
    const regex = new RegExp( exp, 'i');
    try {
        const [ nombre, apellido, email, cargo, interes, canales, company, city, country, region ] = await Promise.all([
            Contact.find( { nombre: regex }, 'nombre' ).limit(3),
            Contact.find( { apellido: regex }, 'apellido' ).limit(3),
            Contact.find( { email: regex }, 'email' ).limit(3),
            Contact.find( { cargo: regex }, 'cargo' ).limit(3),
            Contact.find( { interes: regex }, 'interes' ).limit(3),
            Contact.find( { 'canales.nombre': regex}, { 'canales': { $elemMatch: { nombre: regex } } } ).limit(3),
            Company.find( { nombre: regex }, 'nombre' ). limit(3),
            City.find( { nombre: regex }, 'nombre' ).limit(3),
            Country.find( { nombre: regex }, 'nombre' ).limit(3),
            Region.find( { nombre: regex }, 'nombre' ).limit(3),
        ]);
        const contacts = [ nombre, apellido, email, cargo, interes, company, canales, city, country, region ];
        return contacts;
    } catch( error ){
        console.log( error );
        return { error: true };
    }
};

const findContacts = async ( exp ) => {
    let id = exp.includes('-ID') ? true : false;
    const regex = exp.includes('-ID') ? exp.slice( 0, -3 )
                    : new RegExp( exp, 'i');
    let contacts;
    try{
        if( id ) {
            contacts =  Contact.find( { $or : [ { company: regex }, { region: regex },
                                    { country: regex }, { city: regex }
                                ] } )
                                .populate( 'company', 'nombre' )
                                .populate( 'country', 'nombre' )
                                .populate( 'region', 'nombre' )
                                .exec();
        } else {
            contacts =  Contact.find( { $or : [ { nombre: regex }, { apellido: regex }, { cargo: regex },
                                                { email: regex }, { apellido: regex }, { cargo: regex },
                                                { 'canales.nombre': regex }, { 'canales.preferencia': regex }, { direccion: regex },
                                                { interes: regex }
                                            ] } )
                                            .populate( 'company', 'nombre' )
                                            .populate( 'country', 'nombre' )
                                            .populate( 'region', 'nombre' )
                                            .exec();
        }
        return contacts;
    } catch( error ) {
        console.log( error );
        return { error: true };
    }
};

// find by especific property
const findParamContacts = async ( query, options ) => {
    const skip = parseInt( options.skip, 10 ),
        limit = parseInt( options.limit, 10 ),
        sort = options.sort,
        way = parseInt( options.way, 10 ),
        sorting = {};
    sorting[sort] = way;
    try{
        const contacts = await Contact.find( query )
                            .populate( 'company', 'nombre' )
                            .populate( 'country', 'nombre' )
                            .populate( 'region', 'nombre' )
                            .skip( skip ).limit( limit ).sort( sorting )
                            .exec();
        return contacts;
    } catch( error ) {
        console.log( error );
        return { error: true };
    }
};

module.exports = {
    findExp,
    findContacts,
    findParamContacts
};