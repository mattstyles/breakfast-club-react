'use strict';

/**
 * Main entry point for app
 */

var React = require( 'react' );
var Cover = require( './components/cover.jsx' );

var router = require( './routers/router.jsx' );

var App = React.createClass({

    getInitialState: function() {
        return {
            page: 'home'
        }
    },

    componentDidMount: function() {
        router.on( 'change:hash', this.update );
    },

    update: function( data ) {
        this.setState({
            page: data.page
        });
    },

    render: function() {
        if ( this.state.page === 'home' ) {
            return (
                <Cover />
            );
        }

        if ( this.state.page === 'user' ) {
            return (
                <h1>Hello user</h1>
            )
        }

        return (
            <h1>Default</h1>
        )
    }
});

React.render(
    <App />,
    document.getElementById( 'main' )
);
