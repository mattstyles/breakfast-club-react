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
        router.on( '/user', this.user );
        router.on( '/team/:teamID', this.team );

        router.init();

        return this;
    }

    setRoute( route ) {
        router.setRoute( route );
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

    team( teamID ) {
        // hack hack hack
        process.nextTick( function() {
            this.dispatch({
                action: constants.HASH_CHANGE,
                page: 'team',
                id: teamID
            });
        }.bind( this ));

        return this;
    }
}

module.exports = new Router();
