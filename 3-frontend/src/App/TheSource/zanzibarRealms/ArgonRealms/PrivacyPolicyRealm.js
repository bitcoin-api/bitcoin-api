import ArgonInformation from './ArgonInformation';
import { createElement as e } from 'react';


export default () => {

    return e(
        ArgonInformation,
        {
            title: 'Privacy Policy',
            lastUpdatedDate: 'July 1st 2020',
            titleContentsAndMore: [
                {
                    title: 'Scope',
                    contents: (
                        'This is the Privacy Policy of the technology company DynastyBitcoin.com. DynastyBitcoin.com will be referred to in this document as "DB". "You", "your", the "user", or the "customer" will refer to anyone who uses DB services. This Privacy Policy describes how DB handles your data and personally identifiable information when using DB technology including the DynastyBitcoin.com website, or any other service provided by DB.'
                    ),
                },
                {
                    contents: (
                        `The purpose of this policy is to explain how DB gathers and uses data and how the collected and processed data is secure for DB customers.`
                    ),
                },
                {
                    title: 'Acceptance of Privacy Policy',
                    contents: (
                        'In using the services provided by DB, you are in agreement with the Privacy Policy. If you do not agree to or are unable to agree to the Privacy Policy, you should cease to use DB and its services immediately.'
                    ),
                },
                {
                    title: 'Changes to the Privacy Policy',
                    contents: (
                        'The Privacy Policy of DB can be modified at any time. When modified, the "Last Updated" date at the top of this Privacy Policy will be updated. If there are any material changes to the Privacy Policy, you will be notified when required.'
                    ),
                },
                {
                    title: 'Data Collection and Usage',
                    contents: (
                        `In order for DB to provide its services, data is required to be collected and used in various ways. This includes email, IP address, and any other information required to use DB services. Your usage data of DB services is also collected for improving DB security and quality. Any information volunteered to DB is subject the terms of the Privacy Policy.`
                    ),
                },
                {
                    title: 'Data Sharing',
                    contents: (
                        `It should be noted that DB being a company that works with Bitcoin, Bitcoin transactions, and the Bitcoin network, some of the data such as Bitcoin addresses and Bitcoin transactions will be publicly viewable through the Bitcoin network. Below is a summary of what data is shared by DB and how it's used:`
                    ),
                },
                {
                    contents: (
                        `• Your data will be shared with third party service providers that are used as a basis for DB, this includes web and cloud technology providers. Any third party service provider used will be properly vetted to ensure any shared data is being handled in an appropriate manner. Your personally identifiable information will not be sold to any third party service providers.`
                    ),
                },
                {
                    contents: (
                        `• Your information in anonymized format may be shared with third party services for analysis in order to improve DB security and services.`
                    ),
                },
                {
                    contents: (
                        `• Any other provided or volunteered information where consent has been given for it to be shared.`
                    ),
                },
                {
                    title: 'Data Protection',
                    contents: (
                        `DB uses secure digital and procedural methodologies in order to keep your data and your Bitcoin as secure as possible. In addition, DB DOES NOT store large volumes of Bitcoin. The DB services themselves only contain purposefully smaller amounts of Bitcoin that are needed for the business computer operation logic.`
                    ),
                },
                {
                    title: 'Data Retention and Access',
                    contents: (
                        `DB uses accounts that can store personally identifiable information associated with them. Transactions and other user actions associated with those accounts will be stored indefinitely although the personally identifiable information associated with those accounts and actions are not necessarily stored indefinitely, depending upon user request. `
                    ),
                },
                {
                    contents: (
                        `If you require access to specific data or have a request to delete certain data, you can contact support at support@dynastybitcoin.com.`
                    ),
                },
                {
                    title: 'Third-Party Links',
                    contents: (
                        `DB may have links to third-party websites and other internet based services that are not managed or are affiliated with DB. DB is not responsible for any data shared or any other interaction and any resulting consequences of those actions on those third-party entities. Please refer to those companies' own terms and privacy policies in order to understand how those companies deal with your data and your privacy while using their services.`
                    ),
                },
                {
                    title: 'Contact',
                    contents: (
                        `For any questions, complaints, suggestions, comments about this Privacy Policy or any other aspect of DB services, please don't hesitate to contact us through email at support@dynastybitcoin.com.`
                    ),
                },
            ]
        }
    );
};
