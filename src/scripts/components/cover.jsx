
var React = require( 'react' );

var Columns = React.createClass({
    render: function() {
        return (
            <div className="cols">
                <div className="col">
                    <h2>One</h2>
                    <img src="http://placekitten.com/g/300/200" />
                </div>
                <div className="col">
                    <h2>Two</h2>
                    <img src="http://placekitten.com/g/400/200" />
                </div>
                <div className="col">
                    <h2>Three</h2>
                    <img src="http://placekitten.com/g/400/340" />
                </div>
            </div>
        )
    }
})

module.exports = React.createClass({

    componentDidMount: function() {
        var main = document.getElementById( 'main' );
        main.classList.add( 'fit' );
    },

    render: function() {
        return (
            <div className="cover">
                <h1>Awesome Animals</h1>
                <Columns />
            </div>
        );
    }
});
