import { existData, getData } from './controllers/storage.js';
import { getLogin } from './controllers/login.js';
import { getMenu } from './controllers/menu.js';
import { userInfo } from './dev.const.js';

let TOKEN = '';

( () => {
    if( existData( 'token' ) ) {
        TOKEN = getData( 'token' );
        const USUARIO = userInfo( TOKEN );
        getMenu( USUARIO );
    } else {
        getLogin();
    }
})();


// get funciona sin problemas
// fetch( 'http://localhost:3000/api/regions/', {
//     headers:{
//         authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjp7InJvbCI6IkFETUlOX1JPTCIsIm5vbWJyZSI6Im9tYXIiLCJhcGVsbGlkbyI6ImFjZXZlcyIsImVtYWlsIjoibWFudWVsLmFjZXYwMUBnbWFpbC5jb20iLCJ1aWQiOiI1Zjk1YzVkOWMzZjI2YTQ5ZGM3NDg4NWQifX0.S3NkpAjhxl6slxrb1mu1S4OtHzFANr9JW3qd6qLqfgg'
//     }
// }).then( res => res.json() )
// .then(console.log)
// headers: { 'Content-type': 'application/json' },