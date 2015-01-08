'use strict';

var React = require( 'react' );
var router = require( 'director' ).Router();
var bindall = require( 'lodash.bindall' );
var assign = require( 'object-assign' );

var Cover = require( '../components/cover.jsx' );

var Router = function( el ) {
    bindall( this );

    this.el = el;
    this.attach( el );
};

assign( Router.prototype, {

    attach: function( el ) {
        if ( !el ) {
            throw new Error( 'Router requires an element to attach to' );
        }

        router.configure({
            notfound: this.home
        });

        router.on( '/', this.home );
        router.on( '/user', this.user);

        router.init();

        return this;
    },

    home: function() {
        React.render(
            <Cover />,
            this.el
        );

        return this;
    },

    user: function() {
        var App = React.createClass({
            render: function() {
                return (
                    <h1>hello world</h1>
                );
            }
        });

        React.render(
            <App />,
            this.el
        );

        return this;
    }

});


module.exports = Router;
