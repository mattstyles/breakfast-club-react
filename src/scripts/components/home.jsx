
var React = require( 'react' );

var TextInput = require( './textInput.jsx' );
var Members = require( './members.jsx' );

var Router = require( '../routers/router.jsx' );
var dispatcher = require( '../dispatchers/dispatcher' );
var constants = require( '../constants/actions.js' );
var teamStore = require( '../stores/teamStore.js' );

module.exports = React.createClass({

    componentWillMount: function() {
        window.addEventListener( 'resize', this.onResize );

        dispatcher.register( function( payload ) {
            if ( payload.action === constants.HASH_CHANGE ) {
                if ( payload.page === 'home' ) {
                    this.onHome();
                }

                if ( payload.page === 'team' ) {
                    this.onTeam();
                }
            }
        }.bind( this ));

        // Creating Router
        new Router();
    },

    componentDidMount: function() {
        this.onResize( null );

        teamStore.on( constants.CHANGE_EVENT, this.onStoreChange );
    },

    componentDidUnmount: function() {
        window.removeEventListener( 'resize', this.onResize );
        teamStore.off( constants.CHANGE_EVENT, this.onStoreChange );
    },

    getInitialState: function() {
        return {
            height: 0,
            width: 0,
            value: '',
            selectVisible: false,
            showVisible: false,
            members: teamStore.get()
        };
    },

    onHome: function() {
        this.setState({
            selectVisible: true,
            showVisible: false,
            members: teamStore.get()
        });

        window.location.hash = '/';
    },

    onTeam: function() {
        this.setState({
            selectVisible: false,
            showVisible: true,
            members: teamStore.get()
        });
    },

    onResize: function( event ) {
        this.setState({
            height: window.innerHeight,
            width: window.innerWidth
        });
    },

    onSubmit: function( value ) {
        if ( !value.length ) {
            return;
        }

        window.location.hash = 'team/' + value;
    },

    onFind: function() {
        this.onSubmit( this.refs.TeamInput.getDOMNode().value );
    },

    onStoreChange: function( data ) {
        console.log( 'Store changed', data );

        this.setState({
            members: data.members,
            team: data.team
        });
    },

    render: function() {
        var style = {
            minHeight: this.state.height
        };

        var inputStyle = {
            top: this.state.height / 2 - 60
        };

        return (
            <div ref="cover" className="cover" style={ style }>

                <div ref="show" className={ this.state.showVisible ? 'members cover-transition' : 'hidden members cover-transition' }>
                    <button className="square reverse backBtn" onClick={ this.onHome }>
                        <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100.0 100.0">
                            <path d="M66.254 46.947L38.916 14.152c-1.13-1.36-3.154-1.543-4.512-.408-1.36 1.137-1.545 3.152-.412 4.512L59.622 49 33.99 79.742c-1.13 1.363-.947 3.38.412 4.514 1.357 1.135 3.38.95 4.512-.408l27.338-32.793C66.752 50.46 67 49.73 67 49c0-.73-.248-1.46-.746-2.053z"/>
                        </svg>
                    </button>
                    <Members
                        members={ this.state.members }
                        team={ this.state.team }
                        dimensions={
                            {
                                width: this.state.width,
                                height: this.state.height
                            }
                        }
                    />
                </div>

                <div ref="select" className={ this.state.selectVisible ? 'choose cover-block cover-transition' : 'hidden choose cover-block cover-transition' } style={ inputStyle }>
                    <TextInput
                        ref="TeamInput"
                        onSave={ this.onSubmit }
                        placeholder="Enter bitbucket team name"
                    />
                    <button className="findBtn" onClick={ this.onFind }>
                        Find
                        <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100.0 100.0">
                            <path d="M66.254 46.947L38.916 14.152c-1.13-1.36-3.154-1.543-4.512-.408-1.36 1.137-1.545 3.152-.412 4.512L59.622 49 33.99 79.742c-1.13 1.363-.947 3.38.412 4.514 1.357 1.135 3.38.95 4.512-.408l27.338-32.793C66.752 50.46 67 49.73 67 49c0-.73-.248-1.46-.746-2.053z"/>
                        </svg>
                    </button>
                    <p className="restriction">Actual implementation restricted</p>
                </div>

            </div>
        );
    }

});
