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

export const getUsers = async ( skip = 0, limit = 5, sort = '_id', way = 1 ) => {
    const options = {
        headers: getHeaders()
    }
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