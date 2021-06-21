'use strict';

const {

    getFormattedEvent,
    getResponse,
    handleError,
    beginningDragonProtection,
    stringify,

} = require( '../../../../utils' );

const addNewUser = require( './addNewUser' );


exports.handler = Object.freeze( async rawEvent => {

    try {

        console.log( 'running the bastion /bastion-users - POST function' );

        const event = getFormattedEvent({

            rawEvent,
            // shouldGetBodyFromEvent: false,
        });

        const {
            
            ipAddress

        } = await beginningDragonProtection({

            queueName: 'bastionBastionUsersPost',
            
            event,

            megaCodeIsRequired: false,

            ipAddressMaxRate: 2,
            ipAddressTimeRange: 60000,
        });

        await addNewUser({

            event,
            ipAddress
        });

        const responseData = Object.assign(
            {},
            {
                userAddedSuccessfully: true
            }
        );

        console.log(
            
            'the exchange /exchange-users - ' +
            'POST function executed successfully: ' +
            stringify({ responseData })
        );

        return getResponse({

            body: responseData
        });
    }
    catch( err ) {

        console.log(
            'error in exchange /exchange-users - ' +
            `POST function: ${ err }`
        );

        return handleError( err );
    }
});