const product = require('./product.route');
const auth = require('./auth.route');
const routes = (app) => {
    app.use('/api/auth', auth);
    app.use('/api/product', product);
};

module.exports = routes;
