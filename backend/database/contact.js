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

const findAll = async () => {
    try {
        const contacts = await Contact.find( {} )
                        .populate( {
                            path: 'city',
                            select: 'nombre id country',
                            populate: { 
                                path: 'country',
                                populate: { path: 'region' }
                            }
                        } )
                        .populate( 'company' )
                        .exec();
        return contacts;
    } catch( error ){
        console.log( error );
        return { error: true };
    }
};

const findById = async ( id ) => {
    try {
        const contact = await Contact.findById( id )
                        .populate( {
                            path: 'city',
                            select: 'nombre id country',
                            populate: { 
                                path: 'country',
                                populate: { path: 'region' }
                            }
                        } )
                        .populate( 'company' )
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


module.exports = {
    save,
    findAll,
    findById,
    findOne,
    updateC,
    deleteC
}