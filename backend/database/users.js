const User = require( '../models/user.model' );
const bcrypt = require( 'bcryptjs' );

const save = async ( data ) => {
    const salt = bcrypt.genSaltSync();
    try {
        const usuario = new User( data );
        usuario.password = bcrypt.hashSync( usuario.password, salt );
        await usuario.save();
        return usuario.toJSON();
    } catch ( error ) {
        console.log( error );
        return { erro: true };
    }
};

const findAll = async () => {
    try {
        const users = await User.find({}, 'nombre apellido email img role' );
        return users;
    } catch( error ) {
        console.log( error );
        return { error: true };
    }
};

const findById = async ( id ) => {
    try {
        const user = await User.findById( id );
        return user;
    } catch ( error ){
        console.log( error );
        return { error: true };
    }
};

const findOne = async ( param ) => {
    try {
        const user = await User.findOne({ param });
        return user;
    } catch ( error ){
        console.log( error );
        return { error: true };
    }
};

const updateU = async ( id, campos ) => {
    try{
        const updatedUser = await User.findByIdAndUpdate( id, campos, { new: true } );
        return updatedUser;
    } catch ( error ){
        console.log( error );
        return { error: true };
    }
};

const deleteU = async( id ) => {
    try{
        await User.findByIdAndDelete( id );
        return true;
    } catch ( error ){
        console.log( error );
        return { error: true };
    }
}


module.exports = {
    save,
    findAll,
    findById,
    findOne,
    updateU,
    deleteU
};