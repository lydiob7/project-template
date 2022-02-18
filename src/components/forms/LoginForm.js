import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
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

const defaultValues = {
    email: '',
    password: ''
};

function LoginForm({ onSubmit = () => {} }) {
    const classes = useStyles();

    const login = useSelector(({ auth }) => auth.login);
    const text = useSelector(({ ui }) => ui.textContent?.landingPage?.authCard?.loginForm);

    const schema = yup.object().shape({
        email: yup.string().email(text?.validEmail).required(text?.emailRequired),
        password: yup.string().required(text?.passwordRequired)
    });

    const { control, formState, handleSubmit, setError } = useForm({
        mode: 'onChange',
        defaultValues,
        resolver: yupResolver(schema)
    });

    const { isValid, errors } = formState;

    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        login?.errors?.forEach((error) => {
            setError(error.type, {
                type: 'manual',
                message: error.message
            });
        });
    }, [login.errors, setError]);

    return (
        <div>
            <form className={classes.root} onSubmit={handleSubmit(onSubmit)}>
                <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            className={classes.input}
                            type="text"
                            label={text?.emailLabel}
                            error={!!errors.email}
                            helperText={errors?.email?.message}
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
                            label={text?.passwordLabel}
                            error={!!errors.password}
                            helperText={errors?.password?.message}
                            InputProps={{
                                className: 'pr-2',
                                type: showPassword ? 'text' : 'password',
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={() => setShowPassword(!showPassword)}>
                                            {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                            variant="outlined"
                            required
                        />
                    )}
                />

                <Button type="submit" aria-label="LOG IN" disabled={!isValid} value="firebase">
                    {text?.submitBtn}
                </Button>
            </form>
        </div>
    );
}

export default LoginForm;
