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
    const { __v, _id, region, country, ...object } = this.toObject();
    object.id = _id;
    const reg = { id: region._id, nombre: region.nombre };
    const cou = { id: country._id, nombre: country.nombre };
    object.region = reg;
    object.country = cou;
    return object;
});

module.exports = model( 'City', CitySchema );