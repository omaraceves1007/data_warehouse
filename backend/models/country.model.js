const { Schema, model }  = require( 'mongoose' );

const CountrySchema = Schema( {
    nombre: {
        type: String,
        required: true,
        unique: true
    },
    region: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Region',
    }
} );

CountrySchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = model( 'Country', CountrySchema );