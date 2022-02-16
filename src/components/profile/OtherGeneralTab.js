import { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateUserInformation } from 'auth/store/userSlice';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {
    // Controller,
    useForm,
    useFormState
} from 'react-hook-form';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
// import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
// import TextField from '@material-ui/core/TextField';
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
        backgroundColor: theme.palette.type === 'light' ? theme.palette.secondary.main : '#121212',
        color: theme.palette.type === 'light' ? theme.palette.secondary.contrastText : '#DADADA',
        '& .MuiToolbar-root': {
            display: 'flex',
            justifyContent: 'space-between'
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
    listItem: {
        margin: '.5rem 1rem'
    },
    resumePicker: {
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            position: 'absolute',
            top: '-6px',
            left: '40px'
        }
    },
    root: {
        position: 'relative',
        marginTop: '5vh'
    }
}));

const defaultValues = {
    contact: {
        linkedin: '',
        behance: '',
        github: '',
        instagram: '',
        other: '',
        website: ''
    },
    general: {
        about: ''
    },
    work: {
        education: '',
        languages: '',
        workExperience: ''
    }
};

const schema = yup.object().shape({});

function OtherGeneralTab({ setIsDataChanged, user }) {
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
            contact: {
                ...data.contact,
                linkedin: data.contact?.linkedin || '',
                behance: data.contact?.behance || '',
                github: data.contact?.github || '',
                instagram: data.contact?.instagram || '',
                other: data.contact?.other || '',
                website: data.contact?.website || ''
            },
            general: {
                ...data.general,
                about: data.general?.about || ''
            },
            work: {
                ...data.work,
                education: data.work?.education || '',
                languages: data.work?.languages || '',
                workExperience: data.work?.workExperience || ''
            }
        });
    }, [data, reset]);

    useEffect(() => {
        if (data) resetForm();
    }, [data, resetForm]);

    if (!data) {
        return null;
    }

    // const { contact, general, work } = data;

    const onSubmit = async (values) => {
        dispatch(updateUserInformation(values));
        setEdit(false);
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
                            <Typography variant="subtitle1" color="inherit" className="flex-1 px-12 font-medium">
                                {text?.otherTab?.generalInformation?.title}
                            </Typography>
                        </Toolbar>
                    </AppBar>

                    <CardContent></CardContent>
                </Grid>
            </Grid>

            <Grid container item xs={12} md={4}>
                <Grid item component={Card} xs={12} className={classes.card}>
                    <AppBar className={classes.cardHeader} position="static" elevation={0}>
                        <Toolbar>
                            <Typography variant="subtitle1" color="inherit" className="flex-1 px-12 font-medium">
                                {text?.otherTab?.moreInformation?.title}
                            </Typography>
                        </Toolbar>
                    </AppBar>

                    <CardContent></CardContent>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default OtherGeneralTab;
