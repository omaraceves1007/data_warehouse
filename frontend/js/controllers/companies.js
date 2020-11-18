import { DOCUMENT, APP, URL, getTemplate, disableSubmit } from '../dev.const.js';
import { getHeaders, getCitiesSer, saveCompanySer, updateCompanySer, deleteCompanySer } from './services.js';

const container = APP;
const URL_COM = `${URL}companies/`;
let CITIES = {};
let CTABLE = {};

export const initCompanies = async () => {
    const companiesTemp = await getTemplate( 'companies' );
    const headers = await getHeaders();
    if( companiesTemp !== false ) {
        container.innerHTML = companiesTemp;
    }
    disableSubmit();
    addEventNew();
    await getCities();
    initSelForm();
    saveUserBtn();
    setTable( headers );
};

const addEventNew = () => {
    const button = DOCUMENT.getElementById( 'addCompany' );
    button.onclick = () => { addCompany() };
};

const addCompany = () => {
    const elems = document.querySelector( '.modal' );
    M.Modal.init( elems );
};

const initSelForm = () => {
    let elems = document.querySelector( 'select' );
    let instances = M.FormSelect.init(elems);
};

const saveUserBtn = () => {
    const form = DOCUMENT.getElementById( 'companyForm' );
    const btnSave = DOCUMENT.getElementById( 'guardar' );
    btnSave.onclick = () => {
        const formData = new FormData( form );
        const data = {
            nombre : formData.get('nombre'),
            direccion : formData.get('direccion'),
            email : formData.get('email'),
            telefono : formData.get('telefono'),
            city : formData.get('ciudad')
        }
        saveCompany( data );
    };
};

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
    await new Tabulator("#companiesTable", {
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
            { title:"Nombre", field:"nombre", width:'15%', hozAlign:"center", editor:"input" },
            { title:"Dirección", field:"direccion", width:'15%', hozAlign:"center", editor:"input" },
            { title:"Email", field:"email", width:'25%', hozAlign:"center", editor:"input" },
            { title:"Teléfono", field:"telefono", width:'10%', hozAlign:"center", editor:"input" },
            { title:"Ciudad", field:"city.nombre", width:'20%', hozAlign:"center", editor:"select",
                editorParams:{ values: { ...CTABLE } } },
            { title:"Acciones", hozAlign:"center", formatter: deleteBtn, headerSort:false, }
        ],
        rowSelectionChanged: expData,
        cellEdited: updateCompany,
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

const respData = ( url, params, response ) => {
    const resp = {
        last_page: response.data.last_page,
        data: response.data.companies
    }
    return resp;
};

const saveCompany = async( data ) => {
    const elem = document.querySelector( '.modal' );
    const modal = await M.Modal.getInstance( elem );
    const resp = await saveCompanySer( data );
    message( resp, '¡Éxito al guardar!', '¡Error al guardar!' );
    modal.close();
    initCompanies();
};

const deleteCompany = async ( id, cell ) => {
    const row = cell._cell.row;
    const resp = await deleteCompanySer( id );
    message ( resp, '¡Eliminado correctamente!', '¡Error al eliminar!' );
    if( resp.ok ){
        await row.delete();
    }
};

const updateCompany = async ( cell ) => {
    const row = cell._cell.row;
    const data = row.data;
    const id = data.id;
    const newVal = cell._cell.value;
    if ( newVal in CITIES ) {
        data.city.id = CITIES[newVal];
        data.city.nombre = newVal;
    }
    const  resp = await updateCompanySer( data, id );
    message( resp, '¡Éxito al actualizar!', '¡Error al actualizar!' );
};

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

const getCities = async () => {
    const cities = await getCitiesSer();
    setCities( cities );
};

const setCities = ( cities ) => {
    let elems = DOCUMENT.querySelector( 'select' );
    cities.data.forEach( city => {
       let option = DOCUMENT.createElement( 'option' );
       option.value = city.id;
       option.innerText = city.nombre;
       elems.appendChild( option );
       Object.assign( CTABLE, { [city.nombre]: city.nombre } );
       Object.assign( CITIES, { [city.nombre]: city.id } );
    } );
};