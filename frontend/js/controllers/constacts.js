import { DOCUMENT, APP, URL_API, getTemplate, disableSubmit } from '../dev.const.js';
import { getHeaders, getCitiesSer, getRegionsSer, getCountriesSer, getCompaniesSer,
    saveContactSer,
    updateContactSer,
    deleteContactSer,
    autoComSer,
    searchSer,
    getImageSer,
    saveImageSer } from './services.js';

const container = APP;
const URL_COM = `${URL_API}contacts/`;
let companies = {}, regions = {}, countries = {}, cities = {}, allCountries = {}, allCities = {}; 
let CANALES = 1;
let dialog;

export const initContacts = async () => {
    const companiesTemp = await getTemplate( 'contacts' );
    const headers = await getHeaders();
    if( companiesTemp !== false ) {
        container.innerHTML = companiesTemp;
    }
    disableSubmit();
    addEventNew();
    await getInfoSels();
    initSelsForm();
    slider();
    createchanel( CANALES );
    saveNewBtn( false );
    initAutoCom();
    searchBtn();
    setTable( headers );
    reset();
};

const addEventNew = () => {
    const button = DOCUMENT.getElementById( 'addContact' );
    button.onclick = () => { addCompany() };
    M.Tooltip.init( button ,{ margin: 0 } );
};

const addCompany = () => {
    const elems = document.querySelector( '.modal' );
    dialog = M.Modal.init( elems );
};

const getInfoSels = async () => {
    const [ com, reg, count, cit ] = [ await getCompaniesSer(),
                                        await getRegionsSer(),
                                        await getCountriesSer(),
                                        await getCitiesSer() ];
    initDic( com, companies, 'company' );
    initDic( reg, regions, 'region' );
    initDic( count, allCountries );
    initDic( cit, allCities );
    initDicChild( count, countries, 'region', 'country' );
    initDicChild( cit, cities, 'country', 'city' );
};

const initDic = ( data, dic, sel ) => {
    data.data.forEach( item => {
        if( !( item.id in dic ) ) {
            dic[item.id] = item.nombre;
        }
    } );
    if( sel ){
        setOptions( dic, sel );
    }
};

const initDicChild = ( data, dic, parent, sel ) => {
    data.data.forEach( item => {
        if( !( item[parent]._id in dic ) ) {
            dic[item[parent]._id] = {};
        }
        if( !( item.id in dic[item[parent]._id] ) ) {
            dic[item[parent]._id][item.id] = item.nombre;
        }
    } );
    if( sel === 'country' ) {
        const parent = DOCUMENT.getElementById( sel );
        parent.onchange = () => { selOptions( parent.value, 'city', cities )};
    }
};

const setOptions = ( dic, sel ) => {
    const select = DOCUMENT.getElementById( sel );
    for( let item in dic ) {
        let option = DOCUMENT.createElement( 'option' );
        option.value = item;
        option.innerText = dic[item];
        select.appendChild( option );
    }
    if( sel === 'region' ) {
        select.onchange = () => { selOptions( select.value, 'country', countries ) };
    };
};

const selOptions = ( parentId, sel, dic ) => {
    const select = DOCUMENT.getElementById( sel );
    select.innerHTML = sel === 'country' ? `<option value="" disabled selected> Seleccior País</option>` 
                                : `<option value="" disabled selected> Seleccior Ciudad</option>`;
    let options;
    if( parentId in dic ) {
        options = dic[ parentId ];
    }
    for( let op in options ) {
        const option = DOCUMENT.createElement( 'option' );
        option.value = op;
        option.innerText = options[ op ];
        select.appendChild( option );
    }
    select.disabled = false;
    initSelsForm();
};

const initSelsForm = () => {
    let elems = document.querySelectorAll( 'select' );
    let instances = M.FormSelect.init(elems);
};

const slider = () => {
    const slide = DOCUMENT.querySelector( 'input#interes' );
    const output = DOCUMENT.querySelector( 'output' );
    slide.addEventListener( 'input', ()=> {
        output.innerText = `${slide.value}%`;
    } );
};

const saveNewBtn = ( update, id ) => {
    const savebtn = DOCUMENT.getElementById( 'guardar' );
        savebtn.onclick = () => { saveContact( update, id ); };
};

// chanels Operations 

const createchanel = ( id ) => {
    const form = DOCUMENT.getElementById('contactForm');
    const row = DOCUMENT.createElement( 'div' );
        row.classList.add( 'row', 'chanel' );
    const canal = canalSel( id );
    const cuenta = acountIn( id );
    const preferencia = prefSel( id );
    if( id < 6 ) {
        const addC = addCanal( id );
        row.append( canal, cuenta, preferencia, addC );
    } else {
        row.append( canal, cuenta, preferencia );
    }
        form.append( row );
    M.FormSelect.init( canal.childNodes[0] );
    M.FormSelect.init( preferencia.childNodes[0] );
};

const canalSel = ( id ) => {
    const selDiv = DOCUMENT.createElement( 'div' );
        selDiv.classList.add( 'col', 'm2', 'input-field' );
    const canal = DOCUMENT.createElement( 'select' );
        canal.name = 'canal' + id;
        canal.id = 'canal'+id;
        canal.classList.add( )
    const options = `<option value="" disabled selected>Seleccionar Canal</option>
                    <option value="Facebook"> Facebook </option>
                    <option value="Instagram"> Instagram </option>
                    <option value="Twitter"> Twitter </option>
                    <option value="LinkedIn"> LinkedIn </option>
                    <option value="Email"> Email </option>
                    <option value="Telefono"> Teléfono</option>`;
    const label = DOCUMENT.createElement( 'label' );
        label.setAttribute( 'for', 'canal'+id );
        label.innerText = 'Canal de Contacto';
        canal.innerHTML = options;
        selDiv.append( canal, label );
    return selDiv;
};

const acountIn = ( id ) => {
    const container = DOCUMENT.createElement( 'div' );
        container.classList.add( 'col', 'm2', 'input-field' );
        container.innerHTML = `<input name="cuenta${id}" id="cuenta${id}" type="text" class="validate" placeholder="@cuenta">
                                <label for="cuenta${id}">Cuenta de Usuario</label>`;
    return container;
};

const prefSel = ( id ) => {
    const selDiv = DOCUMENT.createElement( 'div' );
        selDiv.classList.add( 'col', 'm2', 'input-field' );
    const canal = DOCUMENT.createElement( 'select' );
        canal.name = 'preferencia' + id;
        canal.id = 'preferencia'+id;
        canal.classList.add( )
    const options = `<option value="" disabled selected>Preferencias</option>
                    <option value="Sin Preferencia"> Sin Preferencia </option>
                    <option value="Canal Favorito"> Canal Favorito </option>
                    <option value="No Molestar"> No Molestar </option>`;
    const label = DOCUMENT.createElement( 'label' );
        label.setAttribute( 'for', 'preferencia'+id );
        label.innerText = 'Preferencias';
        canal.innerHTML = options;
        selDiv.append( canal, label );
return selDiv;
};

const addCanal = ( id ) => {
    const container = DOCUMENT.createElement( 'div' );
        container.classList.add( 'col', 'm2' );
    const button = DOCUMENT.createElement( 'button' );
        button.classList.add( 'waves-effect', 'waves-light', 'btn', 'blue', 'accent-3' );
        button.innerHTML = '<i class="material-icons left">add</i>Agregar canal';
        button.id = id;
        button.style.marginTop = '11%';
        button.onclick = () => { createchanel( id + 1 ); button.remove(); };
        container.appendChild( button );
    return container;
};

// Cell formatters 

const acctionsBtns = ( cell, formatterParams, onRendered ) => {
    const id = cell._cell.row.data.id;
    const updateBtn = DOCUMENT.createElement('button');
        updateBtn.id = id;
        updateBtn.classList.add( 'waves-effect', 'waves-light', 'btn-small', 'blue', 'accent-4', 'tooltipped' );
        updateBtn.innerHTML = '<i class="material-icons">edit</i>';
        updateBtn.onclick = () =>  { updateCotact( id, cell ) };
        updateBtn.setAttribute( 'data-position', 'top' );
        updateBtn.setAttribute( 'data-tooltip', `Editar ${cell._cell.row.data.nombre}` );
        M.Tooltip.init( updateBtn ,{ margin: 0 } );
        
    const deleteBtn = DOCUMENT.createElement('button');
        deleteBtn.id = id;
        deleteBtn.classList.add( 'waves-effect', 'waves-light', 'btn-small', 'red', 'accent-4', 'ml-1', 'tooltipped' );
        deleteBtn.innerHTML = '<i class="material-icons">delete_forever</i>';
        deleteBtn.onclick = () =>  { deleteContact( id, cell ) };
        deleteBtn.setAttribute( 'data-position', 'top' );
        deleteBtn.setAttribute( 'data-tooltip', `Eliminar ${cell._cell.row.data.nombre}` );
        M.Tooltip.init( deleteBtn ,{ margin: 0 } );
    onRendered( function () {
        cell._cell.element.append( updateBtn, deleteBtn );
    });
};

const contactFormatter = ( cell, formatterParams, onRendered ) => {
    const data = cell._cell.row.data;
    const divCont = DOCUMENT.createElement( 'div' );
    divCont.classList.add( 'left-align' );
    const img = DOCUMENT.createElement( 'img' );
        img.src = data.image;
        img.classList.add( 'contact-img' );
    const span = DOCUMENT.createElement( 'span' );
        span.innerText = `${data.nombre} ${data.apellido}`;
    const psmall = DOCUMENT.createElement( 'span' );
        psmall.innerHTML = `<br/><small style="color: #616161"> ${data.email} </small>`;
        divCont.append( img, span, psmall );
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
        if( canal.preferencia === 'Canal Favorito' ){
            const badge = DOCUMENT.createElement( 'span' );
                badge.classList.add( 'new', 'badge', 'bg-badge' );
                badge.setAttribute( 'data-badge-caption', canal.nombre );
                divCont.appendChild( badge );
        }
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
        columns: [
            { formatter:"rowSelection", titleFormatter:"rowSelection", headerSort:false,
                cellClick:function(e, cell){
                    cell.getRow().toggleSelect();
            } },
            { title:"Contacto", field:"nombre", formatter: contactFormatter, width:"15%" },
            { title:"País/Región", field:"country.nombre", formatter: countryFormatter, width:"15%" },
            { title:"Compañia", field:"company.nombre", width:"15%" },
            { title:"Cargo", field:"cargo", width:"15%" },
            { title:"Canal preferido", formatter: canalesFormat, width:"20%" },
            { title:"Interés", field:"interes", formatter: progressFormat, width:"15%" },
            { title:"Acciones", hozAlign:"center", formatter: acctionsBtns, headerSort:false, width:"15%" }
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

const respData = async ( url, params, response ) => {
    const data = response.data.contacts;
    for( let row in data ) {
        let image;
        let name = data[row].image ? data[row].image : 'no-image.png';
        const blob = await getImageSer( name );
            image = URL.createObjectURL( blob );
        data[row].image = image;
    }
    const resp = {
        last_page: response.data.last_page,
        data
    }
    return resp;
};

const saveContact = async ( update, id ) => {
    const elem = DOCUMENT.getElementById( 'modalContact' );
    const modal = await M.Modal.getInstance( elem );
    const formT = DOCUMENT.getElementById( 'contactForm' );
    const form = new FormData( formT );
    const data = setData( form );
    let resp;
    if( update ) {
        resp = await updateContactSer( data, id );
    } else {
        resp =  await saveContactSer( data );
    }
    await message( resp, '¡Éxito al guardar!', '¡Error al guardar!' );
    modal.close();
    initContacts();
};

const deleteContact = async ( id, cell ) => {
    const resp = await deleteContactSer( id );
    await message ( resp, '¡Eliminado correctamente!', '¡Error al eliminar!' );
    if( resp.ok ){
        initContacts();
    }
};

const updateCotact = async ( id, cell ) => {
    const { canales, ...info } = cell._cell.row .data;
    const temp = DOCUMENT.querySelector( '.modal' );
    let modal = M.Modal.getInstance( temp );
    if( !modal ) {
        modal = M.Modal.init( temp );
    }
    modal.open();
    const file = DOCUMENT.querySelector( '.avatar-upload.col.m2.hide' )
        file.classList.remove( 'hide' );
        // file.setAttribute( 'info-id', id );
    setUpload( id, info.image );
    setUpdateCh( canales );
    setUpdateInfo( temp, info );
    

    /* para guardar  */
    saveNewBtn( true, id );
};

const setUpdateInfo = ( form, info ) => {
    const inputs = form.querySelectorAll( 'input' );
    const selects = form.querySelectorAll( 'select' );
    inputs.forEach( input => {
            if( input.id in info ){
                if ( input.type === 'range' ) {
                    const range = DOCUMENT.querySelector( 'output' );
                    range.innerText = info[input.id];
                }
                input.value = info[input.id].includes('%') ? info[input.id].slice(0,-1) : info[input.id];
                input.classList.add( 'valid' );
                const label = DOCUMENT.querySelector( `#${input.id} + label` );
                if( label ) { label.classList.add( 'active' ); }
            }
    });
    selects.forEach( sel => { 
            if( sel.id in info ) {
                if( sel.id === 'city' || sel.id === 'country' ){
                    if( sel.id === 'country' ) { selOptions( info['region']._id, 'country', countries ) }
                    if( sel.id === 'city' ) { selOptions( info['country']._id, 'city', cities ) }
                }
                sel.value = info[sel.id]._id;
                sel.disabled = false;
                sel.M_FormSelect.wrapper.classList.remove('disabled');
                sel.M_FormSelect.input.disabled = false;
                sel.M_FormSelect.input.value = info[sel.id].nombre;
            }
    } );
};

const setUpdateCh = ( chanels ) => {
    const chanelsHTML = DOCUMENT.querySelectorAll( '.chanel' );
        chanelsHTML.forEach( chanel => chanel.remove() );
    if( chanels.length > 0 ) {
        for( let i = 0; i < chanels.length; i++ ) {
            createchanel( i + 1 );
            if( i + 1 < chanels.length ) {
                const button = DOCUMENT.getElementById( i + 1 );
                    button.remove();
            }
        }
    }
    setUpdateChData( chanels );
};

const setUpdateChData = ( chanels ) => {
    const chanelsHTML = DOCUMENT.querySelectorAll( '.chanel' );
    chanelsHTML.forEach( ( node, i ) => {
        const input = node.querySelector( 'input#cuenta'+ ( i + 1 ) );
        const selects = node.querySelectorAll( 'select' );

        input.value = chanels[i].cuenta;
        input.classList.add( 'valid' );
        const label = DOCUMENT.querySelector( `#${input.id} + label` );
        if( label ) { label.classList.add( 'active' ); }

        selects.forEach( sel => {
            if( sel.id.includes( 'canal' ) ) {
                sel.value = chanels[i].nombre;
                sel.M_FormSelect.input.value = chanels[i].nombre;
            } else {
                sel.value = chanels[i].preferencia;
                sel.M_FormSelect.input.value = chanels[i].preferencia;
            }
        } );
    } );
};

const setData = ( form ) => {
    const entries = form.entries();
    const chanels = setChanels( entries );
    const data = {
        nombre: form.get( 'nombre' ),
        apellido: form.get( 'apellido' ),
        cargo: form.get( 'cargo' ),
        email: form.get( 'email' ),
        company: form.get( 'company' ),
        region: form.get( 'region' ),
        country: form.get( 'country' ),
        city: form.get( 'city' ),
        direccion: form.get( 'direccion' ),
        interes: form.get( 'interes' ) + '%',
        canales: []
    }
    for( let id in chanels ) {
        data.canales.push( chanels[ id ] );
    }
    return data;
};

const setChanels = ( entries ) => {
    let chanels = {};
    for( let entry of entries ) {
        if( entry[0].includes('canal') || entry[0].includes('cuenta') || entry[0].includes('preferencia') ) {
            const id = entry[ 0 ].slice( -1 );
            let key = entry[ 0 ].slice( 0,  entry[ 0 ].length -1 );
            key = key === 'canal' ? 'nombre' : key;
            if( !( id in chanels ) ){
                chanels[ id ] = {};
                chanels[ id ][ key ] = entry[ 1 ];
            }
            chanels[ id ][ key ] = entry[ 1 ];
        }
    }
    return chanels;
};

const initAutoCom = () => {
    let input = DOCUMENT.getElementById( 'search' );
        input.onkeyup = (e) => {
            if( e. keycode === 13 || e.which === 13 ) {
                buscar( input.value );
            } else {
                // autoComplete( input.value, input );
            }
        }
}

const searchBtn = () => {
    let btn = DOCUMENT.getElementById( 'searchI' );
        btn.onclick = () => { buscar( DOCUMENT.getElementById( 'search' ).value ); };
};

const buscar = async ( value ) => {
    if( !value ) {
        Swal.fire( 'Advertencia', `Es necesario ingresar un valor`, 'info' );
        return;
    }
    value = searchIsID( value, regions );
    value = searchIsID( value, allCountries );
    value = searchIsID( value, allCities );
    value = searchIsID( value, companies );
    const resp = await searchSer( value );
    if( resp.ok ) {
        if( resp.data.length > 0 ){
            initTableSearch( resp.data );
        } else {
            Swal.fire( 'Advertencia', `Sin resultado al buscar: ${value}`, 'info' );
        }
    }
};

const searchIsID = ( value, dic  ) => {
    let text = value.toUpperCase();
    for(let id in dic ){
        const reg = dic[ id ].toUpperCase();
        if( text === reg ){
            value = id + '-ID';
            return value;
        }
    }
    return value;
};

const autoComplete = async ( text, input ) => {
    let list = [], info = [];
    const response = await autoComSer( text );
    if( response.ok ) {
        list = response.data;
        list.forEach( ( item, i ) => {
            // const name = i === ? 
            if( item.length > 0 ) {
                info.push( item );
            }
        })
        // nombre, apellido, email, cargo, interes, company, canales, city, country, region
    }
};

const initTableSearch = ( data ) => {
    // console.log(data);
    const table = DOCUMENT.getElementById( 'contactsTable' );
        table.innerHTML = '';
    new Tabulator("#contactsTable", {
        pagination: 'local',
        paginationSizeSelector: [ 5, 10, 15 ],
        paginationSize: 5,
        data,
        columns: [
            { formatter:"rowSelection", titleFormatter:"rowSelection", headerSort:false,
                cellClick:function(e, cell){
                    cell.getRow().toggleSelect();
            } },
            { title:"Contacto", field:"nombre", formatter: contactFormatter, width:"15%" },
            { title:"País/Región", field:"country.nombre", formatter: countryFormatter, width:"15%" },
            { title:"Compañia", field:"company.nombre", width:"15%" },
            { title:"Cargo", field:"cargo", width:"15%" },
            { title:"Canal preferido", formatter: canalesFormat, width:"20%" },
            { title:"Interés", field:"interes", formatter: progressFormat, width:"15%" },
            { title:"Acciones", hozAlign:"center", formatter: acctionsBtns, headerSort:false, width:"15%" }
        ],
        rowSelectionChanged: expData,
    });
};

const reset = () => {
    const resetBtn = DOCUMENT.getElementById( 'resetBtn' );
        resetBtn.onclick = () => { initContacts() };
};

const setUpload =  async ( id, image  ) => {
    const file = DOCUMENT.querySelector( '#imageUpload' );
    const preview = DOCUMENT.getElementById( 'imagePreview' );
        preview.style.backgroundImage  = `url(${ image })`;
    file.onchange = async ( e ) => {
        const form = new FormData();
            form.append( 'image', file.files[0] );
        const resp = await saveImageSer( form, id );
    };
};

const expData = ( userList ) => {
    // document.getElementById("select-stats").innerHTML = data.length;
    if( userList.length > 0 ){
        console.log ( userList );
    }
}

const message = async ( data, msgok, msgbad ) => {
    if( data.ok ) {
        if( data.data.nombre ){
            await Swal.fire( 'Exito', `${msgok} ${data.data.nombre}`, 'success' );
        } else {
            await Swal.fire( 'Exito', msgok, 'success' );
        }
    } else {
        console.error( data );
        await Swal.fire( 'Error', msgbad , 'error' );
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
