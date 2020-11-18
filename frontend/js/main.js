import { existData, getData } from './controllers/storage.js';
import { getLogin } from './controllers/login.js';
import { getMenu } from './controllers/menu.js';
import { userInfo, setUser } from './dev.const.js';
import { initContacts }from './controllers/constacts.js';

let TOKEN = '';

( () => {
    if( existData( 'token' ) ) {
        TOKEN = getData( 'token' );
        const USER = userInfo( TOKEN );
        setUser( USER );
        getMenu( USER );
        initContacts();        
    } else {
        getLogin();
    }
})();