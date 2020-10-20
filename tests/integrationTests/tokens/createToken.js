'use strict';

require( 'dotenv' ).config();

const BitcoinApi = require( '../../..' );

const expect = require( 'chai' ).expect;

// const fixtures = require( '../fixtures' );


describe( '.createToken', function() {

    this.timeout( 20000 );

    it( 'normal operation', async function() {

        // const createTokenResults = await BitcoinApi.createToken({

        //     baseUrl: fixtures.baseUrl,
        // });

        const createTokenResults = await BitcoinApi.createToken();

        expect( typeof createTokenResults ).to.equal( 'object' );
        expect( typeof createTokenResults.token ).to.equal( 'string' );
    });
});