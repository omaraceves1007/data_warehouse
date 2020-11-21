import { URL, CONTENT_TYPE, setAuth, getAuth } from '../dev.const.js';
import { existData, getData } from './storage.js';

const setAuthorization = () => {
    if( existData( 'token' ) ) {
        const token = JSON.parse( getData( 'token' ) );
        setAuth( `Bearer ${token}` );
    }
}

export const getHeaders = ( contact ) => {
    setAuthorization();
    const auth = getAuth();
    return {
        'Content-type': contact ? 'application/json' : CONTENT_TYPE['Content-type'],
        Authorization: auth.Authorization
    }
}

// User Services
export const getUsers = async ( skip = 0, limit = 5, sort = '_id', way = 1 ) => {
    const options = {
        headers: getHeaders()
    };
    try{
        const resp = await fetch( `${URL}users/?skip=${skip}&limit=${limit}&sort=${sort}&way=${way}`, options );
        const info = await resp.json();
        if( info.ok ){
            return info.data;
        }
        return false;
    } catch ( err ) {
        console.error( err );
        return false;
    }
};

export const saveUserSer = async ( user ) => {
    const body = setURLParams( user );
    const options = setOptions( body, 'POST' );
    try{
        const new_user = await fetch( `${URL}users`, options );
        const message = await new_user.json();
        return message;
    } catch( error ) { console.error( error ) }
};

export const updateUserSer = async ( user, id )  => {
    const body = setURLParams( user );
    const options = setOptions( body, 'PUT' );
    try{
        const updated_user = await fetch( `${ URL }users/${ id }`, options );
        const message = await updated_user.json();
        return message;
    } catch( error ) { console.error( error ) }
};

export const deleteUserSer = async ( id ) => {
    const options = setOptions( false, 'DELETE' );
    try {
        const deleted = await fetch( `${ URL }users/${ id }`, options );
        const message = await deleted.json();
        return message;
    } catch( error ) { console.error( error ) }
};

// Companies Services
export const getCompaniesSer = async () => {
    const options = setOptions( false, 'GET' );
    try {
        const resp = await fetch( `${ URL }companies`, options );
        const compnies = await resp.json();
        return compnies;
    } catch( error ) { console.error( error ) }
};

export const saveCompanySer = async ( company ) => {
    const body = setURLParams( company );
    const options = setOptions( body, 'POST' );
    try{
        const new_company = await fetch( `${URL}companies`, options );
        const message = await new_company.json();
        return message;
    } catch( error ) { console.error( error ) }
};

export const updateCompanySer = async ( company, id )  => {
    const body = setURLParams( company, true );
    const options = setOptions( body, 'PUT' );
    try{
        const updated_company = await fetch( `${ URL }companies/${ id }`, options );
        const message = await updated_company.json();
        return message;
    } catch( error ) { console.error( error ) }
};

export const deleteCompanySer = async ( id ) => {
    const options = setOptions( false, 'DELETE' );
    try {
        const deleted = await fetch( `${ URL }companies/${ id }`, options );
        const message = await deleted.json();
        return message;
    } catch( error ) { console.error( error ) }
};

// Regions Services

export const getRegionsSer = async () => {
    const options = setOptions( false, 'GET' );
    try {
        const resp = await fetch( `${ URL }regions`, options );
        const regions = await resp.json();
        return regions;
    } catch( error ) { console.error( error ) }
};

export const saveRegionSer = async ( region ) => {
    const body = setURLParams( region );
    const options = setOptions( body, 'POST' );
    try{
        const new_region = await fetch( `${URL}regions`, options );
        const message = await new_region.json();
        return message;
    } catch( error ) { console.error( error ) }
};

export const updateRegionSer = async ( region, id )  => {
    const body = setURLParams( region, true );
    const options = setOptions( body, 'PUT' );
    try{
        const updated_region = await fetch( `${ URL }regions/${ id }`, options );
        const message = await updated_region.json();
        return message;
    } catch( error ) { console.error( error ) }
};

export const deleteRegionSer = async ( id ) => {
    const options = setOptions( false, 'DELETE' );
    try {
        const deleted = await fetch( `${ URL }regions/${ id }`, options );
        const message = await deleted.json();
        return message;
    } catch( error ) { console.error( error ) }
};

// Countries Services

export const getCountriesSer = async () => {
    const options = setOptions( false, 'GET' );
    try {
        const resp = await fetch( `${ URL }countries`, options );
        const conuntries = await resp.json();
        return conuntries;
    } catch( error ) { console.error( error ) }
};

export const saveCountrySer = async ( region ) => {
    const body = setURLParams( region );
    const options = setOptions( body, 'POST' );
    try{
        const new_region = await fetch( `${URL}countries`, options );
        const message = await new_region.json();
        return message;
    } catch( error ) { console.error( error ) }
};

export const updateCountrySer = async ( country, id )  => {
    const body = setURLParams( country, true );
    const options = setOptions( body, 'PUT' );
    try{
        const updated_country = await fetch( `${ URL }countries/${ id }`, options );
        const message = await updated_country.json();
        return message;
    } catch( error ) { console.error( error ) }
};

export const deleteCountrySer = async ( id ) => {
    const options = setOptions( false, 'DELETE' );
    try {
        const deleted = await fetch( `${ URL }countries/${ id }`, options );
        const message = await deleted.json();
        return message;
    } catch( error ) { console.error( error ) }
};

// Citys Services

export const getCitiesSer = async () => {
    const options = setOptions( false, 'GET' );
    try {
        const resp = await fetch( `${ URL }cities`, options );
        const cities = await resp.json();
        return cities;
    } catch( error ) { console.error( error ) }
};

export const saveCitySer = async ( region ) => {
    const body = setURLParams( region );
    const options = setOptions( body, 'POST' );
    try{
        const new_region = await fetch( `${URL}cities`, options );
        const message = await new_region.json();
        return message;
    } catch( error ) { console.error( error ) }
};

export const updateCitySer = async ( city, id )  => {
    const body = setURLParams( city, true );
    const options = setOptions( body, 'PUT' );
    try{
        const updated_city = await fetch( `${ URL }cities/${ id }`, options );
        const message = await updated_city.json();
        return message;
    } catch( error ) { console.error( error ) }
};

export const deleteCitySer = async ( id ) => {
    const options = setOptions( false, 'DELETE' );
    try {
        const deleted = await fetch( `${ URL }cities/${ id }`, options );
        const message = await deleted.json();
        return message;
    } catch( error ) { console.error( error ) }
};

// Citys Services

export const getContactsSer = async () => {
    const options = setOptions( false, 'GET' );
    try {
        const resp = await fetch( `${ URL }contacts`, options );
        const contacts = await resp.json();
        return contacts;
    } catch( error ) { console.error( error ) }
};

export const saveContactSer = async ( contact ) => {
    const body = JSON.stringify(contact); //setURLParams( contact );
    const options = setOptions( body, 'POST', true );
    try{
        const new_contact = await fetch( `${URL}contacts`, options );
        const message = await new_contact.json();
        return message;
    } catch( error ) { console.error( error ) }
};

export const updateContactSer = async ( contact, id )  => {
    const body = JSON.stringify(contact);//setURLParams( contact, true );
    const options = setOptions( body, 'PUT',true );
    try{
        const updated_contact = await fetch( `${ URL }contacts/${ id }`, options );
        const message = await updated_contact.json();
        return message;
    } catch( error ) { console.error( error ) }
};

export const deleteContactSer = async ( id ) => {
    const options = setOptions( false, 'DELETE' );
    try {
        const deleted = await fetch( `${ URL }contacts/${ id }`, options );
        const message = await deleted.json();
        return message;
    } catch( error ) { console.error( error ) }
};


// config petitions
const setURLParams = ( data, update ) => {
    let info = new URLSearchParams();
    let keys = Object.keys( data );
    let values = Object.values( data );
    for ( let i = 0; i < keys.length; i++ ) {
        if( keys[i] === 'city' && update ){
            info.append( keys[i], values[i].id );    
        } else {
            info.append( keys[i], values[i] );
        }
    }
    return info;
};

const setOptions = ( body, method, contact ) => {
    if ( !body ) {
        return { headers: getHeaders(), method };
    }
    return { headers: getHeaders (contact ), method, body }
};