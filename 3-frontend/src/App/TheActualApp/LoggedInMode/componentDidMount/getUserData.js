// import { getState, setState } from '../../reduxX';
import { actions } from '../../../utils';
// import { story } from '../../constants';


export default async () => {

    await actions.refreshUserData();
};
