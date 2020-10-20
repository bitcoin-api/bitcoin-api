'use strict';

require( 'dotenv' ).config();

const BitcoinApi = require( '../../..' );

const expect = require( 'chai' ).expect;

const fixtures = require( '../fixtures' );


describe( '.createOrGetAddress', function() {

    this.timeout( 20000 );

    it( 'normal operation', async function() {

        const bitcoinApi = new BitcoinApi({

            token: fixtures.token,
            baseUrl: fixtures.baseUrl
        });

        const addressData = await bitcoinApi.createOrGetAddress();

        expect( typeof addressData ).to.equal( 'object' );

        if( !!addressData.address ) {

            expect( typeof addressData.address ).to.equal( 'string' );
        }
        else {

            expect( addressData.address ).to.equal( null );
        }

        // expect( typeof addressData.timeOfExpiry ).to.equal( 'number' );
    });
});