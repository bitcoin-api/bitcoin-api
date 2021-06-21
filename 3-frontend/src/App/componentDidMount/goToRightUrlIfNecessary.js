// TODO: extract from constants

const PROD_API_URL = 'https://l485y92hcf.execute-api.ca-central-1.amazonaws.com';
const THE_DYNASTY = 'DynastyBitcoin.com';


export default () => {

    if(
        (

            process.env.REACT_APP_EXCHANGE_API_BASE_URL ===
            PROD_API_URL
        ) &&
        (
            process.env.REACT_APP_WEBSITE_NAME ===
            THE_DYNASTY
        ) &&
        !window.location.hostname.includes( 'dynastybitcoin.com' )
    ) {

        window.location = 'https://www.dynastybitcoin.com';
    }
};
