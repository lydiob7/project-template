import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { themeDark, themeLight, mantainanceModeEnabled, mantainanceModeDisabled } from 'store/uiSlice';
import { showMessage } from 'store/messageSlice';

import { AccessAlarm } from '@material-ui/icons';
import { Container, Grid, Paper, Typography } from '@material-ui/core';

import {
    AuthCard,
    AuthUserCard,
    AuthUserSmallCard,
    Breadcrumb,
    Button,
    CheckboxWidget,
    ConfirmationModal,
    ContentCard,
    // Form,
    FormCard,
    ImageModal,
    ItemCard,
    ItemHorizontal,
    Loader,
    LoginForm,
    ReportItemModal,
    ResultsHeader,
    SearchInput,
    SignupForm,
    SimpleCard,
    SmallCard,
    Switch,
    TagsWidget,
    Title,
    TitleDecoration,
    ToggableArrayInput,
    ToggableAutocomplete,
    ToggableInput,
    ToggablePicker,
    ToggableSelect,
    WidgetWrapper
} from 'custom-components';

import { parsePath } from 'utils/helpers';

const checkboxes = [
    { text: 'Checkbox 1', number: 2, id: 0, active: false },
    { text: 'Checkbox 2', number: 1, id: 1, active: false },
    { text: 'Checkbox 3', number: 6, id: 2, active: true },
    { text: 'Checkbox 4', number: 9, id: 3, active: false },
    { text: 'Checkbox 5', id: 4, active: false },
    { text: 'Checkbox 6', id: 5, active: true },
    { text: 'Checkbox 7', id: 6, active: false },
    { text: 'Checkbox 8', number: 2, id: 7, active: false }
];

const inputFields = (setFormValues, textProvider) => [
    {
        Component: ToggableArrayInput,
        label: textProvider?.arrayInputLabel,
        name: 'array-input',
        placeholder: textProvider?.arrayInputPlaceholder,
        required: true
    },
    {
        addOption: (newOption) => console.log(newOption),
        Component: ToggableAutocomplete,
        label: textProvider?.autocompleteLabel,
        name: 'autocomplete-input',
        options: [{ title: textProvider?.selectOptionOneTitle }, { title: textProvider?.selectOptionTwoTitle }],
        placeholder: textProvider?.autocompletePlaceholder,
        required: true,
        requiredLength: 1,
        type: 'chip'
    },
    {
        Component: ToggableInput,
        label: textProvider?.textInputLabel,
        multiline: true,
        name: 'text-input',
        placeholder: textProvider?.textInputPlaceholder
    },
    {
        Component: ToggablePicker,
        label: textProvider?.pickerInputLabel,
        name: 'picker',
        onFileChange: (value) => value,
        onRemoveFile: () => setFormValues((oldValues) => ({ ...oldValues, picker: '' }))
    },
    {
        Component: ToggableSelect,
        label: textProvider?.selectInputLabel,
        name: 'select',
        options: [
            { title: textProvider?.selectOptionOneTitle, value: textProvider?.selectOptionOneTitle },
            { title: textProvider?.selectOptionTwoTitle, value: textProvider?.selectOptionTwoTitle }
        ]
    },
    {
        Component: ToggableSelect,
        label: textProvider?.selectMultipleInputLabel,
        multiple: true,
        name: 'multiple-select',
        options: [
            { title: textProvider?.selectOptionOneTitle, value: textProvider?.selectOptionOneTitle },
            { title: textProvider?.selectOptionTwoTitle, value: textProvider?.selectOptionTwoTitle }
        ],
        type: 'location'
    }
];

const tags = [
    { url: 'https://www.something.com/', text: 'Tag1' },
    { url: 'https://www.something.com/', text: 'Tag2' },
    { url: 'https://www.something.com/', text: 'Tag3' },
    { url: 'https://www.something.com/', text: 'Tag4' }
];

const HomePage = () => {
    const dispatch = useDispatch();

    const currentTheme = useSelector(({ ui }) => ui.theme);
    const appInformation = useSelector(({ ui }) => ui.appInformation);
    const textProvider = useSelector(({ ui }) => ui.textContent.homePage);

    const [IsImageModalOpen, setIsImageModalOpen] = useState(false);
    const [isReportModalOpen, setIsReportModalOpen] = useState(false);
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

    const [formValues, setFormValues] = useState({
        'text-input': '',
        'array-input': '',
        'autocomplete-input': [{ title: textProvider?.selectOptionOneTitle }],
        picker: '',
        select: '',
        'multiple-select': []
    });

    const cardItem = {
        logo: parsePath(appInformation?.appLogo),
        internalURI: '/some-path',
        category: { title: textProvider?.cardCategory, icon: <AccessAlarm /> },
        title: textProvider?.cardTitle,
        abstract: textProvider?.cardAbstract,
        url: 'https://externallink.com/',
        btnText: textProvider?.cardBtnText
    };

    useEffect(() => {
        dispatch(showMessage({ message: textProvider?.normalToastMessage }));
        setTimeout(() => {
            dispatch(showMessage({ message: textProvider?.successToastMessage, variant: 'success' }));
        }, 2200);
        setTimeout(() => {
            dispatch(showMessage({ message: textProvider?.infoToastMessage, variant: 'info' }));
        }, 4200);
        setTimeout(() => {
            dispatch(showMessage({ message: textProvider?.warningToastMessage, variant: 'warning' }));
        }, 6200);
        setTimeout(() => {
            dispatch(showMessage({ message: textProvider?.errorToastMessage, variant: 'error' }));
        }, 8200);
        // eslint-disable-next-line
    }, [dispatch, textProvider]);

    const toggleTheme = () => {
        if (currentTheme === 'light') return dispatch(themeDark());
        dispatch(themeLight());
    };

    const handleMantainanceMode = () => {
        dispatch(mantainanceModeEnabled());
        setTimeout(() => {
            dispatch(mantainanceModeDisabled());
        }, 5000);
    };

    return (
        <Container component="main" maxWidth="md" style={{ minHeight: '100vh' }}>
            <Title title={textProvider?.title} subtitle={textProvider?.subtitle} subtitleSize="large" />
            <Typography variant="body1" style={{ textAlign: 'center', margin: '1rem 0' }}>
                {textProvider?.documentationInfo}{' '}
                <a href={appInformation?.repositoryUrl} target="_blank" rel="noreferrer">
                    {appInformation?.repositoryUrl}
                </a>
            </Typography>
            <Title title={textProvider?.smallTitle} size="small" subtitle={textProvider?.smallSubtitle} />
            <Typography variant="body1">{textProvider?.darkModeLabel}</Typography>
            <Switch checked={currentTheme === 'dark'} onClick={toggleTheme} />
            <Typography variant="body1">{textProvider?.mantainanceLabel}</Typography>
            <Switch onClick={handleMantainanceMode} />

            <SearchInput />
            <ResultsHeader style={{ margin: '20px 0' }} />
            <ResultsHeader
                changePage={(page) => alert(`${textProvider?.changingPageMessage}: ${page}`)}
                style={{ margin: '20px 0' }}
                pagination={{
                    currentPage: 1,
                    firstIndex: 1,
                    firstPage: 1,
                    lastIndex: 2,
                    lastPage: 1,
                    nextPage: 0,
                    previousPage: 0,
                    totalResults: 2
                }}
                viewMode="list"
            />
            <Grid spacing={2} container style={{ marginTop: '20px' }} justifyContent="center">
                <Grid item xs={12} sm={4}>
                    <ItemCard item={cardItem} />
                </Grid>
                <Grid item xs={12} sm={8}>
                    <ItemHorizontal item={cardItem} />
                </Grid>

                <Grid container item xs={12} sm={6} md={4} justifyContent="center" spacing={4}>
                    <Grid item xs={12} sm={8}>
                        <Loader style={{ height: '150px' }} />
                    </Grid>
                    <Grid item xs={12} sm={8}>
                        <Button fullWidth>{textProvider?.primaryButton}</Button>
                    </Grid>
                    <Grid item xs={12} sm={8}>
                        <Button color="secondary" fullWidth>
                            {textProvider?.secondaryButton}
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={8}>
                        <Button fullWidth variant="outlined">
                            {textProvider?.outlinedButton}
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={8}>
                        <Button fullWidth color="danger">
                            {textProvider?.dangerButton}
                        </Button>
                    </Grid>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                    <Typography variant="h2" className="fs-700">
                        {textProvider?.aSectionTitle}
                    </Typography>
                    <TitleDecoration style={{ marginBottom: '20px' }} />
                    <Button onClick={() => setIsReportModalOpen(true)} fullWidth>
                        {textProvider?.reportModalButton}
                    </Button>
                    <Button
                        style={{ margin: '2rem 0' }}
                        color="secondary"
                        onClick={() => setIsImageModalOpen(true)}
                        fullWidth
                    >
                        {textProvider?.imageModalButton}
                    </Button>
                    <Button
                        style={{ marginBottom: '2rem' }}
                        color="danger"
                        onClick={() => setIsConfirmationModalOpen(true)}
                        fullWidth
                    >
                        {textProvider?.confirmationModalButton}
                    </Button>
                    <Grid container justifyContent="center" item xs={12} sm={8}>
                        <SmallCard icon={<AccessAlarm />} title={textProvider?.smallCardTitle} url="/some-path" />
                    </Grid>
                    <Grid container justifyContent="center" item xs={12} sm={8}>
                        <SmallCard title={textProvider?.smallCardNoIconTitle} url="/some-path" />
                    </Grid>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                    <SimpleCard title={textProvider?.simpleCardTitle} icon={<AccessAlarm />} btnText="Button" />
                    <SimpleCard title={textProvider?.simpleCardNoButtonTitle} icon={<AccessAlarm />} />
                </Grid>
            </Grid>

            <ReportItemModal open={isReportModalOpen} onClose={() => setIsReportModalOpen(false)} />

            <ConfirmationModal open={isConfirmationModalOpen} onClose={() => setIsConfirmationModalOpen(false)} />

            <ImageModal
                imageUrl={parsePath(appInformation?.appLogo)}
                open={IsImageModalOpen}
                onClose={() => setIsImageModalOpen(false)}
            />

            <Grid spacing={4} container style={{ marginTop: '60px' }} justifyContent="center">
                <Grid item xs={12}>
                    <Breadcrumb
                        currentPgTitle={textProvider?.newPageTitle}
                        currentPgIcon={<AccessAlarm />}
                        parentPgLink="#"
                        parentPgTitle={textProvider?.newPageParentPage}
                        divider="/"
                    />
                </Grid>
            </Grid>

            <Grid spacing={4} container style={{ marginTop: '60px' }} justifyContent="center">
                <Grid item xs={10} md={4}>
                    <WidgetWrapper>
                        <TagsWidget title={textProvider?.tagsWidgetTitle} tagList={tags} />
                        <CheckboxWidget
                            title={textProvider?.checkboxWidgetTitle}
                            items={checkboxes}
                            style={{ marginTop: '2rem' }}
                        />
                    </WidgetWrapper>
                </Grid>
                <Grid item xs={10} md={4}>
                    <LoginForm />
                    <Paper style={{ padding: '1rem 2rem', marginTop: '2rem' }}>
                        <AuthUserCard items={[{ title: textProvider?.authUserProfileTitle, path: '/' }]} />
                        <AuthUserSmallCard onClick={() => setIsImageModalOpen(true)} />
                    </Paper>
                </Grid>
                <Grid item xs={10} md={4}>
                    <SignupForm />
                </Grid>
            </Grid>

            <Grid spacing={2} container style={{ marginTop: '60px' }} justifyContent="center">
                <Grid item xs={10} md={6}>
                    <AuthCard form="login" />
                    <ContentCard style={{ marginTop: '2rem' }} title={textProvider?.cardWithTextContentTitle}>
                        <p>
                            Cursus ipsum accumsan urna placerat ac amet sollicitudin accumsan proin eget lorem fusce eu
                            sollicitudin erat magna nunc felis sem quam adipiscing dolor nisl ut.
                        </p>
                    </ContentCard>
                </Grid>
                <Grid item xs={10} md={6}>
                    <FormCard
                        inputFields={inputFields(setFormValues, textProvider)}
                        onSubmit={(values) => setFormValues((oldValues) => ({ ...oldValues, ...values }))}
                        title={textProvider?.formWithToggableInputsTitle}
                        values={formValues}
                    />
                </Grid>
            </Grid>

            <Grid spacing={2} container style={{ marginTop: '60px' }} justifyContent="center">
                <Grid item xs={10} md={6}>
                    {/* <Form values={{}} /> */}
                </Grid>
                <Grid item xs={10} md={6}></Grid>
            </Grid>
        </Container>
    );
};

export default HomePage;
