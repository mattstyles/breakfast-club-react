
var React = require( 'react' );

var TextInput = require( './textInput.jsx' );
var router = require( '../routers/router.jsx' );

module.exports = React.createClass({

    componentWillMount: function() {
        window.addEventListener( 'resize', this.onResize );
    },

    componentDidMount: function() {
        this.onResize( null );

        router.register( function( payload ) {
            if ( payload.action !== 'getMembers' ) {
                return;
            }

            if ( !payload.value.length ) {
                return;
            }

            console.log( 'I heard that' );
        });
    },

    componentDidUnmount: function() {
        window.removeEventListener( 'resize', this.onResize );
    },

    getInitialState: function() {
        return {
            height: 0
        };
    },

    onResize: function( event ) {
        this.setState({
            height: window.innerHeight
        });
    },

    onSubmit: function( value ) {
        router.dispatch({
            action: 'getMembers',
            value: value
        });
    },

    render: function() {
        var style = {
            height: this.state.height
        };

        var inputStyle = {
            top: this.state.height / 2 - 60
        };

        return (
            <div className="cover" style={ style }>
                <div className="input" style={ inputStyle }>
                    <TextInput
                        onSave={ this.onSubmit }
                        placeholder="Enter bitbucket team name"
                    />
                    <button onClick={ this.onSubmit }>Find</button>
                </div>
            </div>
        );
    }

});
