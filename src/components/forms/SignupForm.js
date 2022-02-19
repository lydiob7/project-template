import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { Checkbox, InputAdornment, makeStyles, TextField } from '@material-ui/core';
import {
    MailOutline as MailOutlineIcon,
    PersonOutlineOutlined as PersonOutlineOutlinedIcon,
    VpnKeyOutlined as VpnKeyOutlinedIcon
} from '@material-ui/icons';

import { Button } from 'custom-components';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        width: '100%',
        marginBottom: '32px'
    },
    termsCheckbox: {
        marginRight: '.2rem'
    },
    termsWrapper: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '1rem'
    }
}));

const defaultValues = {
    displayName: '',
    email: '',
    password: '',
    passwordConfirm: ''
};

function SignupForm({ onSubmit = () => {} }) {
    const classes = useStyles();

    const authRegister = useSelector(({ auth }) => auth.register);
    const textProvider = useSelector(({ ui }) => ui.textContent.landingPage.authCard.registerForm);

    const schema = yup.object().shape({
        displayName: yup.string().required(textProvider.nameRequired),
        email: yup.string().email(textProvider.validEmail).required(textProvider.emailRequired),
        password: yup.string().required(textProvider.passwordRequired).min(8, textProvider.validPassword),
        passwordConfirm: yup.string().oneOf([yup.ref('password'), null], textProvider.passwordMatch)
    });

    // const dispatch = useDispatch();

    const { control, formState, handleSubmit, setError } = useForm({
        mode: 'onChange',
        defaultValues,
        resolver: yupResolver(schema)
    });

    const { isValid, errors } = formState;

    useEffect(() => {
        authRegister?.errors?.forEach((error) => {
            setError(error.type, {
                type: 'manual',
                message: error.message
            });
        });
    }, [authRegister.errors, setError]);

    return (
        <div>
            <form className={classes.root} onSubmit={handleSubmit(onSubmit)}>
                <Controller
                    name="displayName"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            className={classes.input}
                            type="text"
                            label={textProvider.fullNameLabel}
                            error={!!errors.displayName}
                            helperText={errors?.displayName?.message}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <PersonOutlineOutlinedIcon />
                                    </InputAdornment>
                                )
                            }}
                            variant="outlined"
                            required
                        />
                    )}
                />

                <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            className={classes.input}
                            type="text"
                            error={!!errors.email}
                            helperText={errors?.email?.message}
                            label={textProvider.emailLabel}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <MailOutlineIcon />
                                    </InputAdornment>
                                )
                            }}
                            variant="outlined"
                            required
                        />
                    )}
                />

                <Controller
                    name="password"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            className={classes.input}
                            type="password"
                            label={textProvider.passwordLabel}
                            error={!!errors.password}
                            helperText={errors?.password?.message}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <VpnKeyOutlinedIcon />
                                    </InputAdornment>
                                )
                            }}
                            variant="outlined"
                            required
                        />
                    )}
                />

                <Controller
                    name="passwordConfirm"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            className={classes.input}
                            type="password"
                            label={textProvider.confirmPwdLabel}
                            error={!!errors.passwordConfirm}
                            helperText={errors?.passwordConfirm?.message}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <VpnKeyOutlinedIcon />
                                    </InputAdornment>
                                )
                            }}
                            variant="outlined"
                            required
                        />
                    )}
                />

                <div className={classes.termsWrapper}>
                    <Controller
                        name="terms"
                        control={control}
                        render={({ field }) => (
                            <Checkbox
                                {...field}
                                id="terms"
                                color="primary"
                                className={classes.termsCheckbox}
                                error={!!errors.terms}
                                helperText={errors?.terms?.message}
                                required
                            />
                        )}
                    />
                    <label htmlFor="terms">
                        {textProvider?.termsText} <Link to="/terms&conditions">{textProvider?.termsLink}</Link>
                    </label>
                </div>

                <Button type="submit" aria-label="REGISTER" disabled={!isValid} value="legacy">
                    {textProvider.submitBtn}
                </Button>
            </form>
        </div>
    );
}

export default SignupForm;
