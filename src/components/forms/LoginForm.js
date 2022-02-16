import { useState } from 'react';
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
    email: '',
    password: ''
};

function LoginForm({ onSubmit = () => {} }) {
    const classes = useStyles();

    const textProvider = useSelector(({ ui }) => ui.textContent.landingPage.authCard.loginForm);

    const schema = yup.object().shape({
        email: yup.string().email(textProvider.validEmail).required(textProvider.emailRequired),
        password: yup.string().required(textProvider.passwordRequired)
    });

    const { control, formState, handleSubmit } = useForm({
        mode: 'onChange',
        defaultValues,
        resolver: yupResolver(schema)
    });

    const { isValid, errors } = formState;

    const [showPassword, setShowPassword] = useState(false);

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
                            label={textProvider.emailLabel}
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
                            label={textProvider.passwordLabel}
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
                    {textProvider.submitBtn}
                </Button>
            </form>
        </div>
    );
}

export default LoginForm;
