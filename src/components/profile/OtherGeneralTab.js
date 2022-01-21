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

    const { contact, general, work } = data;

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
                                General
                            </Typography>
                        </Toolbar>
                    </AppBar>

                    <CardContent>
                        <div onClick={() => setEdit(true)} className={classes.field}>
                            <Typography className={classes.label}>About Me</Typography>

                            {edit ? (
                                <FormControl style={{ margin: '8px 0 16px 0' }} fullWidth>
                                    <Controller
                                        name="general.about"
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                autoFocus
                                                type="text"
                                                className={classes.textField}
                                                multiline
                                                placeholder="Eg: I am a Full stack web developer. I work with these technologies: ..."
                                            />
                                        )}
                                    />
                                </FormControl>
                            ) : (
                                <Typography>{general?.about}</Typography>
                            )}
                        </div>

                        <div onClick={() => setEdit(true)} className={classes.field}>
                            <Typography className={classes.label}>Education</Typography>

                            {edit ? (
                                <FormControl style={{ margin: '8px 0 16px 0' }} fullWidth>
                                    <Controller
                                        name="work.education"
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                type="text"
                                                className={classes.textField}
                                                multiline
                                                placeholder="Eg: Master in Computer Science (2018)"
                                            />
                                        )}
                                    />
                                </FormControl>
                            ) : (
                                <Typography>{work?.education}</Typography>
                            )}
                        </div>

                        <div onClick={() => setEdit(true)} className={classes.field}>
                            <Typography className={classes.label}>Work Experience</Typography>

                            {edit ? (
                                <FormControl style={{ margin: '8px 0 16px 0' }} fullWidth>
                                    <Controller
                                        name="work.workExperience"
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                type="text"
                                                className={classes.textField}
                                                multiline
                                                placeholder="Eg: Backend Developer Lead (2015  - 2020)"
                                            />
                                        )}
                                    />
                                </FormControl>
                            ) : (
                                <Typography>{work?.workExperience}</Typography>
                            )}
                        </div>

                        <div onClick={() => setEdit(true)} className={classes.field}>
                            <Typography className={classes.label}>Languages</Typography>

                            {edit ? (
                                <>
                                    <Typography variant="body2" color="textSecondary">
                                        Separate each item with a comma (,)
                                    </Typography>
                                    <FormControl style={{ margin: '8px 0 16px 0' }} fullWidth>
                                        <Controller
                                            name="work.languages"
                                            control={control}
                                            render={({ field }) => (
                                                <TextField
                                                    {...field}
                                                    type="text"
                                                    className={classes.textField}
                                                    placeholder="Eg: English, Spanish, Maltese"
                                                />
                                            )}
                                        />
                                    </FormControl>
                                </>
                            ) : (
                                work?.languages?.length > 0 &&
                                work.languages.split(',').map((language, index) => (
                                    <li className={classes.listItem} key={language + index}>
                                        {language}
                                    </li>
                                ))
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
                                Media
                            </Typography>
                        </Toolbar>
                    </AppBar>

                    <CardContent>
                        <div onClick={() => setEdit(true)} className={classes.field}>
                            <Typography className={classes.label}>Website</Typography>

                            {edit ? (
                                <FormControl style={{ margin: '8px 0 16px 0' }} fullWidth>
                                    <Controller
                                        name="contact.website"
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                type="text"
                                                className={classes.textField}
                                                placeholder="https://www.mysite.com/"
                                            />
                                        )}
                                    />
                                </FormControl>
                            ) : (
                                <a className={classes.link} target="_blank" rel="noreferrer" href={contact?.website}>
                                    <Typography>{contact?.website}</Typography>
                                </a>
                            )}
                        </div>

                        <div onClick={() => setEdit(true)} className={classes.field}>
                            <Typography className={classes.label}>Linkedin</Typography>

                            {edit ? (
                                <FormControl style={{ margin: '8px 0 16px 0' }} fullWidth>
                                    <Controller
                                        name="contact.linkedin"
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                type="text"
                                                className={classes.textField}
                                                placeholder="https://www.linkedin.com/my-name"
                                            />
                                        )}
                                    />
                                </FormControl>
                            ) : (
                                <a className={classes.link} target="_blank" rel="noreferrer" href={contact?.linkedin}>
                                    <Typography>{contact?.linkedin}</Typography>
                                </a>
                            )}
                        </div>

                        <div onClick={() => setEdit(true)} className={classes.field}>
                            <Typography className={classes.label}>Behance</Typography>

                            {edit ? (
                                <FormControl style={{ margin: '8px 0 16px 0' }} fullWidth>
                                    <Controller
                                        name="contact.behance"
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                type="text"
                                                className={classes.textField}
                                                placeholder="https://www.behance.net/my-name"
                                            />
                                        )}
                                    />
                                </FormControl>
                            ) : (
                                <a className={classes.link} target="_blank" rel="noreferrer" href={contact?.behance}>
                                    <Typography>{contact?.behance}</Typography>
                                </a>
                            )}
                        </div>

                        <div onClick={() => setEdit(true)} className={classes.field}>
                            <Typography className={classes.label}>Github</Typography>

                            {edit ? (
                                <FormControl style={{ margin: '8px 0 16px 0' }} fullWidth>
                                    <Controller
                                        name="contact.github"
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                type="text"
                                                className={classes.textField}
                                                placeholder="https://www.github.com/my-name"
                                            />
                                        )}
                                    />
                                </FormControl>
                            ) : (
                                <a className={classes.link} target="_blank" rel="noreferrer" href={contact?.github}>
                                    <Typography>{contact?.github}</Typography>
                                </a>
                            )}
                        </div>

                        <div onClick={() => setEdit(true)} className={classes.field}>
                            <Typography className={classes.label}>Instagram</Typography>

                            {edit ? (
                                <FormControl style={{ margin: '8px 0 16px 0' }} fullWidth>
                                    <Controller
                                        name="contact.instagram"
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                type="text"
                                                className={classes.textField}
                                                placeholder="https://www.instagram.com/my-name"
                                            />
                                        )}
                                    />
                                </FormControl>
                            ) : (
                                <a className={classes.link} target="_blank" rel="noreferrer" href={contact?.instagram}>
                                    <Typography>{contact?.instagram}</Typography>
                                </a>
                            )}
                        </div>

                        <div onClick={() => setEdit(true)} className={classes.field}>
                            <Typography className={classes.label}>Other</Typography>

                            {edit ? (
                                <FormControl style={{ margin: '8px 0 16px 0' }} fullWidth>
                                    <Controller
                                        name="contact.other"
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                type="text"
                                                className={classes.textField}
                                                placeholder="https://www.codewars.com/my-name"
                                            />
                                        )}
                                    />
                                </FormControl>
                            ) : (
                                <a className={classes.link} target="_blank" rel="noreferrer" href={contact?.other}>
                                    <Typography>{contact?.other}</Typography>
                                </a>
                            )}
                        </div>
                    </CardContent>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default OtherGeneralTab;
