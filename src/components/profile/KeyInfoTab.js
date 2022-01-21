import { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateUserInformation } from 'auth/store/userSlice';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm, useFormState } from 'react-hook-form';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import Button from 'components/common/Button';

const useStyles = makeStyles((theme) => ({
    btnWrapper: {
        display: 'flex',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '0 1.5rem',
        margin: '1rem 0',
        [theme.breakpoints.up('sm')]: {
            justifyContent: 'flex-end'
        }
    },
    button: {
        margin: '0 1rem'
    },
    card: {
        width: '100%',
        marginBottom: '32px',
        borderRadius: '8px',
        boxShadow: theme.shadows[1]
    },
    cardHeader: {
        backgroundColor: theme.palette.type === 'light' ? '#DADADA' : '#121212',
        color: theme.palette.type === 'light' ? '#333333' : '#DADADA',
        '& .MuiToolbar-root': {
            display: 'flex',
            justifyContent: 'space-between'
        }
    },
    disabledChip: {
        '& .MuiChip-label': {
            color: 'yellow'
        }
    },
    field: {
        marginBottom: '16px',
        padding: '0 16px'
    },
    fieldRequired: {
        marginBottom: '16px',
        padding: '4px 16px',
        border: `1px solid ${theme.palette.error.main}`
    },
    label: {
        fontSize: '.92rem',
        fontWeight: 500,
        marginBottom: '4px'
    },
    link: {
        color: theme.palette.type === 'light' ? theme.palette.primary.dark : theme.palette.primary.main
    },
    requiredSymbol: {
        color: theme.palette.error.main
    },
    root: {
        marginTop: '5vh'
    }
}));

const defaultValues = {
    firstName: '',
    lastName: '',
    contact: {
        email: '',
        tel: ''
    },
    general: {
        locations: ''
    },
    work: {
        availability: '',
        hourlyRate: '',
        occupation: ''
    }
};

const schema = yup.object().shape({});

function KeyInfoTab({ setIsDataChanged, user }) {
    const dispatch = useDispatch();
    const classes = useStyles();

    const [edit, setEdit] = useState(false);

    const { data } = useSelector(({ auth }) => auth.user);

    const { handleSubmit, reset, control } = useForm({
        mode: 'onChange',
        defaultValues,
        resolver: yupResolver(schema)
    });
    const { isDirty } = useFormState({ control });

    useEffect(() => {
        if (isDirty) setIsDataChanged(true);
        // eslint-disable-next-line
    }, [isDirty]);

    const resetForm = useCallback(() => {
        reset({
            ...data,
            firstName: data.firstName || '',
            lastName: data.lastName || '',
            contact: {
                ...data.contact,
                email: data.contact?.email || '',
                tel: data.contact?.tel || ''
            },
            general: {
                ...data.general,
                locations: data.general?.locations || ''
            },
            work: {
                ...data.work,
                occupation: data.work?.occupation || ''
            }
        });
    }, [data, reset]);

    useEffect(() => {
        if (data) resetForm();
    }, [data, resetForm]);

    if (!data) {
        return null;
    }

    const { general, contact, work } = data;

    const onSubmit = async (values) => {
        dispatch(updateUserInformation({ ...values, displayName: `${values.firstName} ${values.lastName}` }));
        setEdit(false);
        setIsDataChanged(false);
    };

    return (
        <Grid
            component="form"
            onSubmit={handleSubmit((values) => onSubmit(values))}
            container
            spacing={4}
            className={classes.root}
        >
            {edit ? (
                <div className={classes.btnWrapper}>
                    <Button
                        className={classes.button}
                        variant="outlined"
                        onClick={() => {
                            resetForm();
                            setEdit(false);
                            setIsDataChanged(false);
                        }}
                    >
                        Cancel
                    </Button>
                    <Button className={classes.button} type="submit">
                        Save
                    </Button>
                </div>
            ) : (
                <div className={classes.btnWrapper}>
                    <Button className={classes.button} variant="outlined" onClick={() => setEdit(true)}>
                        Edit
                    </Button>
                </div>
            )}

            <Grid container item xs={12} md={8}>
                <Grid item component={Card} xs={12} className={classes.card}>
                    <AppBar className={classes.cardHeader} position="static" elevation={0}>
                        <Toolbar>
                            <Typography variant="subtitle1" color="inherit" className="flex-1 px-12 font-medium">
                                Key Information
                            </Typography>
                        </Toolbar>
                    </AppBar>

                    <CardContent>
                        <div onClick={() => setEdit(true)} className={classes.field}>
                            <Typography className={classes.label}>First Name(s)</Typography>

                            {edit ? (
                                <FormControl style={{ margin: '8px 0 16px 0' }} required fullWidth>
                                    <Controller
                                        name="firstName"
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                autoFocus
                                                type="text"
                                                className={classes.textField}
                                                placeholder="Eg: John"
                                            />
                                        )}
                                    />
                                </FormControl>
                            ) : (
                                <Typography>{user?.firstName}</Typography>
                            )}
                        </div>

                        <div onClick={() => setEdit(true)} className={classes.field}>
                            <Typography className={classes.label}>Last Name(s)</Typography>

                            {edit ? (
                                <FormControl style={{ margin: '8px 0 16px 0' }} required fullWidth>
                                    <Controller
                                        name="lastName"
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                type="text"
                                                className={classes.textField}
                                                placeholder="Eg: Doe"
                                            />
                                        )}
                                    />
                                </FormControl>
                            ) : (
                                <Typography>{user?.lastName}</Typography>
                            )}
                        </div>

                        <div onClick={() => setEdit(true)} className={classes.field}>
                            <Typography className={classes.label}>Email</Typography>

                            {edit ? (
                                <FormControl style={{ margin: '8px 0 16px 0' }} required fullWidth>
                                    <Controller
                                        name="contact.email"
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                type="text"
                                                className={classes.textField}
                                                placeholder="Eg: john@doe.com"
                                            />
                                        )}
                                    />
                                </FormControl>
                            ) : (
                                <a
                                    className={classes.link}
                                    target="_blank"
                                    rel="noreferrer"
                                    href={`mailto:${contact?.email || user?.email}`}
                                >
                                    <Typography>{contact?.email || user?.email}</Typography>
                                </a>
                            )}
                        </div>

                        <div onClick={() => setEdit(true)} className={classes.field}>
                            <Typography className={classes.label}>Phone number</Typography>

                            {edit ? (
                                <FormControl style={{ margin: '8px 0 16px 0' }} fullWidth>
                                    <Controller
                                        name="contact.tel"
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                type="text"
                                                className={classes.textField}
                                                placeholder="+39 (351) 548 1875"
                                            />
                                        )}
                                    />
                                </FormControl>
                            ) : (
                                <a
                                    className={classes.link}
                                    target="_blank"
                                    rel="noreferrer"
                                    href={`tel:${contact?.tel}`}
                                >
                                    <Typography>{contact?.tel}</Typography>
                                </a>
                            )}
                        </div>

                        <div onClick={() => setEdit(true)} className={classes.field}>
                            <Typography className={classes.label}>Country of residence</Typography>

                            {edit ? (
                                <FormControl style={{ margin: '8px 0 16px 0' }} required fullWidth>
                                    <Controller
                                        name="general.locations"
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                type="text"
                                                className={classes.textField}
                                                placeholder="Eg: Malta"
                                            />
                                        )}
                                    />
                                </FormControl>
                            ) : (
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <Typography>{general?.locations}</Typography>
                                    {general?.locations && (
                                        <Icon style={{ fontSize: '1rem', margin: '0 4px' }} color="action">
                                            location_on
                                        </Icon>
                                    )}
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Grid>
            </Grid>

            <Grid container item xs={12} md={4}>
                <Grid item component={Card} xs={12} className={classes.card}>
                    <AppBar className={classes.cardHeader} position="static" elevation={0}>
                        <Toolbar>
                            <Typography variant="subtitle1" color="inherit" className="flex-1 px-12 font-medium">
                                Work
                            </Typography>
                        </Toolbar>
                    </AppBar>

                    <CardContent>
                        {' '}
                        <div onClick={() => setEdit(true)} className={classes.field}>
                            <Typography className={classes.label}>Profession/Role</Typography>

                            {edit ? (
                                <FormControl style={{ margin: '8px 0 16px 0' }} required fullWidth>
                                    <Controller
                                        name="work.occupation"
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                type="text"
                                                className={classes.textField}
                                                placeholder="Eg: Product Manager"
                                            />
                                        )}
                                    />
                                </FormControl>
                            ) : (
                                <Typography>{work?.occupation}</Typography>
                            )}
                        </div>
                    </CardContent>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default KeyInfoTab;
