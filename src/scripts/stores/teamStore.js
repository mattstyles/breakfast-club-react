
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
        console.log( 'getting members', id );
        request
            .get( 'https://bitbucket.org/api/2.0/teams/' + id + '/members' )
            .set('Content-Type', 'application/json; charset=utf-8')
            .withCredentials()
            .end( function( res ) {
                if ( !res.ok ) {
                    throw new Error( 'Error fulfilling request' );
                }

                console.log( res );

                this.emit( constants.CHANGE_EVENT, {
                    team: id,
                    members: res
                });
            }.bind( this ));


    }

    get() {
        return _members;
    }



}


module.exports = new TeamStore();
