import { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateUserInformation } from 'auth/store/userSlice';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm, useFormState } from 'react-hook-form';

import {
    AppBar,
    Card,
    CardContent,
    FormControl,
    Grid,
    makeStyles,
    TextField,
    Toolbar,
    Typography
} from '@material-ui/core';

import { Button } from 'custom-components';

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
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
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
    link: {},
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
    general: {},
    insurance: {
        insuredPersonType: '',
        healthInsuranceFund: '',
        healthInsuranceNumber: ''
    }
};

const schema = yup.object().shape({});

function KeyInfoTab({ setIsDataChanged, user }) {
    const dispatch = useDispatch();
    const classes = useStyles();

    const [edit, setEdit] = useState(false);

    const { data } = useSelector(({ auth }) => auth.user);
    const text = useSelector(({ ui }) => ui.textContent?.profilePage);

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
                email: data.email || '',
                tel: data.phoneNumber || ''
            },
            general: {
                ...data.general
            },
            insurance: {
                ...data.insurance,
                insuredPersonType: data.insuredPersonType || '',
                healthInsuranceFund: data.healthInsuranceFund || '',
                healthInsuranceNumber: data.healthInsuranceNumber || ''
            }
        });
    }, [data, reset]);

    useEffect(() => {
        if (data) resetForm();
    }, [data, resetForm]);

    if (!data) {
        return null;
    }

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
                        {text?.cancelBtn}
                    </Button>
                    <Button className={classes.button} type="submit">
                        {text?.saveBtn}
                    </Button>
                </div>
            ) : (
                <div className={classes.btnWrapper}>
                    <Button className={classes.button} variant="outlined" onClick={() => setEdit(true)}>
                        {text?.editBtn}
                    </Button>
                </div>
            )}

            <Grid container item xs={12} md={8}>
                <Grid item component={Card} xs={12} className={classes.card}>
                    <AppBar className={classes.cardHeader} position="static" elevation={0}>
                        <Toolbar>
                            <Typography variant="body1" color="inherit" className="flex-1 px-12 font-medium">
                                {text?.generalTab?.keyInformation?.title}
                            </Typography>
                        </Toolbar>
                    </AppBar>

                    <CardContent>
                        <div onClick={() => setEdit(true)} className={classes.field}>
                            <Typography className={classes.label}>
                                {text?.generalTab?.keyInformation?.firstNameLabel}
                            </Typography>

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
                                                variant="outlined"
                                                size="small"
                                                className={classes.textField}
                                                placeholder={text?.generalTab?.keyInformation?.firstNamePlaceholder}
                                            />
                                        )}
                                    />
                                </FormControl>
                            ) : (
                                <Typography>{user?.firstName}</Typography>
                            )}
                        </div>

                        <div onClick={() => setEdit(true)} className={classes.field}>
                            <Typography className={classes.label}>
                                {text?.generalTab?.keyInformation?.lastNameLabel}
                            </Typography>

                            {edit ? (
                                <FormControl style={{ margin: '8px 0 16px 0' }} required fullWidth>
                                    <Controller
                                        name="lastName"
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                type="text"
                                                variant="outlined"
                                                size="small"
                                                className={classes.textField}
                                                placeholder={text?.generalTab?.keyInformation?.lastNamePlaceholder}
                                            />
                                        )}
                                    />
                                </FormControl>
                            ) : (
                                <Typography>{user?.lastName}</Typography>
                            )}
                        </div>

                        <div onClick={() => setEdit(true)} className={classes.field}>
                            <Typography className={classes.label}>
                                {text?.generalTab?.keyInformation?.emailLabel}
                            </Typography>

                            {edit && false ? (
                                <FormControl style={{ margin: '8px 0 16px 0' }} required fullWidth>
                                    <Controller
                                        name="contact.email"
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                type="text"
                                                variant="outlined"
                                                size="small"
                                                className={classes.textField}
                                                placeholder={text?.generalTab?.keyInformation?.emailPlaceholder}
                                            />
                                        )}
                                    />
                                </FormControl>
                            ) : (
                                <a
                                    className={classes.link}
                                    target="_blank"
                                    rel="noreferrer"
                                    href={`mailto:${user?.email}`}
                                >
                                    <Typography>{user?.email}</Typography>
                                </a>
                            )}
                        </div>

                        <div onClick={() => setEdit(true)} className={classes.field}>
                            <Typography className={classes.label}>
                                {text?.generalTab?.keyInformation?.phoneLabel}
                            </Typography>

                            {edit ? (
                                <FormControl style={{ margin: '8px 0 16px 0' }} fullWidth>
                                    <Controller
                                        name="contact.tel"
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                type="text"
                                                variant="outlined"
                                                size="small"
                                                className={classes.textField}
                                                placeholder={text?.generalTab?.keyInformation?.phonePlaceholder}
                                            />
                                        )}
                                    />
                                </FormControl>
                            ) : (
                                <a
                                    className={classes.link}
                                    target="_blank"
                                    rel="noreferrer"
                                    href={`tel:${user?.phoneNumber}`}
                                >
                                    <Typography>{user?.phoneNumber}</Typography>
                                </a>
                            )}
                        </div>
                    </CardContent>
                </Grid>
            </Grid>

            <Grid container item xs={12} md={4}>
                <Grid item component={Card} xs={12} className={classes.card}>
                    <AppBar className={classes.cardHeader} position="static" elevation={0}>
                        <Toolbar>
                            <Typography variant="body1" color="inherit" className="flex-1 px-12 font-medium">
                                {text?.generalTab?.otherInformation?.title}
                            </Typography>
                        </Toolbar>
                    </AppBar>

                    <CardContent>
                        <div onClick={() => setEdit(true)} className={classes.field}>
                            <Typography className={classes.label}>
                                {text?.generalTab?.otherInformation?.professionLabel}
                            </Typography>

                            {edit ? (
                                <FormControl style={{ margin: '8px 0 16px 0' }} required fullWidth>
                                    <Controller
                                        name="profession"
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                type="text"
                                                variant="outlined"
                                                size="small"
                                                className={classes.textField}
                                                placeholder={text?.generalTab?.otherInformation?.professionPlaceholder}
                                            />
                                        )}
                                    />
                                </FormControl>
                            ) : (
                                <Typography>{user?.profession}</Typography>
                            )}
                        </div>
                    </CardContent>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default KeyInfoTab;
