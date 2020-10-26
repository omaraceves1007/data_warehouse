const Country = require( '../models/country.model' );

const save = async ( data ) => {
    try {
        const country = new Country( data );
        await country.save();
        return country.toJSON();
    } catch( error ){
        console.log( error );
        return { error: true };
    }
};

const findAll = async () => {
    try {
        const countrys = await Country.find( {}, 'nombre' );
        return countrys;
    } catch( error ){
        console.log( error );
        return { error: true };
    }
};

const findById = async ( id ) => {
    try {
        const country = await (await Country.findById( id ))
                        .populate( 'region', 'nombre id' )
                        .execPopulate();
        return country;
    } catch( error ){
        console.log( error );
        return { error: true };
    }
};

const findOne = async ( param ) => {
    try {
        const country = await Country.findOne({ param });
        return country;
    } catch ( error ){
        console.log( error );
        return { error: true };
    }
};

const updateC = async ( id, campos ) => {
    try{
        const updatedcountry = await Country.findByIdAndUpdate( id, campos, { new: true } );
        return updatedcountry;
    } catch ( error ){
        console.log( error );
        return { error: true };
    }
};

const deleteC = async( id ) => {
    try{
        await Country.findByIdAndDelete( id );
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