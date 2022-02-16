import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { themeDark, themeLight, mantainanceModeEnabled, mantainanceModeDisabled } from 'store/uiSlice';
import { showMessage } from 'store/messageSlice';

import { AccessAlarm } from '@material-ui/icons';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import AuthCard from 'components/cards/AuthCard';
import AuthUserCard from 'components/cards/AuthUserCard';
import AuthUserSmallCard from 'components/cards/AuthUserSmallCard';
import Breadcrumb from 'components/headings/Breadcrumb';
import Button from 'components/common/Button';
import CheckboxWidget from 'components/widgets/CheckboxWidget';
import ConfirmationModal from 'components/modals/ConfirmationModal';
import ContentCard from 'components/cards/ContentCard';
// import Form from 'components/forms/Form';
import FormCard from 'components/cards/FormCard';
import ImageModal from 'components/modals/ImageModal';
import ItemCard from 'components/cards/ItemCard';
import ItemHorizontal from 'components/cards/ItemHorizontal';
import Loader from 'components/common/Loader';
import LoginForm from 'components/forms/LoginForm';
import ReportItemModal from 'components/modals/ReportItemModal';
import ResultsHeader from 'components/common/ResultsHeader';
import SearchInput from 'components/forms/SearchInput';
import SignupForm from 'components/forms/SignupForm';
import SimpleCard from 'components/cards/SimpleCard';
import SmallCard from 'components/cards/SmallCard';
import Switch from 'components/common/Switch';
import TagsWidget from 'components/widgets/TagsWidget';
import Title from 'components/headings/Title';
import TitleDecoration from 'components/headings/TitleDecoration';
import ToggableArrayInput from 'components/forms/ToggableArrayInput';
import ToggableAutocomplete from 'components/forms/ToggableAutocomplete';
import ToggableInput from 'components/forms/ToggableInput';
import ToggablePicker from 'components/forms/ToggablePicker';
import ToggableSelect from 'components/forms/ToggableSelect';
import WidgetWrapper from 'components/widgets/WidgetWrapper';

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

const inputFields = (setFormValues) => [
    {
        Component: ToggableArrayInput,
        label: 'Array Input',
        name: 'array-input',
        placeholder: 'Write something',
        required: true
    },
    {
        addOption: (newOption) => console.log(newOption),
        Component: ToggableAutocomplete,
        label: 'Autocomplete Input',
        name: 'autocomplete-input',
        options: [{ title: 'First Option' }, { title: 'Second Option' }],
        placeholder: 'Add more options',
        required: true,
        requiredLength: 1,
        type: 'chip'
    },
    {
        Component: ToggableInput,
        label: 'Text Input',
        multiline: true,
        name: 'text-input',
        placeholder: 'Write something'
    },
    {
        Component: ToggablePicker,
        label: 'Picker',
        name: 'picker',
        onFileChange: (value) => value,
        onRemoveFile: () => setFormValues((oldValues) => ({ ...oldValues, picker: '' }))
    },
    {
        Component: ToggableSelect,
        label: 'Select',
        name: 'select',
        options: [
            { title: 'First Option', value: 'First Option' },
            { title: 'Second Option', value: 'Second Option' }
        ]
    },
    {
        Component: ToggableSelect,
        label: 'Select Multiple',
        multiple: true,
        name: 'multiple-select',
        options: [
            { title: 'First Option', value: 'First Option' },
            { title: 'Second Option', value: 'Second Option' }
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

    const [IsImageModalOpen, setIsImageModalOpen] = useState(false);
    const [isReportModalOpen, setIsReportModalOpen] = useState(false);
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

    const [formValues, setFormValues] = useState({
        'text-input': '',
        'array-input': '',
        'autocomplete-input': [{ title: 'First Option' }],
        picker: '',
        select: '',
        'multiple-select': []
    });

    const cardItem = {
        logo: parsePath(appInformation?.appLogo),
        internalURI: '/some-path',
        category: { title: 'Category', icon: <AccessAlarm /> },
        title: 'Card',
        abstract:
            'Some description for the card. Cras ultricies ligula sed magna dictum porta. Quisque velit nisi, pretium ut lacinia in, elementum id enim.',
        url: 'https://externallink.com/',
        btnText: 'Go go go'
    };

    useEffect(() => {
        dispatch(showMessage({ message: 'Normal Message' }));
        setTimeout(() => {
            dispatch(showMessage({ message: 'Success Message', variant: 'success' }));
        }, 2200);
        setTimeout(() => {
            dispatch(showMessage({ message: 'Info Message', variant: 'info' }));
        }, 4200);
        setTimeout(() => {
            dispatch(showMessage({ message: 'Warning Message', variant: 'warning' }));
        }, 6200);
        setTimeout(() => {
            dispatch(showMessage({ message: 'Error Message', variant: 'error' }));
        }, 8200);
    }, [dispatch]);

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
        <Container maxWidth="md" style={{ minHeight: '100vh' }}>
            <Title
                title="Title"
                subtitle="These are all the components available on this library."
                subtitleSize="large"
            />
            <Typography variant="body1" style={{ textAlign: 'center', margin: '1rem 0' }}>
                For documentation go to{' '}
                <a href={appInformation?.repositoryUrl} target="_blank" rel="noreferrer">
                    {appInformation?.repositoryUrl}
                </a>
            </Typography>
            <Title
                title="Smaller title"
                size="small"
                subtitle="This is a slightly smaller description than the one before."
            />
            <Typography variant="body1">Dark mode</Typography>
            <Switch checked={currentTheme === 'dark'} onClick={toggleTheme} />
            <Typography variant="body1">
                Mantainance mode (this will be automatically turned off after 5 seconds, it can be turned on/off from a
                backend)
            </Typography>
            <Switch onClick={handleMantainanceMode} />

            <SearchInput />
            <ResultsHeader style={{ margin: '20px 0' }} />
            <ResultsHeader
                changePage={(page) => alert(`You are moving to page: ${page}`)}
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
                        <Button fullWidth>Primary Button</Button>
                    </Grid>
                    <Grid item xs={12} sm={8}>
                        <Button color="secondary" fullWidth>
                            Secondary Button
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={8}>
                        <Button fullWidth variant="outlined">
                            Outlined Button
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={8}>
                        <Button fullWidth color="danger">
                            Danger Button
                        </Button>
                    </Grid>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                    <Typography variant="h4">A Section Title</Typography>
                    <TitleDecoration style={{ marginBottom: '20px' }} />
                    <Button onClick={() => setIsReportModalOpen(true)} fullWidth>
                        Report Modal
                    </Button>
                    <Button
                        style={{ margin: '2rem 0' }}
                        color="secondary"
                        onClick={() => setIsImageModalOpen(true)}
                        fullWidth
                    >
                        Image Modal
                    </Button>
                    <Button
                        style={{ marginBottom: '2rem' }}
                        color="danger"
                        onClick={() => setIsConfirmationModalOpen(true)}
                        fullWidth
                    >
                        Confirmation Modal
                    </Button>
                    <Grid container justifyContent="center" item xs={12} sm={8}>
                        <SmallCard icon={<AccessAlarm />} title="Small card" url="/some-path" />
                    </Grid>
                    <Grid container justifyContent="center" item xs={12} sm={8}>
                        <SmallCard title="Small card without icon" url="/some-path" />
                    </Grid>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                    <SimpleCard title="Simple Card" icon={<AccessAlarm />} btnText="Button" />
                    <SimpleCard title="Simple Card without button" icon={<AccessAlarm />} />
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
                        currentPgTitle="new page"
                        currentPgIcon={<AccessAlarm />}
                        parentPgLink="#"
                        parentPgTitle="parent page"
                        divider="/"
                    />
                </Grid>
            </Grid>

            <Grid spacing={4} container style={{ marginTop: '60px' }} justifyContent="center">
                <Grid item xs={10} md={4}>
                    <WidgetWrapper>
                        <TagsWidget title="Tags Widget" tagList={tags} />
                        <CheckboxWidget title="Checkbox Widget" items={checkboxes} style={{ marginTop: '2rem' }} />
                    </WidgetWrapper>
                </Grid>
                <Grid item xs={10} md={4}>
                    <LoginForm />
                    <Paper style={{ padding: '1rem 2rem', marginTop: '2rem' }}>
                        <AuthUserCard items={[{ title: 'Profile', path: '/' }]} />
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
                    <ContentCard style={{ marginTop: '2rem' }} title="Card with text content">
                        <p>
                            Cursus ipsum accumsan urna placerat ac amet sollicitudin accumsan proin eget lorem fusce eu
                            sollicitudin erat magna nunc felis sem quam adipiscing dolor nisl ut.
                        </p>
                    </ContentCard>
                </Grid>
                <Grid item xs={10} md={6}>
                    <FormCard
                        inputFields={inputFields(setFormValues)}
                        onSubmit={(values) => setFormValues((oldValues) => ({ ...oldValues, ...values }))}
                        title="Form with toggable inputs"
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
