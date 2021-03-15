import Net from './net';

export default {
    getValidPermissions() {
        return Net.get('/permission/list/');
    },
};
