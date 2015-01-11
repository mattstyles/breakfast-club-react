
var EventEmitter = require( 'events' ).EventEmitter;
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
        setTimeout( function() {
            this.emit( constants.CHANGE_EVENT, {
                foo: 'foo',
                team: id,
                members: [
                    {
                        foo: 'foo',
                        bar: 'baz'
                    },
                    {
                        foo: 'bar',
                        bar: 'quux'
                    }
                ]
            });
        }.bind( this ), 1000 );
    }

    get() {
        return _members;
    }



}


module.exports = new TeamStore();
