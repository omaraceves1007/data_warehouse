import { URL_API, CONTENT_TYPE, setToken } from '../dev.const.js';
import { existData, save } from '../controllers/storage.js';

export const getLogin = async () => {
    const LOGIN_T = document.getElementById( 'login' );
    const LOGIN = await fetch( './pages/login.html' );
    const LOGIN_HTML = await LOGIN.text();
    LOGIN_T.innerHTML = LOGIN_HTML;
    setLogin();
};

const setLogin = async () => {
    const form = document.getElementById( 'loginForm' );
    const sendForm = document.getElementById('send');
    
    sendForm.addEventListener( 'click', (event) => {
        event.preventDefault();
        const data = new FormData( form );
        login( data);
    });
}

const login = ( data ) => {
    const urlencoded = new URLSearchParams();
    urlencoded.append("email", data.get( 'email' ) );
    urlencoded.append("password", data.get( 'password' ) );
    const options = {
        method: 'POST',
        headers: CONTENT_TYPE,
        body: urlencoded
    };
    fetch( `${URL_API}login/`, options )
    .then( resp => resp.json() )
    .then( session => saveToken( session ) )
    .catch( error => console.log( error ) );
};

const saveToken = ( res ) => {
    if( res.ok ) {
        if( !existData( 'token' ) ) {
            save( { key: 'token', data : res.data } );
            setToken( res.data );
            location.reload();
        }
    } else {
        console.log( res.data );
        Swal.fire( 'Error al iniciar sesión', res.data, 'error' );
    }
}; 