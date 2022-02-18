/* eslint import/no-extraneous-dependencies: off*/
import { createSlice } from '@reduxjs/toolkit';
import { createBrowserHistory } from 'history';
import _ from 'lodash';
import { showMessage } from 'store/messageSlice';
import firebaseService from 'services/firebaseService';
import { parsePath } from 'utils/helpers';
import authRoles from 'auth/authRoles';

const history = createBrowserHistory();

export const setUserDataFirebase = (user, authUser) => async (dispatch) => {
    if (user) {
        const userData = {
            email: user.email || '',
            firstName: user.firstName || '',
            from: 'firebase',
            lastName: user.lastName || '',
            photoURL: user.photoURL || '',
            redirectUrl: '/',
            role: user.role || authRoles.onlyGuest
        };
        return dispatch(setUserData(userData));
    }
    if (!authUser) return;

    // Create missing user settings
    return dispatch(createUserSettingsFirebase(authUser));
};

export const createUserSettingsFirebase = (authUser) => async (dispatch, getState) => {
    const guestUser = getState().auth.user;

    const user = _.merge({}, guestUser, {
        data: authUser
    });

    dispatch(updateUserData(user));

    return dispatch(setUserData(user));
};

export const setUserData = (user) => async (dispatch, getState) => {
    const userData = {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        photoURL: user.photoURL || '',
        role: user.role || authRoles.onlyGuest
    };
    dispatch(setUser(userData));
};

export const updateUserInformation = (information) => async (dispatch, getState) => {
    const oldUser = getState().auth.user;
    const user = _.merge({}, oldUser, { data: { ...oldUser.data, ...information } });

    dispatch(updateUserData(user));

    return dispatch(setUserDataFirebase(user));
};

export const editUserSkills = (skills) => async (dispatch, getState) => {
    const oldUser = getState().auth.user;
    const user = { ...oldUser, data: { ...oldUser.data, work: { ...oldUser.data?.work, skills } } };

    dispatch(updateUserData(user));

    return dispatch(setUserDataFirebase(user));
};

export const removeResume = () => async (dispatch, getState) => {
    const oldUser = getState().auth.user;
    const user = _.merge({}, oldUser, { data: { ...oldUser.data, work: { ...oldUser.data.work, resume: '' } } });

    await firebaseService.removeResume(user.data?.uid);

    return dispatch(setUserDataFirebase(user));
};

export const logoutUser = () => async (dispatch, getState) => {
    history.push({
        pathname: parsePath('/')
    });

    await firebaseService.signOut();

    return dispatch(userLoggedOut());
};

export const updateUserData = (user) => async (dispatch, getState) => {
    switch (user.data?.from) {
        case 'firebase': {
            firebaseService
                .updateUserData(user)
                .then(() => {
                    dispatch(setUserDataFirebase(user));
                })
                .catch((error) => {
                    dispatch(showMessage({ message: error.message }));
                });
            break;
        }
        default: {
            firebaseService
                .updateUserData(user)
                .then(() => {
                    dispatch(setUserDataFirebase(user));
                })
                .catch((error) => {
                    dispatch(showMessage({ message: error.message }));
                });
            break;
        }
    }
};

const initialState = {
    authenticated: false,
    data: {}
};

const userSlice = createSlice({
    name: 'auth/user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.data = action.payload;
            state.authenticated = true;
        },
        userLoggedOut: (state, action) => initialState
    },
    extraReducers: {}
});

export const { setUser, userLoggedOut } = userSlice.actions;

export default userSlice.reducer;
