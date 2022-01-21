/* eslint import/no-extraneous-dependencies: off*/
import { createSlice } from '@reduxjs/toolkit';
import { createBrowserHistory } from 'history';
import _ from 'lodash';
import { showMessage } from 'store/messageSlice';
import firebaseService from 'services/firebaseService';
import { parsePath } from 'utils/helpers';

const history = createBrowserHistory();

export const setUserDataFirebase = (user, authUser) => async (dispatch) => {
    if (user) {
        const userData = {
            bgURL: user.data?.bgURL || user.bgURL || '',
            contact: user.data?.contact || {},
            displayName: user.data?.displayName || user.displayName || '',
            email: user.data?.email || user.email || '',
            emailVerified: user.data?.emailVerified || user.emailVerified || '',
            firstName: user.data?.firstName || user.firstName || '',
            frequency: user.data?.frequency || 0,
            from: 'firebase',
            general: user.data?.general || {},
            isApproved: user.data?.isApproved || false,
            lastName: user.data?.lastName || user.lastName || '',
            phoneNumber: user.data?.phoneNumber || user.phoneNumber || '',
            photoURL: user.data?.photoURL || user.photoURL || '',
            redirectUrl: '/',
            role: user.data?.role || user.role || '',
            settings: user.data?.settings || user.settings || {},
            shortcuts: user.data?.shortcuts || user.shortcuts || [],
            uid: user.data?.uid || user.uid || '',
            work: user.data?.work || {}
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
        data: {
            bgURL: authUser?.bgURL || '',
            contact: authUser.contact
                ? { ...authUser.contact, email: authUser.contact.email || authUser.email }
                : { email: authUser.email },
            firstName: authUser.firstName || '',
            frequency: authUser.frequency || 0,
            general: authUser.general || {},
            isApproved: authUser.isApproved || false,
            lastName: authUser.lastName || '',
            photoURL: authUser.photoURL || '',
            settings: authUser.settings || {},
            shortcuts: authUser.shortcuts || [],
            work: authUser.work || {}
        },
        displayName: authUser.displayName || '',
        email: authUser.email,
        emailVerified: authUser.emailVerified || false,
        firstName: authUser.firstName || '',
        from: 'firebase',
        id: authUser.uid,
        redirectUrl: '/',
        role: 'user',
        uid: authUser.uid
    });

    dispatch(updateUserData(user));

    return dispatch(setUserData(user));
};

export const setUserData = (user) => async (dispatch, getState) => {
    const userData = {
        bgURL: user.bgURL || '',
        contact: user.contact ? { ...user.contact, email: user.contact.email || user.email } : { email: user.email },
        displayName: user.displayName,
        email: user.email,
        emailVerified: user.emailVerified,
        firstName: user.firstName,
        frequency: user.frequency || 0,
        from: 'firebase',
        general: user.general || {},
        isApproved: user.isApproved || false,
        lastName: user.lastName,
        phoneNumber: user.phoneNumber || '',
        photoURL: user.photoURL || '',
        redirectUrl: '/',
        role: user.role || 'user',
        settings: user.settings || {},
        shortcuts: user.shortcuts || [],
        uid: user.uid,
        work: user.work || {}
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
