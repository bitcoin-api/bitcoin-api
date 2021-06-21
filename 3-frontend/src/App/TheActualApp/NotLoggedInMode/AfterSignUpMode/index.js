import { createElement as e } from 'react';
import {

    TitlePolygon,
    BlankSpace,
    usefulComponents

} from '../../../TheSource';
// import { getState } from '../../../reduxX';


// const getStyles = () => {
    
//     return {

//     };
// };


export default ({
    websiteName
}) => {

    // const styles = getStyles();
    // const fastMessageData = getState( 'ultraTools', 'fastMessageData' );

    return e(

        BlankSpace,
        null,
        e(
            TitlePolygon,
            {
                websiteName
            }
        ),
        e( usefulComponents.FastMessage )
    );
};
