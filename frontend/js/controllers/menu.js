import { DOCUMENT, getTemplate } from '../dev.const.js';
import { existData, deleteData } from '../controllers/storage.js';
import { initUsers } from './users.js';
import { initCompanies } from './companies.js';
import { initRegions }from './regions.js';

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
    setLogoutClick();
};

const setContactsClick = () => {
    const contact = DOCUMENT.getElementById( 'contacts' );
    contact.onclick = () => {  };
};

const setCompaniesClick = async () => {
    const company = DOCUMENT.getElementById( 'companies' );
    company.onclick = () => { initCompanies() };
};

const setRegionsClick = () => {
    const region = DOCUMENT.getElementById( 'regions' );
    region.onclick = () => { initRegions() };
};

const setLogoutClick = () => {
    const region = DOCUMENT.getElementById( 'logout' );
    region.onclick = () => { logout(); };
};

const logout = () => {
    if( existData( 'token' ) ) {
        deleteData( 'token' );
        location.reload();
    }
}