import { URL, CONTENT_TYPE, setAuth, getAuth } from '../dev.const.js';
import { existData, getData } from './storage.js';

const setAuthorization = () => {
    if( existData( 'token' ) ) {
        const token = JSON.parse( getData( 'token' ) );
        setAuth( `Bearer ${token}` );
    }
}

const getHeaders = () => {
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
    fetch( `${URL}users/?skip=${skip}&limit=${limit}&sort=${sort}&way=${way}`, options )
        .then( res => res.json() )
        .then( console.log )
        .catch( console.error );
};