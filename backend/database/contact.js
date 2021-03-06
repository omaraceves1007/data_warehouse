const Contact = require( '../models/contact.model' );

const save = async ( data ) => {
    try {
        const contact = new Contact( data );
        await contact.save();
        return contact.toJSON();
    } catch( error ){
        console.log( error );
        return { error: true };
    }
};

const findAll = async ( query ) => {
    const skip = parseInt( query.skip, 10 ),
        limit = parseInt( query.limit, 10 ),
        sort = query.sort,
        way = parseInt( query.way, 10 ),
        sorting = {};
    sorting[sort] = way;
    try {
        const contacts = await Contact.find( {} )
                        .populate( 'company', 'nombre' )
                        .populate( 'country', 'nombre' )
                        .populate( 'region', 'nombre' )
                        .populate( 'city', 'nombre' )
                        .skip( skip ).limit( limit ).sort( sorting )
                        .exec();
        const last = await getLastPage( limit );
        return { last_page: last, contacts };
    } catch( error ){
        console.log( error );
        return { error: true };
    }
};

const findById = async ( id ) => {
    try {
        const contact = await Contact.findById( id )
                        .populate( 'company', 'nombre' )
                        .populate( 'country', 'nombre' )
                        .populate( 'region', 'nombre' )
                        .populate( 'city', 'nombre' )
                        .exec();
        return contact;
    } catch( error ){
        console.log( error );
        return { error: true };
    }
};

const findOne = async ( param ) => {
    try {
        const contact = await Contact.findOne({ param });
        return contact;
    } catch ( error ){
        console.log( error );
        return { error: true };
    }
};

const updateC = async ( id, campos ) => {
    try{
        const updatedcontact = await Contact.findByIdAndUpdate( id, campos, { new: true } );
        return updatedcontact;
    } catch ( error ){
        console.log( error );
        return { error: true };
    }
};

const deleteC = async( id ) => {
    try{
        await Contact.findByIdAndDelete( id );
        return true;
    } catch ( error ){
        console.log( error );
        return { error: true };
    }
}

const updateIma = async ( image, id ) => {
    try{
        const contact = await Contact.findById( id );
        if( !contact ) { return {error: true } };
        contact.image = image;
        contact.save();
        return contact;
    } catch ( error ){
        console.log( error );
        return { error: true };
    }
}

const getLastPage = async ( size ) => {
    try {
        const all = await Contact.find({});
        const pages = all.length / size;
        const last = Math.ceil( pages );
        return last;
    } catch( error ) {
        console.log( error );
        return{ error: true };
    }
}

module.exports = {
    save,
    findAll,
    findById,
    findOne,
    updateC,
    deleteC,
    updateIma
}