'use strict';

/**
 * Main entry point for app
 */

var React = require( 'react' );


var App = React.createClass({
    render: function() {
        return (
            <div className="app">
                <h2>Hello React</h2>
            </div>
        );
    }
});

React.render(
    <App />,
    document.getElementById( 'main' )
);
