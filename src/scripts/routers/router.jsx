'use strict';

var React = require( 'react' );
var router = require( 'director' ).Router();
var bindall = require( 'lodash.bindall' );
var EventEmitter = require( 'eventemitter3' );
var assign = require( 'object-assign' );

var Cover = require( '../components/cover.jsx' );

var Router = function() {
    bindall( this );

    router.configure({
        notfound: this.home
    });

    router.on( '/', this.home );
    router.on( '/user', this.user);

    router.init();

    return this;
};

assign( Router.prototype, EventEmitter.prototype, {

    home: function() {
        this.emit( 'change:hash', {
            page: 'home'
        });

        return this;
    },

    user: function() {
        this.emit( 'change:hash', {
            page: 'user'
        });

        return this;
    }

});


module.exports = new Router();
