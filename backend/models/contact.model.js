const { Schema, model }  = require( 'mongoose' );

const ContactSchema = Schema( {
    nombre: {
        type: String,
        required: true,
    },
    apellido: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    cargo: {
        type: String,
        required: true,
    },
    company: {
        type: Schema.Types.ObjectId,
        ref: 'Company',
        required: true
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
    },
    city: {
        type: Schema.Types.ObjectId,
        ref: 'City',
        required: true
    },
    direccion: {
        type: String,
        required: true,
    },
    interes: {
        type: String,
        enum: [ '0%', '25%', '50%', '75%', '100%' ],
        required: true,
    },
    canales: {
        type: Array,
        required: true,
    }
} );

ContactSchema.method('toJSON', function() {
    const { __v, _id, region, country, city, company, ...object } = this.toObject();
    object.id = _id;
    if( city.country && company.nombre ) {
        const reg = { id: city.country.region._id, nombre: city.country.region.nombre };
        const cou = { id: city.country._id, nombre: city.country.nombre, region: reg };
        const cit = { id: city._id, nombre: city.nombre, country: cou };
        const com = { id: company._id, nombre: company.nombre };
        object.compay = com;
        object.city = cit;
    } else {
        object.company = company;
        object.region = region;
        object.country = country;
        object.city = city;
    }
    return object;
});

module.exports = model( 'Contact', ContactSchema );