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

const schema = yup.object().shape({
    displayName: yup.string().required('You must enter display name'),
    email: yup.string().email('You must enter a valid email').required('You must enter a email'),
    password: yup
        .string()
        .required('Please enter your password.')
        .min(8, 'Password is too short - should be 8 chars minimum.'),
    passwordConfirm: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match')
});

const defaultValues = {
    displayName: '',
    email: '',
    password: '',
    passwordConfirm: ''
};

function SignupForm({ onSubmit }) {
    const classes = useStyles();
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
                            label="Full name"
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
                            label="Email"
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
                            label="Password"
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
                            label="Confirm Password"
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
                    Register
                </Button>
            </form>
        </div>
    );
}

export default SignupForm;
