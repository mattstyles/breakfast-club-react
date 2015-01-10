'use strict';

/**
 * Main entry point for app
 */

var React = require( 'react' );
var store = require( './stores/teamStore' );

var Cover = require( './components/cover.jsx' );
var Home = require( './components/home.jsx' );

var router = require( './routers/router.jsx' );
var constants = require( './constants/actions' );

var App = React.createClass({

    getInitialState: function() {
        return {
            page: 'home'
        }
    },

    componentWillMount: function() {
        // router.register( this.onHashChange );
    },

    onHashChange: function( payload ) {
        if ( payload.action !== constants.HASH_CHANGE ) {
            return;
        }

        this.setState({
            page: payload.page
        });
    },

    render: function() {
        if ( this.state.page === 'home' ) {
            return (
                <Home />
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
