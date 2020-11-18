const storage = window.localStorage;

export function existData( key ) {
    if ( storage.getItem( key ) )
        return true;
    return false;
}

export function save( object ) {
    storage.setItem( object.key, JSON.stringify(object.data) );
}

export function getData( key ) {
    return storage.getItem( key );
}

export function deleteData( key ) {
    storage.removeItem( key );
}