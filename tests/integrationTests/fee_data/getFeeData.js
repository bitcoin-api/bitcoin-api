'use strict';

require( 'dotenv' ).config();

const BitcoinApi = require( '../../..' );

const expect = require( 'chai' ).expect;

const fixtures = require( '../fixtures' );


describe( '.getFeeData', function() {

    this.timeout( 20000 );

    it( 'normal operation', async function() {

        const bitcoinApi = new BitcoinApi({

            baseUrl: fixtures.baseUrl,
        });

        const feeData = await bitcoinApi.getFeeData();
        
        expect( typeof feeData ).to.equal( 'object' );
        expect( typeof feeData.fee ).to.equal( 'number' );
    });
});