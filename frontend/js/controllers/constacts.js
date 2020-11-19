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

// Cell formatters 

const acctionsBtns = ( cell, formatterParams, onRendered ) => {
    const id = cell._cell.row.data.id;
    const updateBtn = DOCUMENT.createElement('button');
        updateBtn.id = id;
        updateBtn.classList.add( 'waves-effect', 'waves-light', 'btn-small', 'blue', 'accent-4' );
        updateBtn.innerHTML = '<i class="material-icons">edit</i>';
        updateBtn.onclick = () =>  { updateCotact( id, cell ) };
    const deleteBtn = DOCUMENT.createElement('button');
        deleteBtn.id = id;
        deleteBtn.classList.add( 'waves-effect', 'waves-light', 'btn-small', 'red', 'accent-4', 'ml-1' );
        deleteBtn.innerHTML = '<i class="material-icons">delete_forever</i>';
        deleteBtn.onclick = () =>  { deleteContact( id, cell ) };
    onRendered( function () {
        cell._cell.element.append( updateBtn, deleteBtn );
    });
};

const contactFormatter = ( cell, formatterParams, onRendered ) => {
    const data = cell._cell.row.data;
    const divCont = DOCUMENT.createElement( 'div' );
        divCont.classList.add( 'left-align' );
    const span = DOCUMENT.createElement( 'span' );
        span.innerText = `${data.nombre} ${data.apellido}`;
    const psmall = DOCUMENT.createElement( 'span' );
        psmall.innerHTML = `<br/><small style="color: #616161"> ${data.email} </small>`;
        divCont.append( span, psmall );
    onRendered( () => {
        cell._cell.element.appendChild( divCont );
    } );
};

const countryFormatter = ( cell, formatterParams, onRendered ) => {
    const data = cell._cell.row.data;
    const divCont = DOCUMENT.createElement( 'div' );
        divCont.classList.add( 'left-align' );
    const span = DOCUMENT.createElement( 'span' );
        span.innerText = `${data.country.nombre}`;
    const psmall = DOCUMENT.createElement( 'span' );
        psmall.innerHTML = `<br/><small style="color: #616161">${data.region.nombre} </small>`;
        divCont.append( span, psmall );
    onRendered( () => {
        cell._cell.element.appendChild( divCont );
    } );
};

const progressFormat = ( cell, params, onRendered ) => {
    const data = cell._cell.row.data;
    let bgColor = '#03a9f4';
    if( data.interes > '25%' && data.interes <= '50%' ) { bgColor = '#ffd600' }
    if( data.interes > '50%' && data.interes <= '99%' ) { bgColor = '#ff6f00' }
    if( data.interes === '100%' ) { bgColor = '#ff0000' }
    const temp = `<div class="tabulator-col-resize-handle"></div>
                <div class="tabulator-col-resize-handle prev"></div>
                <div data-max="100" data-min="0" style="width: ${data.interes}; 
                 background-color: ${ bgColor };" class="interes-bar">
                    <p class="interes-bar-text"><small>${data.interes}</small></p>
                </div>`;
    onRendered( () => cell._cell.element.innerHTML = temp );
};

const canalesFormat = ( cell, params, onRendered ) => {
    const canales = cell._cell.row.data.canales;
    const divCont = DOCUMENT.createElement( 'div' );
    canales.forEach( canal => {
        const badge = DOCUMENT.createElement( 'span' );
            badge.classList.add( 'new', 'badge', 'bg-badge' );
            badge.setAttribute( 'data-badge-caption', canal.nombre );
            divCont.appendChild( badge );
    } );
    onRendered( () => cell._cell.element.append( divCont ) );
};

// Table configurations

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
            { formatter:"rowSelection", titleFormatter:"rowSelection", headerSort:false,
                cellClick:function(e, cell){
                    cell.getRow().toggleSelect();
            } },
            { title:"Contacto", field:"nombre", formatter: contactFormatter },
            { title:"País/Región", field:"country.nombre", formatter: countryFormatter },
            { title:"Compañia", field:"company.nombre" },
            { title:"Cargo", field:"cargo" },
            { title:"Canal preferido", formatter: canalesFormat },
            { title:"Interés", field:"interes", formatter: progressFormat },
            { title:"Acciones", hozAlign:"center", formatter: acctionsBtns, headerSort:false }
        ],
        rowSelectionChanged: expData,
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

const deleteContact = async ( id, cell ) => {
    const row = cell._cell.row;console.log('delete');
    // const resp = await deleteCompanySer( id );
    // message ( resp, '¡Eliminado correctamente!', '¡Error al eliminar!' );
    // if( resp.ok ){
    //     await row.delete();
    // }
};

const updateCotact = async ( id, cell ) => {
    const row = cell._cell.row;console.log('update')
    // const data = row.data;
    // const id = data.id;
    // const newVal = cell._cell.value;
    // if ( newVal in CITIES ) {
    //     data.city.id = CITIES[newVal];
    //     data.city.nombre = newVal;
    // }
    // const  resp = await updateCompanySer( data, id );
    // message( resp, '¡Éxito al actualizar!', '¡Error al actualizar!' );
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
