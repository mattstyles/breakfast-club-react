'use strict';

/**
 * Main entry point for app
 */

var React = require( 'react' );
var Cover = require( './components/cover.jsx' );

var App = React.createClass({
    render: function() {
        return (
            <Cover />
        );
    }
});

React.render(
    <App />,
    document.getElementById( 'main' )
);
