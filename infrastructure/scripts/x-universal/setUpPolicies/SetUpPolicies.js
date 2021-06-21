'use strict';

const AWS = require( 'aws-sdk' );

const yargs = require( 'yargs' );

const isProductionMode = (yargs.argv.mode === 'production');

if( isProductionMode ) {

    console.log( '☢︎🐑 is production mode' );

    require( 'dotenv' ).config({

        path: `${ __dirname }/productionCredentials/.env`
    });

    process.env.BITCOIN_API_ENV = 'production';
}
else {

    console.log( '🐲🐉 is staging mode' );

    require( 'dotenv' ).config({

        path: `${ __dirname }/stagingCredentials/.env`
    });

    process.env.BITCOIN_API_ENV = 'staging';
}

const {

    AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY,
    AWS_REGION,
    AWS_ACCOUNT_NUMBER,
    INSTANCE_PREFIX,

} = process.env;

AWS.config.update({

    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
    region: AWS_REGION,
});

const iam = new AWS.IAM();

const stageSuffix = isProductionMode ? '' : '_staging';

const getPolicyData = require( './getPolicyData' );

const policyData = getPolicyData({

    awsAccountNumber: AWS_ACCOUNT_NUMBER,
    awsRegion: AWS_REGION,
    stageSuffix,
    instancePrefix: INSTANCE_PREFIX
});


const createPolicy = Object.freeze( ({

    policy,
    name,

}) => {

    return new Promise( ( resolve, reject ) => {

        const awsPolicyName = `${ INSTANCE_PREFIX }${ name }${ stageSuffix }`;

        const params = {

            PolicyDocument: policy, /* required */
            PolicyName: awsPolicyName, 
        };

        console.log(
                
            'create policy with params: ' +
            JSON.stringify( params, null, 4 )
        );

        params.PolicyDocument = JSON.stringify( params.PolicyDocument );
        
        iam.createPolicy( params, ( err, data ) => {
        
            if( !!err ) {

                console.log( 'error in creating policy:', err );
                
                return reject( err );
            }

            console.log(
                
                'successfully created policy: ' +
                JSON.stringify({
                    awsPolicyName,
                    responseData: data
                }, null, 4 )
            );

            resolve( data );
        });
    });
});


(async () => {

    try {

        console.log( 'setting up policies' );

        for( const policyDatum of policyData ) {

            await createPolicy( policyDatum );
        }

        console.log( 'set up policies successfully executed' );
    }
    catch( err ) {

        console.log(
            'an error occurred in setting up policies:',
            err
        );
    }
})();
