const { Schema, model }  = require( 'mongoose' );

const RegionSchema = Schema( {
    nombre: {
        type: String,
        required: true,
        unique: true
    }
} );

RegionSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = model( 'Region', RegionSchema );