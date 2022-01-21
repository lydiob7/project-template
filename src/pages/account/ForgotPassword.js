import { Controller, useForm } from 'react-hook-form';
import { withRouter } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import * as yup from 'yup';

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

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
    email: yup.string().email('You must enter a valid email').required('You must enter a email')
});

const defaultValues = {
    email: ''
};

function ForgotPasswordPage({ history, onSubmit: onHandleSubmit = () => {} }) {
    const classes = useStyles();

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
                            label="Email"
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
                    Send reset link
                </Button>
            </form>
        </div>
    );
}

export default withRouter(ForgotPasswordPage);
