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
    const body = createURLParams( user );
    const options = {
        headers: getHeaders(),
        method: 'POST',
        body
    };
    try{
        const new_user = await fetch( `${URL}users`, options );
        const message = await new_user.json();
        return message;
    } catch( error ) { console.error( error ) }
};

const createURLParams = ( data ) => {
    let info = new URLSearchParams();
    let keys = Object.keys( data );
    let values = Object.values( data );
    for ( let i = 0; i < keys.length; i++ ) {
        info.append( keys[i], values[i] );
    }
    return info;
};