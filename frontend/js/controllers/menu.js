import { DOCUMENT, getTemplate } from '../dev.const.js';
import { initUsers } from './users.js';
import { initCompanies } from './companies.js';

export const getMenu = async ( user ) => {
    const nav = DOCUMENT.querySelector( 'div.nav-wrapper.blue.accent-4' );
    const menu = await getTemplate( 'menu' );
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

const setListeners = () => {
    setContactsClick();
    setCompaniesClick();
    setRegionsClick();
};

const setContactsClick = () => {
    const contact = DOCUMENT.getElementById( 'contacts' );
    contact.onclick = () => { console.log('contacts')}
};

const setCompaniesClick = async () => {
    const company = DOCUMENT.getElementById( 'companies' );
    // ejecutar init company
    company.onclick = () => { initCompanies() };
};

const setRegionsClick = () => {
    const region = DOCUMENT.getElementById( 'regions' );
    region.onclick = () => { console.log('regions')}
};