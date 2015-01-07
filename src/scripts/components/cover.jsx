
var React = require( 'react' );

module.exports = React.createClass({

    componentDidMount: function() {
        var main = document.getElementById( 'main' );
        main.classList.add( 'fit' );
    },

    render: function() {
        return (
            <div className="cover">
                <h1>Awesome Animals</h1>
            </div>
        );
    }
});
