const message = ( status, ok, data ) => {
    return {
        status, ok, data
    };
};

module.exports = { message };