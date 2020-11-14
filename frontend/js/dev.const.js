export const URL = 'http://localhost:3000/api/';
export const CONTENT_TYPE = { 'Content-type': 'application/x-www-form-urlencoded' } ;
let AUTH = { Authorization: null } ;
export const setAuth = ( auth ) => AUTH.Authorization = auth;
export const getAuth = () => AUTH;
let TOKEN = '';
export const setToken = ( token ) => { console.log(token);TOKEN = token};
export const getToken = () => TOKEN;
export const DOCUMENT = document ;
export const userInfo = ( token ) => {
    let base64Url = token.split( '.' )[ 1 ];
    let base64 = base64Url.replace( /-/g, '+' ).replace( /_/g, '/' );
    let jsonPayload = decodeURIComponent( atob( base64 )
            .split( '' )
            .map( function( c ) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));
    const userJson = JSON.parse( jsonPayload );
    return userJson.user;
};
export const APP = DOCUMENT.getElementById( 'app' );
let USER = {};
export const setUser = ( user ) =>{
    USER = { ...user };
};
export const getUser = () => USER;
export const getTemplate = async ( option ) => {
    try{
        const resp = await fetch( `./pages/${option}.html` );
        const menu = await resp.text();
        return menu;
    } catch ( error ) {
        console.error( error );
        return false;
    }
};
// export const = ;
// export const = ;
// export const = ;
// export const = ;