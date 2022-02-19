import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateUserInformation, removeResume } from 'auth/store/userSlice';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { AppBar, Card, CardContent, Grid, makeStyles, Toolbar, Typography } from '@material-ui/core';

import { ToggableArrayInput, ToggableInput, ToggablePicker } from 'custom-components';

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

function WorkTab({ user }) {
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

    const { contact, general, work } = data;

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

    const handleSubmitResume = async (resume) => {
        const updatedUser = { ...data, work: { ...data.work, resume } };
        dispatch(updateUserInformation(updatedUser));
    };

    const handleRemoveResume = async () => {
        dispatch(removeResume());
    };

    const onSubmit = async (values, section, property) => {
        dispatch(updateUserInformation(values));
        handleEdit(section, property);
    };

    return (
        <Grid container spacing={4} className={classes.root}>
            <Grid item xs={12} sm={8} lg={6}>
                <ToggablePicker
                    label="Resume"
                    onRemoveFile={handleRemoveResume}
                    onSubmit={handleSubmitResume}
                    title="resume"
                    value={work?.resume}
                />
            </Grid>
            <Grid item xs={12} sm={4} lg={6}></Grid>

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
                        <ToggableInput
                            category="general"
                            control={control}
                            controlName="general.about"
                            edit={edit.general?.about}
                            handleEdit={handleEdit}
                            handleSubmit={handleSubmit}
                            label="About Me"
                            multiline
                            onSubmit={onSubmit}
                            placeholder="Eg: I am a Full stack web developer. I work with these technologies: ..."
                            title="about"
                            value={general?.about}
                        />

                        <ToggableInput
                            category="work"
                            control={control}
                            controlName="work.education"
                            edit={edit.work?.education}
                            handleEdit={handleEdit}
                            handleSubmit={handleSubmit}
                            label="Education"
                            multiline
                            onSubmit={onSubmit}
                            placeholder="Eg: Master in Computer Science (2018)"
                            title="education"
                            value={work?.education}
                        />

                        <ToggableInput
                            category="work"
                            control={control}
                            controlName="work.workExperience"
                            edit={edit.work?.workExperience}
                            handleEdit={handleEdit}
                            handleSubmit={handleSubmit}
                            label="Work Experience"
                            multiline
                            onSubmit={onSubmit}
                            placeholder="Eg: Backend Developer Lead (2015  - 2020)"
                            title="workExperience"
                            value={work?.workExperience}
                        />

                        <ToggableArrayInput
                            category="work"
                            control={control}
                            controlName="work.languages"
                            edit={edit.work?.languages}
                            handleEdit={handleEdit}
                            handleSubmit={handleSubmit}
                            label="Languages"
                            multiline={true}
                            onSubmit={onSubmit}
                            placeholder="Eg: English, Spanish, Maltese"
                            title="languages"
                            value={work?.languages}
                        />
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
                        <ToggableInput
                            category="contact"
                            control={control}
                            controlName="contact.website"
                            edit={edit.contact?.website}
                            handleEdit={handleEdit}
                            handleSubmit={handleSubmit}
                            label="Website"
                            onSubmit={onSubmit}
                            placeholder="https://www.mysite.com/"
                            title="website"
                            type="link"
                            value={contact?.website}
                        />

                        <ToggableInput
                            category="contact"
                            control={control}
                            controlName="contact.linkedin"
                            edit={edit.contact?.linkedin}
                            handleEdit={handleEdit}
                            handleSubmit={handleSubmit}
                            label="LinkedIn"
                            onSubmit={onSubmit}
                            placeholder="https://www.linkedin.com/my-name"
                            title="linkedin"
                            type="link"
                            value={contact?.linkedin}
                        />

                        <ToggableInput
                            category="contact"
                            control={control}
                            controlName="contact.behance"
                            edit={edit.contact?.behance}
                            handleEdit={handleEdit}
                            handleSubmit={handleSubmit}
                            label="Behance"
                            onSubmit={onSubmit}
                            placeholder="https://www.behance.net/my-name"
                            title="behance"
                            type="link"
                            value={contact?.behance}
                        />

                        <ToggableInput
                            category="contact"
                            control={control}
                            controlName="contact.github"
                            edit={edit.contact?.github}
                            handleEdit={handleEdit}
                            handleSubmit={handleSubmit}
                            label="Github"
                            onSubmit={onSubmit}
                            placeholder="https://www.github.com/my-name"
                            title="github"
                            type="link"
                            value={contact?.github}
                        />

                        <ToggableInput
                            category="contact"
                            control={control}
                            controlName="contact.instagram"
                            edit={edit.contact?.instagram}
                            handleEdit={handleEdit}
                            handleSubmit={handleSubmit}
                            label="Instagram"
                            onSubmit={onSubmit}
                            placeholder="https://www.instagram.com/my-name"
                            title="instagram"
                            type="link"
                            value={contact?.instagram}
                        />

                        <ToggableInput
                            category="contact"
                            control={control}
                            controlName="contact.other"
                            edit={edit.contact?.other}
                            handleEdit={handleEdit}
                            handleSubmit={handleSubmit}
                            label="Other"
                            onSubmit={onSubmit}
                            placeholder="https://www.codewars.com/my-name"
                            title="other"
                            type="link"
                            value={contact?.other}
                        />

                        {/* <ToggableInput
                            category="contact"
                            control={control}
                            controlName="contact.address"
                            edit={edit.contact?.address}
                            handleEdit={handleEdit}
                            handleSubmit={handleSubmit}
                            label="Address"
                            onSubmit={onSubmit}
                            title="address"
                            value={contact?.address}
                        /> */}
                    </CardContent>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default WorkTab;
