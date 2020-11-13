import { DOCUMENT, APP, URL } from '../dev.const.js';
import { getHeaders, getUsers, saveUserSer, updateUserSer, deleteUserSer } from './services.js';

const container = APP;
const URL_USER = `${URL}users/`;

export const initUsers = async () => {
    const usersTemp = await getTemplate();
    if( usersTemp !== false ) {
        container.innerHTML = usersTemp;
    }
    addEventNew();
    initSelForm();
    saveUserBtn();
    changeConfirmPass();
    // const  users = await getUsers();
    const headers = await getHeaders();
    // usersTable( users );
    usersTable( headers );
};

const getTemplate = async () => {
    try {
        const resp = await fetch( './pages/users.html' );
        const users = await resp.text();
        return users;
    } catch ( err ) {
        console.error( err );
        return false;
    }
};

const addEventNew = () => {
    const button = DOCUMENT.getElementById( 'addUser' );
    button.onclick = () => { addUser() };
};

const addUser = () => {
    const elems = document.querySelector( '.modal' );
    M.Modal.init( elems );
};

const initSelForm = () => {
    let elems = document.querySelector( 'select' );
    let instances = M.FormSelect.init(elems);
};

const saveUserBtn = () => {
    const form = DOCUMENT.getElementById( 'userForm' );
    const btnSave = DOCUMENT.getElementById( 'guardarU' );
    btnSave.onclick = () => {
        const data = new FormData( form );
        const user = {
            nombre : data.get('nombre'),
            apellido : data.get('apellido'),
            password : data.get('password'),
            email : data.get('email'),
            rol : data.get('rol')
        }
        saveUser( user );
    };
};

const deleteBtn = ( cell, formatterParams, onRendered ) => {
    const id = cell._cell.row.data.uid;
    const button = DOCUMENT.createElement('button');
    button.id = id;
    button.classList.add( 'waves-effect', 'waves-light', 'btn-small', 'red', 'accent-4' );
    button.innerHTML = '<i class="material-icons">delete_forever</i>';
    button.onclick = () =>  { deleteUser( id, cell ) };
    onRendered( function () {
        cell._cell.element.appendChild( button );
    })
};

const usersTable = async ( info ) => {
    await new Tabulator("#usersTable", {
        pagination: 'remote',
        paginationSizeSelector: [ 5, 10, 15 ],
        paginationSize: 5,
        ajaxURL: URL_USER,
        ajaxConfig: { method: 'GET', headers: info },
        ajaxSorting: true,
        ajaxURLGenerator: getData,
        ajaxResponse: respData,
        layout: "fitDataStretch",
        columns: [
            { formatter:"rowSelection", titleFormatter:"rowSelection", hozAlign:"center", headerSort:false,
                cellClick:function(e, cell){
                    cell.getRow().toggleSelect();
            } },
            { title:"Nombre", field:"nombre", width:'15%', hozAlign:"center", editor:"input", formatterParams:{
                margin:"auto",
            } },
            { title:"Apellido", field:"apellido", width:'15%', hozAlign:"center", editor:"input" },
            { title:"Email", field:"email", width:'25%', hozAlign:"center", editor:"input" },
            { title:"Rol", field:"rol", width:'20%', hozAlign:"center", editor:"select",
                editorParams:{values:{"ADMIN_ROL":"ADMIN_ROL", "USER_ROL":"USER_ROL" } } },
            { title:"Acciones", hozAlign:"center", formatter: deleteBtn, headerSort:false, }
        ],
        rowSelectionChanged: expData,
        cellEdited: updateUser,
    });
};

const getData = ( url, config, params ) => {
    let { skip, limit, sort, way, page, size, sorters } = params;
    size && size === 5 ? limit = 5 : limit = size;
    page && page === 1 ? skip = 0 : skip = ( page -1 ) * limit;
    if( sorters.length > 0 ) {
        sorters[0] ? sort = sorters[0].field : sort;
        sorters[0] && sorters[0].dir ==='asc' ? way = -1 : way = 1;
    } else {
        sort = '_id';
        way = 1;
    }
    return `${url}?skip=${skip}&limit=${limit}&sort=${sort}&way=${way}`;
};

const respData = ( url, params, response ) =>{
    const resp = {
        last_page: response.data.last_page,
        data: response.data.users
    }
    return resp;
};

const saveUser = async( user ) => {
    const elem = document.querySelector( '.modal' );
    const modal = await M.Modal.getInstance( elem );
    const resp = await saveUserSer( user );
    message( resp, '¡Éxito al guardar!', '¡Error al guardar!' );
    modal.close();
    initUsers();
};

const deleteUser = async ( id, cell ) => {
    const row = cell._cell.row;
    const resp = await deleteUserSer( id );
    message ( resp, '¡Eliminado correctamente!', '¡Error al eliminar!' );
    await row.delete();
};

const updateUser = async ( cell ) => {
    const row = cell._cell.row;
    const data = row.data;
    const id = data.uid;
    const  resp = await updateUserSer( data, id );
    message( resp, '¡Éxito al actualizar!', '¡Error al actualizar!' );
};

const expData = ( userList ) => {
    // document.getElementById("select-stats").innerHTML = data.length;
    if( userList.length > 0 ){
        console.log ( userList );
    }
}

const changeConfirmPass = () => {
    const change = DOCUMENT.getElementById('confirm_password');
    change.onkeyup = () => { samePass( change ) };
};

const samePass = async ( input ) => {
    const form = DOCUMENT.getElementById( 'userForm' );
    const span = DOCUMENT.querySelector( 'span.helper-text' );
    const data = new FormData( form );
    const password = data.get( 'password' );
    setTimeout(() => {
        if( input.value !== password ) {
            input.classList.remove( 'valid' );
            span.classList.remove( 'hide' );
            input.classList.add( 'invalid' );
        } else {
            input.classList.add( 'valid' );
            span.classList.add( 'hide' );
            input.classList.remove( 'invalid' );
        }
    }, 500);
}

const message = ( data, msgok, msgbad ) => {
    if( data.ok ) {
        if( data.data.nombre ){
            swal( 'Exito', `${msgok} ${data.data.nombre}`, 'success' );    
        } else {
            swal( 'Exito', msgok, 'success' );
        }
    } else {
        console.error( data );
        swal( 'Error', msgbad , 'error' );
    }
}