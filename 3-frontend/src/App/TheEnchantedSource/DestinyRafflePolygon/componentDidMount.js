import { actions } from '../../utils';


export default async () => {

    await actions.refreshDensityRaffleData({

        setToLoading: false
    });
};
