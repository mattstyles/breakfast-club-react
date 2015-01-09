
var React = require( 'react' );

module.exports = React.createClass({

    componentWillMount: function() {
        window.addEventListener( 'resize', this.onResize );
        this.onResize( null );
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

    render: function() {
        var style = {
            height: this.state.height
        };

        return (
            <div className="cover" style={ style }>
                
            </div>
        );
    }

});
