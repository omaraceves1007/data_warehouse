import { DOCUMENT, APP, URL, getTemplate, disableSubmit } from '../dev.const.js';
import { getHeaders, getCitiesSer, getRegionsSer, getCountriesSer, getCompaniesSer,
    saveContactSer,
    updateContactSer,
    deleteContactSer, } from './services.js';

const container = APP;
const URL_COM = `${URL}contacts/`;

export const initContacts = async () => {
    const companiesTemp = await getTemplate( 'contacts' );
    const headers = await getHeaders();
    if( companiesTemp !== false ) {
        container.innerHTML = companiesTemp;
    }
    disableSubmit();
    addEventNew();
    // await getCities();
    // initSelForm();
    // saveUserBtn();
    setTable( headers );
};

const addEventNew = () => {
    const button = DOCUMENT.getElementById( 'addContact' );
    button.onclick = () => { addCompany() };
};

const addCompany = () => {
    const elems = document.querySelector( '.modal' );
    M.Modal.init( elems );
};


// Table configurations

const deleteBtn = ( cell, formatterParams, onRendered ) => {
    const id = cell._cell.row.data.id;
    const button = DOCUMENT.createElement('button');
    button.id = id;
    button.classList.add( 'waves-effect', 'waves-light', 'btn-small', 'red', 'accent-4' );
    button.innerHTML = '<i class="material-icons">delete_forever</i>';
    button.onclick = () =>  { deleteCompany( id, cell ) };
    onRendered( function () {
        cell._cell.element.appendChild( button );
    });
};

const setTable = async ( info ) => {
    await new Tabulator("#contactsTable", {
        pagination: 'remote',
        paginationSizeSelector: [ 5, 10, 15 ],
        paginationSize: 5,
        ajaxURL: URL_COM,
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
            { title:"Contacto", field:"nombre"/* , width:'15%' */, hozAlign:"center", editor:"input" },
            { title:"País/Región", field:"country.nombre"/* , width:'15%' */, hozAlign:"center", editor:"input" },
            { title:"Compañia", field:"company.nombre"/* , width:'25%' */, hozAlign:"center", editor:"input" },
            { title:"Cargo", field:"cargo", /* width:'10%', */ hozAlign:"center", editor:"input" },
            { title:"Canal preferido", field:"canales[0].nombre", /* width:'10%', */ hozAlign:"center", editor:"input" },
            { title:"Interés", field:"interes", /* width:'10%', */ hozAlign:"center", editor:"input" },
            // { title:"Ciudad", field:"city.nombre", width:'20%', hozAlign:"center", editor:"select",
            //     editorParams:{ values: { ...CTABLE } } },
            { title:"Acciones", hozAlign:"center", formatter: deleteBtn, headerSort:false, }
        ],
        rowSelectionChanged: expData,
        // cellEdited: updateCompany,
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

const respData = ( url, params, response ) => {console.log(response)
    const resp = {
        last_page: response.data.last_page,
        data: response.data.contacts
    }
    return resp;
};

const deleteCompany = async ( id, cell ) => {
    const row = cell._cell.row;console.log(row);
    // const resp = await deleteCompanySer( id );
    // message ( resp, '¡Eliminado correctamente!', '¡Error al eliminar!' );
    // if( resp.ok ){
    //     await row.delete();
    // }
};

// const updateCompany = async ( cell ) => {
//     const row = cell._cell.row;
//     const data = row.data;
//     const id = data.id;
//     const newVal = cell._cell.value;
//     if ( newVal in CITIES ) {
//         data.city.id = CITIES[newVal];
//         data.city.nombre = newVal;
//     }
//     const  resp = await updateCompanySer( data, id );
//     message( resp, '¡Éxito al actualizar!', '¡Error al actualizar!' );
// };

const expData = ( userList ) => {
    // document.getElementById("select-stats").innerHTML = data.length;
    if( userList.length > 0 ){
        console.log ( userList );
    }
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
