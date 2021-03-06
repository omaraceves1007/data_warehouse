import {
    DOCUMENT,
    APP,
    getTemplate,
    disableSubmit
} from '../dev.const.js';
import {
    getHeaders,
    getRegionsSer,
    saveRegionSer,
    updateRegionSer,
    deleteRegionSer,
    getCountriesSer,
    saveCountrySer,
    updateCountrySer,
    deleteCountrySer,
    getCitiesSer,
    saveCitySer,
    updateCitySer,
    deleteCitySer,
} from './services.js';

const container = APP;
let regionsDic, countriesDic, citiesDic, treeList, tree;

export const initRegions = async () => {
    regionsDic = {};
    countriesDic = {};
    citiesDic = {};
    treeList = [];
    tree = null;
    const companiesTemp = await getTemplate('region-city');
    const headers = await getHeaders();
    if (companiesTemp !== false) {
        container.innerHTML = companiesTemp;
    }
    disableSubmit();
    await getInfo();
    addEventNew('modal1', 'addRegion');
    addEventNew('modal2', 'addCountry');
    addEventNew('modal3', 'addCity');
    await getRegions();
    initSelForm();
    saveBtn('regionForm', 'guardarR');
    saveBtn('countryForm', 'guardarCo');
    saveBtn('cityForm', 'guardarCi');
};

const getInfo = async () => {
    const regionsFetch = await getRegionsSer();
    const countriesFetch = await getCountriesSer();
    const citiesFetch = await getCitiesSer();
    const regions = regionsFetch.data;
    const countries = countriesFetch.data;
    const cities = citiesFetch.data;
    setDicData(citiesDic, cities, 'country', 3);
    setDicData(countriesDic, countries, 'region', 2);
    setDicData(regionsDic, regions, false, 1);
    setTreeList();
    iniTree(treeList);
};

const setDicData = (dic, data, parent, type) => {
    data.forEach(el => {
        if (!(el.id in dic)) {
            dic[el.id] = {
                parent: parent ? {
                    name: parent,
                    id: el[parent]._id
                } : false,
                name: el.nombre,
                id: el.id,
                children: [],
                expanded: true,
                type
            };
        }
    });
};

const setTreeList = () => {
    insertChildren(citiesDic, countriesDic);
    insertChildren(countriesDic, regionsDic);
    for (let region in regionsDic) {
        treeList.push(regionsDic[region]);
    }
};

const insertChildren = (children, parent) => {
    for (const city in children) {
        const parentId = children[city].parent.id;
        if (parentId in parent) {
            parent[parentId].children.push(children[city]);
        }
    }
};
const iniTree = (list) => {
    tree = new TreeView(list, 'tree');
    tree.on('select', (e) => {
        Swal.fire({
            icon: 'info',
            title: 'Acciones del Nodo',
            text: 'Selecciona una acción para ' + e.data.name,
            focusConfirm: false,
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Editar',
            denyButtonText: 'Eliminar',
            reverseButtons: true,
        }).then(result => actions(result, e));
    });
};

const addEventNew = (modal, btn) => {
    const button = DOCUMENT.getElementById(btn);
    button.onclick = () => {
        addItem(modal)
    };
};

const addItem = (modal) => {
    const elems = document.getElementById(modal);
    M.Modal.init(elems);
};

const saveBtn = (form, btn) => {
    const formC = DOCUMENT.getElementById(form);
    const btnSave = DOCUMENT.getElementById(btn);

    btnSave.onclick = () => {
        let data = {};
        const formData = new FormData(formC);
        if (formData.get('nombre')) {
            data = {
                nombre: formData.get('nombre')
            };
            saveData(data, '#modal1', saveRegionSer);
        } else if (formData.get('country')) {
            data = {
                nombre: formData.get('country'),
                region: formData.get('regionId')
            };
            saveData(data, '#modal2', saveCountrySer);
        } else {
            data = {
                nombre: formData.get('city'),
                region: countriesDic[formData.get('countryId')].parent.id,
                country: formData.get('countryId')
            };
            saveData(data, '#modal3', saveCitySer);
        }
    };
};

const getRegions = async () => {
    setOptions('select#regionId', regionsDic);
    setOptions('select#countryId', countriesDic);
};

const setOptions = (select, cat) => {
    let elems = DOCUMENT.querySelector(select);
    for (let item in cat) {
        let option = DOCUMENT.createElement('option');
        option.value = cat[item].id;
        option.innerText = cat[item].name;
        elems.appendChild(option);
    }
};

const initSelForm = () => {
    let elems = document.querySelectorAll('select');
    elems.forEach(el => M.FormSelect.init(el));
};

const saveData = async (data, clasM, service) => {
    const elem = document.querySelector(clasM);
    const modal = await M.Modal.getInstance(elem);
    const resp = await service(data);
    modal.close();
    await message(resp, '¡Éxito al guardar!', '¡Error al guardar!');
    initRegions();
};

const message = async (data, msgok, msgbad) => {
    if (data.ok) {
        if (data.data.nombre) {
            await Swal.fire('Exito', `${msgok} ${data.data.nombre}`, 'success');
        } else {
            await Swal.fire('Exito', msgok, 'success');
        }
    } else {
        console.error(data);
        await Swal.fire('Error', msgbad, 'error');
    }
}

const actions = async (value, e) => {
    const type = e.data.type;
    const id = e.data.id;
    if (value.isConfirmed) {
        if (type === 1) {
            updateDialog( id, type, e.data );
        } else if (type === 2) {
            updateDialog( id, type, e.data );
        } else {
            updateDialog( id, type, e.data );
        }
    }
    if (value.isDenied) {
        const del = type === 1 ? deleteRegionSer : type === 2 ? deleteCountrySer : deleteCitySer;
        const resp = await del(id);
        await message(resp, '¡Eliminado correctamente!', '¡Error al eliminar!');
        initRegions();
    }
}

const updateDialog = async ( id, type, data ) => {
    const title = type === 1 ? 'Región' : type === 2 ? 'País' : 'Ciudad';
    const upd = type === 1 ? updateRegionSer : type === 2 ? updateCountrySer : updateCitySer;
    const form = type === 1 ? DOCUMENT.getElementById( 'regionForm' ) : type === 2 ? DOCUMENT.getElementById( 'countryForm' ) : DOCUMENT.getElementById( 'cityForm' );
    const formId = form.id;
    Swal.fire({
        title: 'Actualizar ' + data.name,
        html: form,
        focusConfirm: false,
        preConfirm: () => {
            const formV =  new FormData ( DOCUMENT.getElementById( formId ) );
            if ( formV.get( 'regionId' ) ) {
                return { nombre: formV.get('country'), region: formV.get( 'regionId' ) };
            } else if ( formV.get( 'countryId' ) ) {
                return { nombre: formV.get('city'), country: formV.get( 'countryId') , region: data.parent.id };
            }
            return { nombre: formV.get('nombre') };
        }
    }).then( res => {
        if( res.value ) {
            updateRegion( id, res.value, upd )
        }
    } );
}

const updateRegion = async ( id, data, service ) => {
    const resp = await service( data, id );
    await message( resp, '¡Actualizado!', '¡Error al Actualizar!' );
    initRegions();
};