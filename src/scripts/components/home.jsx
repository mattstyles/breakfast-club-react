
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
                <div className="cover-block" style={ inputStyle }>
                    <TextInput
                        onSave={ this.onSubmit }
                        placeholder="Enter bitbucket team name"
                    />
                    <button onClick={ this.onSubmit }>
                        Find
                        <span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100.0 100.0">
                            <path d="M66.254 46.947L38.916 14.152c-1.13-1.36-3.154-1.543-4.512-.408-1.36 1.137-1.545 3.152-.412 4.512L59.622 49 33.99 79.742c-1.13 1.363-.947 3.38.412 4.514 1.357 1.135 3.38.95 4.512-.408l27.338-32.793C66.752 50.46 67 49.73 67 49c0-.73-.248-1.46-.746-2.053z"/>
                        </svg>
                        </span>
                    </button>
                </div>
            </div>
        );
    }

});
