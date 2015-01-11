

var React = require( 'react' );

module.exports = React.createClass({

    _members: null,

    render: function() {
        setTimeout( this.renderNextMember, 500 );

        var members = '';

        if ( this.props.members ) {
            members = this.props.members.map( function( member ) {
                return (
                    <h1>{ member.foo }</h1>
                );
            });
        }

        return (
            <div>
                <h1>{ this.props.team }</h1>
                <div id="container" className="memberList" ref="grid">
                    { members }
                </div>
            </div>
        )
    },

    renderNextMember: function() {


    },

    getContainerTop: function() {
        if ( !this.refs.container ) {
            return null;
        }

        return this.refs.container.getDOMNode().offsetTop;
    }

});
