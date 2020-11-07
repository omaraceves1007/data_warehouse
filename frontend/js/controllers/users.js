import { DOCUMENT, APP } from '../dev.const.js';
import { getUsers } from './services.js';

const container = APP;

export const initUsers = () => {
    container.innerHTML = 'USUARIOS';
    getUsers();
};