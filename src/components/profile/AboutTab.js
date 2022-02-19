import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateUserInformation } from 'auth/store/userSlice';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { AppBar, Card, CardContent, Grid, makeStyles, Toolbar, Typography } from '@material-ui/core';

import { ToggableInput } from 'custom-components';

const useStyles = makeStyles((theme) => ({
    card: {
        width: '100%',
        marginBottom: '32px',
        borderRadius: '8px',
        boxShadow: theme.shadows[1]
    },
    cardHeader: {
        backgroundColor: theme.palette.type === 'light' ? '#DADADA' : '#121212',
        color: theme.palette.type === 'light' ? '#333333' : '#DADADA'
    },
    root: {
        marginTop: '5vh'
    }
}));

const defaultValues = {};

const schema = yup.object().shape({});

function AboutTab({ user }) {
    const dispatch = useDispatch();
    const classes = useStyles();

    const [edit, setEdit] = useState({
        general: {},
        contact: {},
        work: {}
    });

    const { data } = useSelector(({ auth }) => auth.user);

    const { handleSubmit, reset, control } = useForm({
        mode: 'onChange',
        defaultValues,
        resolver: yupResolver(schema)
    });

    useEffect(() => {
        if (data) {
            reset({ ...data });
        }
    }, [data, reset]);

    if (!data) {
        return null;
    }

    const { general, contact, work } = data;

    const handleEdit = (sectionName, propertyName) => {
        setEdit((values) => {
            return {
                ...values,
                [sectionName]: {
                    ...values[sectionName],
                    [propertyName]: !values[sectionName][propertyName]
                }
            };
        });
    };

    const onSubmit = async (values, section, property) => {
        dispatch(updateUserInformation({ ...values, displayName: `${values.firstName} ${values.lastName}` }));
        handleEdit(section, property);
    };

    return (
        <Grid container spacing={4} className={classes.root}>
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
                        <ToggableInput
                            category="general"
                            control={control}
                            controlName="firstName"
                            edit={edit.general?.firstName}
                            handleEdit={handleEdit}
                            handleSubmit={handleSubmit}
                            label="First Name(s)"
                            onSubmit={onSubmit}
                            placeholder="Eg: John"
                            title="firstName"
                            value={user?.firstName}
                        />

                        <ToggableInput
                            category="general"
                            control={control}
                            controlName="lastName"
                            edit={edit.general?.lastName}
                            handleEdit={handleEdit}
                            handleSubmit={handleSubmit}
                            label="Last Name(s)"
                            onSubmit={onSubmit}
                            placeholder="Eg: Doe"
                            title="lastName"
                            value={user?.lastName}
                        />

                        <ToggableInput
                            category="contact"
                            control={control}
                            controlName="contact.email"
                            edit={edit.contact?.email}
                            handleEdit={handleEdit}
                            handleSubmit={handleSubmit}
                            label="Email"
                            onSubmit={onSubmit}
                            placeholder="Eg: john@doe.com"
                            title="email"
                            type="email"
                            value={contact?.email || user?.email}
                        />

                        <ToggableInput
                            category="contact"
                            control={control}
                            controlName="contact.tel"
                            edit={edit.contact?.tel}
                            handleEdit={handleEdit}
                            handleSubmit={handleSubmit}
                            label="Phone number"
                            onSubmit={onSubmit}
                            placeholder="+39 (351) 548 1875"
                            title="tel"
                            type="tel"
                            value={contact?.tel}
                        />

                        {/* <ToggableInput
                            category="general"
                            control={control}
                            controlName="general.birthday"
                            edit={edit.general?.birthday}
                            handleEdit={handleEdit}
                            handleSubmit={handleSubmit}
                            InputLabelProps={{
                                shrink: true
                            }}
                            label="Birthday"
                            onSubmit={onSubmit}
                            title="birthday"
                            type="date"
                            value={general?.birthday}
                        /> */}

                        <ToggableInput
                            category="general"
                            control={control}
                            controlName="general.locations"
                            edit={edit.general?.location}
                            handleEdit={handleEdit}
                            handleSubmit={handleSubmit}
                            label="Country of residence"
                            onSubmit={onSubmit}
                            placeholder="Eg: Malta"
                            title="location"
                            type="location"
                            value={general?.locations}
                        />

                        {/*  */}
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
                        <ToggableInput
                            category="work"
                            control={control}
                            controlName="work.occupation"
                            edit={edit.work?.occupation}
                            handleEdit={handleEdit}
                            handleSubmit={handleSubmit}
                            label="Profession/Role"
                            onSubmit={onSubmit}
                            placeholder="Eg: Product Manager"
                            title="occupation"
                            value={work?.occupation}
                        />
                    </CardContent>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default AboutTab;
