const { Schema, model }  = require( 'mongoose' );

const UsersSchema = Schema( {
    nombre: {
        type: String,
        required: true
    },
    apellido: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    img: {
        type: String,
    },
    rol: {
        type: String,
        enum: ['USER_ROL', 'ADMIN_ROL'],
        required: true,
        default: 'USER_ROL'
    },
} );

UsersSchema.method('toJSON', function() {
    const { __v, _id, password, ...object } = this.toObject();
    object.uid = _id;
    return object;
});

module.exports = model( 'User', UsersSchema );