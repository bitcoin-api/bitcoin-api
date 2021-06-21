import { setState } from '../reduxX';


export default () => {

    const handleResize = () => {

        setState( 'windowWidth', window.innerWidth );
    };
      
    window.addEventListener( 'resize', handleResize );
};
