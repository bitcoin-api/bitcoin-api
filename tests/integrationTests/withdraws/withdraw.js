'use strict';

require( 'dotenv' ).config();

const BitcoinApi = require( '../../..' );

const expect = require( 'chai' ).expect;

const fixtures = require( '../fixtures' );


describe( '.withdraw', function() {

    this.timeout( 20000 );

    it( 'normal operation', async function() {

        const bitcoinApi = new BitcoinApi({

            token: fixtures.token,
            baseUrl: fixtures.baseUrl
        });

        const withdrawResponse = await bitcoinApi.withdraw({

            amount: 0.0001,
            address: 'mgXi9VCAmwaEGszk5yhqkigptTVQM33uhx',
            includeFeeInAmount: true,
            // enviroWithdrawAmount: 0.00007
        });

        expect( withdrawResponse ).to.equal( undefined );
    });
});