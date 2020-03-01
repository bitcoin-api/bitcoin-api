'use strict';

require( 'dotenv' ).config();

const BitcoinApi = require( '../../../' );

const expect = require( 'chai' ).expect;

const fixtures = require( '../fixtures' );


describe( '.getOrCreateAddress', function() {

    this.timeout( 20000 );

    it( 'normal operation', async function() {

        const bitcoinApi = BitcoinApi({

            testnetToken: fixtures.testnetToken,
        });

        const address = await bitcoinApi.getOrCreateAddress();

        if( !!address ) {

            expect( typeof address ).to.equal( 'string' );
        }
        else {

            expect( address ).to.equal( null );
        }
    });
});