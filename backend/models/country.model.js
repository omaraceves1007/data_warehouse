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
    const { __v, _id, region, ...object } = this.toObject();
    object.id = _id;
    if ( region && region._id ) {
        const reg = { id: region._id, nombre: region.nombre };
        object.region = reg;
    }
    object.region = region;
    return object;
});

module.exports = model( 'Country', CountrySchema );