'use strict';

var router = require( 'director' ).Router();
var bindall = require( 'lodash.bindall' );
var dispatcher = require( '../dispatchers/dispatcher' );

var constants = require( '../constants/actions' );

class Router  {
    constructor() {
        bindall( this );

        router.configure({
            notfound: this.home
        });

        router.on( '/', this.home );
        router.on( '/team/:teamID', this.team );

        router.init();

        // Make sure route is set
        if ( !window.location.hash.length ) {
            router.setRoute( '/' );
        }

        return this;
    }

    home() {
        dispatcher.dispatch({
            action: constants.HASH_CHANGE,
            page: 'home'
        });

        return this;
    }

    team( teamID ) {
        dispatcher.dispatch({
            action: constants.HASH_CHANGE,
            page: 'team',
            id: teamID
        });

        return this;
    }
}

module.exports = Router;
