import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import VpnKeyOutlinedIcon from '@material-ui/icons/VpnKeyOutlined';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import { useSelector } from 'react-redux';

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
    }
}));

const defaultValues = {
    displayName: '',
    email: '',
    password: '',
    passwordConfirm: ''
};

function SignupForm({ onSubmit }) {
    const classes = useStyles();

    const textProvider = useSelector(({ ui }) => ui.textContent.landingPage.authCard.registerForm);

    const schema = yup.object().shape({
        displayName: yup.string().required(textProvider.nameRequired),
        email: yup.string().email(textProvider.validEmail).required(textProvider.emailRequired),
        password: yup.string().required(textProvider.passwordRequired).min(8, textProvider.validPassword),
        passwordConfirm: yup.string().oneOf([yup.ref('password'), null], textProvider.passwordMatch)
    });

    // const dispatch = useDispatch();

    const { control, formState, handleSubmit } = useForm({
        mode: 'onChange',
        defaultValues,
        resolver: yupResolver(schema)
    });

    const { isValid, errors } = formState;

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

                <Button type="submit" aria-label="REGISTER" disabled={!isValid} value="legacy">
                    {textProvider.submitBtn}
                </Button>
            </form>
        </div>
    );
}

export default SignupForm;
