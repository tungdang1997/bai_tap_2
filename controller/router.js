const ProductRouting = require('./handleRouter/handleProduct')

const handler = {
    'home' : ProductRouting.showHome,
    'create' : ProductRouting.showFormCreate,
    'edit' : ProductRouting.showFormEdit,
    'delete' : ProductRouting.showFormDelete,
}

module.exports = handler;