import axios from 'axios';
import * as actions from '../api';

const apiURLS = {
    main: process.env.REACT_APP_API_MAIN_URL,
    secondary: process.env.REACT_APP_API_SECONDARY_URL,
    default: process.env.REACT_APP_API_MAIN_URL
};

const api =
    ({ dispatch }) =>
    (next) =>
    async (action) => {
        if (action.type !== actions.apiCallBegan.type) return next(action);

        const { apiId, url, method, data, onStart, onSuccess, onError } = action.payload;

        let baseURL = apiURLS['default'];
        if (apiId) baseURL = apiURLS[apiId] || apiURLS['default'];

        if (onStart) dispatch({ type: onStart });

        next(action);

        try {
            const response = await axios.request({
                baseURL,
                url,
                method,
                data
            });
            dispatch(actions.apiCallSuccess(response.data));

            if (onSuccess) dispatch({ type: onSuccess, payload: response.data });
        } catch (error) {
            dispatch(actions.apiCallFailed(error.message));

            if (onError) dispatch({ type: onError, payload: error.message });
        }
    };

export default api;
