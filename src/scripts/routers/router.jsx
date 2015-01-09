'use strict';

var React = require( 'react' );
var router = require( 'director' ).Router();
var bindall = require( 'lodash.bindall' );
var Dispatcher = require( 'flux' ).Dispatcher;

var constants = require( '../constants/routes' );


// var Router = function() {
//     Dispatcher.call( this );
//
//     bindall( this );
//
//     router.configure({
//         notfound: this.home
//     });
//
//     router.on( '/', this.home );
//     router.on( '/user', this.user);
//
//     router.init();
//
//     return this;
// };
//
// Object.assign( Router.prototype, Dispatcher.prototype, {
//
//     home: function() {
//         this.dispatch({
//             action: constants.HASH_CHANGE,
//             page: 'home'
//         });
//
//         return this;
//     },
//
//     user: function() {
//         this.dispatch({
//             action: constants.HASH_CHANGE,
//             page: 'user'
//         });
//
//         return this;
//     }
//
// });

class Router extends Dispatcher {
    constructor() {
        Dispatcher.call( this );

        bindall( this );

        router.configure({
            notfound: this.home
        });

        router.on( '/', this.home );
        router.on( '/user', this.user);

        router.init();

        return this;
    }

    home() {
        this.dispatch({
            action: constants.HASH_CHANGE,
            page: 'home'
        });

        return this;
    }

    user() {
        this.dispatch({
            action: constants.HASH_CHANGE,
            page: 'user'
        });

        return this;
    }
}


module.exports = new Router();
