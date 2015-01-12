

var React = require( 'react' );

module.exports = React.createClass({

    _members: null,

    render: function() {
        setTimeout( this.renderNextMember, 500 );

        var members = '';

        if ( this.props.members ) {
            members = this.props.members.values.map( function( member ) {
                return (
                    <li className="memberlist-item">
                        <img src={ member.links.avatar.href } width="40" height="40" />
                        <h2>{ member.display_name }</h2>
                    </li>
                );
            });
        }

        return (
            <div>
                <h1>{ this.props.team }</h1>
                <ul id="container" className="memberList" ref="grid">
                    { members }
                </ul>
            </div>
        );
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
