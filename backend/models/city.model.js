const { Schema, model }  = require( 'mongoose' );

const CitySchema = Schema( {
    nombre: {
        type: String,
        required: true,
        unique: true
    },
    region: {
        type: Schema.Types.ObjectId,
        ref: 'Region',
        required: true
    },
    country: {
        type: Schema.Types.ObjectId,
        ref: 'Country',
        required: true
    }
} );

CitySchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = model( 'City', CitySchema );