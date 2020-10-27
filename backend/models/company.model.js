const { Schema, model }  = require( 'mongoose' );

const CompanySchema = Schema( {
    nombre: {
        type: String,
        required: true,
        unique: true
    },
    direccion: {
        type: String,
        required: true,
        unique: true
    },
    telefono: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    city: {
        type: Schema.Types.ObjectId,
        ref: 'City',
        required: true
    }
} );

CompanySchema.method('toJSON', function() {
    const { __v, _id, city, ...object } = this.toObject();
    object.id = _id;
    if( city.country ) {
        const reg = { id: city.country.region._id, nombre: city.country.region.nombre };
        const cou = { id: city.country._id, nombre: city.country.nombre, region: reg };
        const cit = { id: city._id, nombre: city.nombre, country: cou };
        object.city = cit;
    } else {
        object.city = city;
    }
    return object;
});

module.exports = model( 'Company', CompanySchema );