const Region = require( '../models/region.model' );

const save = async ( data ) => {
    try {
        const region = new Region( data );
        await region.save();
        return region.toJSON();
    } catch( error ){
        console.log( error );
        return { error: true };
    }
};

const findAll = async () => {
    try {
        const regions = await Region.find( {}, 'nombre' );
        return regions;
    } catch( error ){
        console.log( error );
        return { error: true };
    }
};

const findById = async ( id ) => {
    try {
        const region = await Region.findById( id );
        return region;
    } catch( error ){
        console.log( error );
        return { error: true };
    }
};

const findOne = async ( param ) => {
    try {
        const region = await Region.findOne({ param });
        return region;
    } catch ( error ){
        console.log( error );
        return { error: true };
    }
};

const updateR = async ( id, campos ) => {
    try{
        const updatedRegion = await Region.findByIdAndUpdate( id, campos, { new: true } );
        return updatedRegion;
    } catch ( error ){
        console.log( error );
        return { error: true };
    }
};

const deleteR = async( id ) => {
    try{
        await Region.findByIdAndDelete( id );
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
    updateR,
    deleteR
}