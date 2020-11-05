import { DOCUMENT } from '../dev.const.js';

export const getMenu = async ( user ) => {
    const nav = DOCUMENT.querySelector( 'div.nav-wrapper.blue.accent-4' );
    const resp = await fetch( './pages/menu.html' );
    const menu = await resp.text();
    nav.innerHTML = menu ;
    console.log(user)
    if( user.rol === 'ADMIN_ROL' ) {
        adminOpt();
    }
};

const adminOpt = () => {
    const first = DOCUMENT.querySelector( 'ul#nav-menu li:first-child' );
    let usuarios = DOCUMENT.createElement( 'li' );
    let aButton = DOCUMENT.createElement( 'a' );
        aButton.innerText = 'Usuarios';
        aButton.onclick = () => {console.log('usuario')};
    usuarios.appendChild( aButton );
    first.after( usuarios );
};