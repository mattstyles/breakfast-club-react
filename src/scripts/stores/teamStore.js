
var EventEmitter = require( 'events' ).EventEmitter;
var constants = require( '../constants/actions.js' );
var router = require( '../routers/router.jsx' );


/**
 * Export the store
 */
class TeamStore extends EventEmitter {
    constructor() {
        router.register( this.onDispatch.bind( this ) );
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
        setTimeout( function() {
            this.emit( constants.CHANGE_EVENT, {
                foo: 'foo',
                member: id
            });
        }.bind( this ), 1000 );
    }



}


module.exports = new TeamStore();
