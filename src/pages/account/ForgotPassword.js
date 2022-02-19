import { Controller, useForm } from 'react-hook-form';
import { withRouter } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from 'custom-components';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import * as yup from 'yup';
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
    email: ''
};

function ForgotPasswordPage({ history, onSubmit: onHandleSubmit = () => {} }) {
    const classes = useStyles();

    const textProvider = useSelector(({ ui }) => ui.textContent.landingPage.authCard.forgotPwdForm);

    const schema = yup.object().shape({
        email: yup.string().email(textProvider.validEmail).required(textProvider.emailRequired)
    });

    const { control, formState, handleSubmit } = useForm({
        mode: 'onChange',
        defaultValues,
        resolver: yupResolver(schema)
    });

    const { isValid, errors } = formState;

    async function onSubmit(model) {
        const response = await onHandleSubmit(model);
        if (response?.status === 'done') history.push('/reset-confirmation', [model]);
    }

    return (
        <div>
            <form name="recoverForm" noValidate className={classes.root} onSubmit={handleSubmit(onSubmit)}>
                <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            className={classes.input}
                            label={textProvider.emailLabel}
                            autoFocus
                            type="email"
                            error={!!errors.email}
                            helperText={errors?.email?.message}
                            variant="outlined"
                            fullWidth
                        />
                    )}
                />

                <Button type="submit" aria-label="RESET PASSWORD" disabled={!isValid} value="firebase">
                    {textProvider.submitBtn}
                </Button>
            </form>
        </div>
    );
}

export default withRouter(ForgotPasswordPage);
