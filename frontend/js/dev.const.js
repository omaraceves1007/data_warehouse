export const URL = 'http://localhost:3000/api/';
export const CONTENT_TYPE = { 'Content-type': 'application/x-www-form-urlencoded' } ;
export const AUTH = { Authorization: '' } ;
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
// export const = ;
// export const = ;
// export const = ;
// export const = ;
// export const = ;
// export const = ;
// export const = ;
// export const = ;