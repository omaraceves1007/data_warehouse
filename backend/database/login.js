const User = require( '../models/user.model' );

const login = async ( email ) => {
    try {
        const user = await User.findOne({ email });
        return user;
    } catch ( error ){
        console.log( error );
        return { error: true };
    }
};

module.exports = {
    login
};