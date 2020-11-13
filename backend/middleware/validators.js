const { response, request } = require ( 'express' );
const { check, validationResult } = require("express-validator");
const { message } = require( '../helpers/response' );

const userNotNull = async( req = request, res = response, next ) => {
    await check('nombre', 'Nombre de Usuario obligatorio').exists( { checkFalsy: true, checkNull: true } ).run( req );
    await check('apellido', 'Apellido de Usuario obligatorio').exists( { checkFalsy: true, checkNull: true } ).run( req );
    await check('email', 'Email de Usuario obligatorio').exists( { checkFalsy: true, checkNull: true } ).run( req );
    await check('email', 'El campo debe ser un email valido').isEmail().run( req );
    await check('password', 'Password de Usuario obligatorio').exists( { checkFalsy: true, checkNull: true } ).run( req );
    await check('rol', 'Rol de Usuario obligatorio').exists( { checkFalsy: true, checkNull: true } ).run( req );
    const error = await results( validationResult( req ) );
    if( error ) {
        return res.send( message( 400, false, error ) );
    } else{
        next();
    }
};

const uUserNotNull = async( req = request, res = response, next ) => {
    await check('nombre', 'Nombre de Usuario obligatorio').exists( { checkFalsy: true, checkNull: true } ).run( req );
    await check('apellido', 'Apellido de Usuario obligatorio').exists( { checkFalsy: true, checkNull: true } ).run( req );
    await check('email', 'Email de Usuario obligatorio').exists( { checkFalsy: true, checkNull: true } ).run( req );
    await check('email', 'El campo debe ser un email valido').isEmail().run( req );
    await check('rol', 'Rol de Usuario obligatorio').exists( { checkFalsy: true, checkNull: true } ).run( req );
    const error = await results( validationResult( req ) );
    if( error ) {
        return res.send( message( 400, false, error ) );
    } else{
        next();
    }
};


const results = async ( validator ) => {
    if( !validator.isEmpty() ) {
        return validator.array();
    }
    return false;
};

module.exports = {
    userNotNull,
    uUserNotNull
};