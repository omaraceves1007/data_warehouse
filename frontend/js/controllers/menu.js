import { DOCUMENT } from '../dev.const.js';
import { initUsers } from './users.js';

export const getMenu = async ( user ) => {
    const nav = DOCUMENT.querySelector( 'div.nav-wrapper.blue.accent-4' );
    const menu = await getMenuTemplate();
    if( menu !== false ) {
        nav.innerHTML = menu ;
        if( user.rol === 'ADMIN_ROL' ) {
            adminOpt();
        }
    }
    setListeners();
};

const adminOpt = () => {
    const first = DOCUMENT.querySelector( 'ul#nav-menu li:first-child' );
    let usuarios = DOCUMENT.createElement( 'li' );
    let aButton = DOCUMENT.createElement( 'a' );
        aButton.innerText = 'Usuarios';
        aButton.id = 'users';
        aButton.onclick = () => { initUsers(); };
    usuarios.appendChild( aButton );
    first.after( usuarios );
};

const getMenuTemplate = async () => {
    try{
        const resp = await fetch( './pages/menu.html' );
        const menu = await resp.text();
        return menu;
    } catch ( error ) {
        console.error( error );
        return false;
    }
};

const setListeners = () => {
    setContactsClick();
    setCompaniesClick();
    setRegionsClick();
};

const setContactsClick = () => {
    const contact = DOCUMENT.getElementById( 'contacts' );
    contact.onclick = () => { console.log('contacts')}
};

const setCompaniesClick = () => {
    const company = DOCUMENT.getElementById( 'companies' );
    company.onclick = () => { console.log('companies')}
};

const setRegionsClick = () => {
    const region = DOCUMENT.getElementById( 'regions' );
    region.onclick = () => { console.log('regions')}
};