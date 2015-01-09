'use strict';

var router = require( 'director' ).Router();
var bindall = require( 'lodash.bindall' );
var Dispatcher = require( 'flux' ).Dispatcher;

var constants = require( '../constants/actions' );

class Router extends Dispatcher {
    constructor() {
        super();
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
