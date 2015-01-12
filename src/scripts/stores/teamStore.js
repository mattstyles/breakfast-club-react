
var EventEmitter = require( 'events' ).EventEmitter;
var request = require( 'superagent' );
var constants = require( '../constants/actions.js' );
var router = require( '../routers/router.jsx' );
var dispatcher = require( '../dispatchers/dispatcher' );


var _members = null;

/**
 * Export the store
 */
class TeamStore extends EventEmitter {
    constructor() {
        dispatcher.register( this.onDispatch.bind( this ) );
    }

    onDispatch( payload ) {
        if ( payload.action === constants.HASH_CHANGE ) {
            if ( payload.page !== 'team' ) {
                return;
            }

            this._getMembers( payload.id );
        }
    }

    _getMembers( id ) {
        request
            // .get( 'https://bitbucket.org/api/2.0/teams/' + id + '/members' )
            .get( 'dist/assets/bb_response.json' )
            .end( function( res ) {
                if ( !res.ok ) {
                    throw new Error( 'Error fulfilling request' );
                }

                this.emit( constants.CHANGE_EVENT, {
                    team: id,
                    members: JSON.parse( res.text )
                });
            }.bind( this ));
    }

    get() {
        return _members;
    }



}


module.exports = new TeamStore();
