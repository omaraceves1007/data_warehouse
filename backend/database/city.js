const City = require( '../models/city.model' );

const save = async ( data ) => {
    try {
        const city = new City( data );
        await city.save();
        return city.toJSON();
    } catch( error ){
        console.log( error );
        return { error: true };
    }
};

const findAll = async () => {
    try {
        const citys = await City.find( {}, 'nombre' )
                        .populate( 'region', 'nombre id' )
                        .populate( 'country', 'nombre id' )
                        .exec();
        return citys;
    } catch( error ){
        console.log( error );
        return { error: true };
    }
};

const findById = async ( id ) => {
    try {
        const city = await (await City.findById( id ))
                        .populate( 'region', 'nombre id' )
                        .populate( 'country', 'nombre id' )
                        .execPopulate();
        return city;
    } catch( error ){
        console.log( error );
        return { error: true };
    }
};

const findOne = async ( param ) => {
    try {
        const city = await City.findOne({ param });
        return city;
    } catch ( error ){
        console.log( error );
        return { error: true };
    }
};

const updateC = async ( id, campos ) => {
    try{
        const updatedcity = await City.findByIdAndUpdate( id, campos, { new: true } );
        return updatedcity;
    } catch ( error ){
        console.log( error );
        return { error: true };
    }
};

const deleteC = async( id ) => {
    try{
        await City.findByIdAndDelete( id );
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