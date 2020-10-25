const mongoose = require( 'mongoose' );
const db = process.env.DB_MN;

async function connection() {
    try{
        await mongoose.connect( db, { 
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        } );
        console.log( 'DB Connect' );
    } catch( error ) {
        console.log( error );
        throw new Error( 'DB Connect Error' );
    }
}

module.exports = {
    connection
};