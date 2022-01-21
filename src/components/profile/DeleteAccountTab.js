import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import clsx from 'clsx';

import { makeStyles, withStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    root: {
        flexDirection: 'column',
        padding: '2rem',
        [theme.breakpoints.up('md')]: {
            marginTop: '-60px'
        }
    },
    button: {
        margin: '1rem auto'
    },
    card: {
        flexDirection: 'column',
        margin: '0 1rem'
    },
    field: {
        marginBottom: '1rem'
    },
    flexCenter: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        margin: '1rem 0 2rem 0'
    },
    wrapper: {
        flexDirection: 'column'
    }
}));

const DangerButton = withStyles({
    root: {
        backgroundColor: red[500],
        color: 'white'
    }
})(Button);

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
    confirm: yup
        .string()
        .required('Please write exactly the word "Delete".')
        .test('match', 'Please write exactly the word "Delete".', (word) => {
            return word.toLowerCase() === 'delete';
        })
});

const defaultValues = {
    confirm: ''
};

function DeleteAccountTab({ onSubmit: onHandleSubmit = () => {}, logoutUser = () => {} }) {
    const classes = useStyles();

    const { control, formState, handleSubmit } = useForm({
        mode: 'onChange',
        defaultValues,
        resolver: yupResolver(schema)
    });

    const { isValid, errors } = formState;

    async function onSubmit() {
        const response = await onHandleSubmit();
        if (response?.status === 'done') logoutUser();
    }

    return (
        <div className={clsx(classes.root, classes.flexCenter)}>
            <div className={classes.flexCenter}>
                <div initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }}>
                    <Card>
                        <CardContent className={clsx(classes.card, classes.flexCenter)}>
                            <Typography variant="h6" className={classes.title}>
                                Delete your account
                            </Typography>

                            <form
                                name="resetForm"
                                noValidate
                                className={clsx(classes.wrapper, classes.flexCenter)}
                                onSubmit={handleSubmit(onSubmit)}
                            >
                                <Controller
                                    name="confirm"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            className={classes.field}
                                            label='Write "Delete"'
                                            error={!!errors.confirm}
                                            helperText={errors?.confirm?.message}
                                            variant="outlined"
                                            required
                                            fullWidth
                                        />
                                    )}
                                />

                                <DangerButton
                                    variant="contained"
                                    className={classes.button}
                                    aria-label="Reset"
                                    disabled={!isValid}
                                    type="submit"
                                >
                                    Delete Account
                                </DangerButton>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default DeleteAccountTab;
