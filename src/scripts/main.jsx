'use strict';

/**
 * Main entry point for app
 */

var React = require( 'react' );
var Cover = require( './components/cover.jsx' );

var Router = require( './routers/router.jsx' );

window.router = new Router( document.getElementById( 'main' ) );


var App = React.createClass({
    render: function() {
        return (
            <Cover />
        );
    }
});

// React.render(
//     <App />,
//     document.getElementById( 'main' )
// );

// React.render(
//     <Cover />,
//     document.getElementById( 'main' )
// );

// router
//     .attachRouter( document.getElementById( 'main' ) )
//     .startRouter()
//     .home();

window.director = require( 'director' );
window.assign = require( 'object-assign' );
