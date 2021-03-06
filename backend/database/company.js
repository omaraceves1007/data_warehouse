const Company = require( '../models/company.model' );

const save = async ( data ) => {
    try {
        const company = new Company( data );
        await company.save();
        return company.toJSON();
    } catch( error ){
        console.log( error );
        return { error: true };
    }
};

const findAll = async ( query ) => {
    let skip, limit, sort, way, sorting
    if( query.skip ) {
        skip = parseInt( query.skip, 10 );
        limit = parseInt( query.limit, 10 );
        sort = query.sort;
        way = parseInt( query.way, 10 );
        sorting = {};
        sorting[sort] = way;
    }
    try {
        const companies = query.skip ? await Company.find( {} )
                        .populate( {
                            path: 'city',
                            select: 'nombre id country',
                            populate: { 
                                path: 'country',
                                populate: { path: 'region' }
                            }
                        } )
                        .skip( skip ).limit( limit ).sort( sorting )
                        .exec() : 
                        await Company.find( {} )
                        .populate( {
                            path: 'city',
                            select: 'nombre id country',
                            populate: { 
                                path: 'country',
                                populate: { path: 'region' }
                            }
                        } );
        if( query.skip ) {
            const last = await getLastPage( limit );
            return { last_page: last, companies };
        }
        return companies;
    } catch( error ){
        console.log( error );
        return { error: true };
    }
};

const findById = async ( id ) => {
    try {
        const company = await Company.findById( id )
                        .populate( {
                            path: 'city',
                            select: 'nombre id country',
                            populate: { 
                                path: 'country',
                                populate: { path: 'region' }
                            }
                        } )
                        .exec();
        return company;
    } catch( error ){
        console.log( error );
        return { error: true };
    }
};

const findOne = async ( param ) => {
    try {
        const company = await Company.findOne({ param });
        return company;
    } catch ( error ){
        console.log( error );
        return { error: true };
    }
};

const updateC = async ( id, campos ) => {
    try{
        const updatedcompany = await Company.findByIdAndUpdate( id, campos, { new: true } );
        return updatedcompany;
    } catch ( error ){
        console.log( error );
        return { error: true };
    }
};

const deleteC = async( id ) => {
    try{
        await Company.findByIdAndDelete( id );
        return true;
    } catch ( error ){
        console.log( error );
        return { error: true };
    }
}

const getLastPage = async ( size ) => {
    try {
        const all = await Company.find({});
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
    deleteC
}