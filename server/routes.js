/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');

module.exports = function(app) {

    // All undefined asset or api routes should return a 404
    app.route('/:url(api|auth|components|app|bower_components|client)/*')
        .get(errors[404]);

    // All other routes should redirect to the index.html
    app.route('/*').get(function(req, res) {
        res.sendFile(app.get('appPath') + '/index.html');
    });
};
