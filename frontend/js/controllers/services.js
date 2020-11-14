import { URL, CONTENT_TYPE, setAuth, getAuth } from '../dev.const.js';
import { existData, getData } from './storage.js';

const setAuthorization = () => {
    if( existData( 'token' ) ) {
        const token = JSON.parse( getData( 'token' ) );
        setAuth( `Bearer ${token}` );
    }
}

export const getHeaders = () => {
    setAuthorization();
    const auth = getAuth();
    return {
        'Content-type': CONTENT_TYPE['Content-type'],
        Authorization: auth.Authorization
    }
}

// User Services
export const getUsers = async ( skip = 0, limit = 5, sort = '_id', way = 1 ) => {
    const options = {
        headers: getHeaders()
    };
    try{
        const resp = await fetch( `${URL}users/?skip=${skip}&limit=${limit}&sort=${sort}&way=${way}`, options );
        const info = await resp.json();
        if( info.ok ){
            return info.data;
        }
        return false;
    } catch ( err ) {
        console.error( err );
        return false;
    }
};

export const saveUserSer = async ( user ) => {
    const body = setURLParams( user );
    const options = setOptions( body, 'POST' );
    try{
        const new_user = await fetch( `${URL}users`, options );
        const message = await new_user.json();
        return message;
    } catch( error ) { console.error( error ) }
};

export const updateUserSer = async ( user, id )  => {
    const body = setURLParams( user );
    const options = setOptions( body, 'PUT' );
    try{
        const updated_user = await fetch( `${ URL }users/${ id }`, options );
        const message = await updated_user.json();
        return message;
    } catch( error ) { console.error( error ) }
};

export const deleteUserSer = async ( id ) => {
    const options = setOptions( false, 'DELETE' );
    try {
        const deleted = await fetch( `${ URL }users/${ id }`, options );
        const message = await deleted.json();
        return message;
    } catch( error ) { console.error( error ) }
};

// Citys Services

export const getCitiesSer = async () => {
    const options = setOptions( false, 'GET' );
    try {
        const resp = await fetch( `${ URL }cities`, options );
        const cities = await resp.json();
        return cities;
    } catch( error ) { console.error( error ) }
};

export const saveCompanySer = async ( company ) => {
    const body = setURLParams( company );
    const options = setOptions( body, 'POST' );
    try{
        const new_company = await fetch( `${URL}companies`, options );
        const message = await new_company.json();
        return message;
    } catch( error ) { console.error( error ) }
};

export const updateCompanySer = async ( company, id )  => {
    const body = setURLParams( company, true );
    const options = setOptions( body, 'PUT' );
    try{
        const updated_company = await fetch( `${ URL }companies/${ id }`, options );
        const message = await updated_company.json();
        return message;
    } catch( error ) { console.error( error ) }
};

export const deleteCompanySer = async ( id ) => {
    const options = setOptions( false, 'DELETE' );
    try {
        const deleted = await fetch( `${ URL }companies/${ id }`, options );
        const message = await deleted.json();
        return message;
    } catch( error ) { console.error( error ) }
};

// config petitions
const setURLParams = ( data, update ) => {
    let info = new URLSearchParams();
    let keys = Object.keys( data );
    let values = Object.values( data );
    for ( let i = 0; i < keys.length; i++ ) {
        if( keys[i] === 'city' && update ){
            info.append( keys[i], values[i].id );    
        } else {
            info.append( keys[i], values[i] );
        }
    }
    return info;
};

const setOptions = ( body, method ) => {
    if ( !body ) {
        return { headers: getHeaders(), method };
    }
    return { headers: getHeaders(), method, body }
};