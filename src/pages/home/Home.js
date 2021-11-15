import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { themeDark, themeLight, mantainanceModeEnabled, mantainanceModeDisabled } from 'store/ui';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Switch from '@material-ui/core/Switch';
import { AccessAlarm } from '@material-ui/icons';

import Title from 'components/headings/Title';
import TitleDecoration from 'components/headings/TitleDecoration';
import Button from 'components/common/Button';
import SearchInput from 'components/forms/SearchInput';
import ResultsHeader from 'components/common/ResultsHeader';
import ItemCard from 'components/cards/ItemCard';
import ItemHorizontal from 'components/cards/ItemHorizontal';
import SimpleCard from 'components/cards/SimpleCard';
import SmallCard from 'components/cards/SmallCard';
import Loader from 'components/common/Loader';
import ReportItemModal from 'components/modals/ReportItemModal';
import ConfirmationModal from 'components/modals/ConfirmationModal';
import WidgetWrapper from 'components/widgets/WidgetWrapper';
import TagsWidget from 'components/widgets/TagsWidget';
import CheckboxWidget from 'components/widgets/CheckboxWidget';
import LoginForm from 'components/forms/LoginForm';
import SignupForm from 'components/forms/SignupForm';
import AuthCard from 'components/cards/AuthCard';

const cardItem = {
    logo: '/images/ss-web-36.svg',
    internalURI: '/some-path',
    category: { title: 'Category', icon: <AccessAlarm /> },
    title: 'Card',
    abstract:
        'Some description for the card. Cras ultricies ligula sed magna dictum porta. Quisque velit nisi, pretium ut lacinia in, elementum id enim.',
    url: 'https://externallink.com/',
    btnText: 'Go go go'
};

const tags = [
    { url: 'https://www.something.com/', text: 'Tag1' },
    { url: 'https://www.something.com/', text: 'Tag2' },
    { url: 'https://www.something.com/', text: 'Tag3' },
    { url: 'https://www.something.com/', text: 'Tag4' }
];

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

const Home = () => {
    const dispatch = useDispatch();
    const currentTheme = useSelector(({ ui }) => ui.theme);

    const [reportModalOpen, setReportModalOpen] = useState(false);
    const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);

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
            <Title title="Home page" subtitle="This is a small description of the page." />
            <Typography variant="body1">Theme mode (work in progress)</Typography>
            <Switch onClick={toggleTheme} />
            <Typography variant="body1">
                Mantainance mode (this will be automatically turned off after 5 seconds, it can be turned on/off from a
                backend)
            </Typography>
            <Switch onClick={handleMantainanceMode} />
            <SearchInput />
            <ResultsHeader style={{ margin: '20px 0' }} />
            <ResultsHeader
                style={{ margin: '20px 0' }}
                pagination={{
                    firstIndex: 1,
                    lastIndex: 2,
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
                <Grid item xs={12} sm={6} md={4}>
                    <SimpleCard title="Simple Card" icon={<AccessAlarm />} btnText="Button" />
                    <SimpleCard title="Simple Card without button" icon={<AccessAlarm />} />
                </Grid>
                <Grid container item xs={12} sm={6} md={4} justifyContent="center" spacing={4}>
                    <Grid container justifyContent="center" item xs={12} sm={8}>
                        <SmallCard icon={<AccessAlarm />} title="Small card" url="/some-path" />
                    </Grid>
                    <Grid container justifyContent="center" item xs={12} sm={8}>
                        <SmallCard title="Small card without icon" url="/some-path" />
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
                    <Button onClick={() => setReportModalOpen(true)} fullWidth>
                        Report Modal
                    </Button>
                    <Button
                        style={{ margin: '2rem 0' }}
                        color="danger"
                        onClick={() => setConfirmationModalOpen(true)}
                        fullWidth
                    >
                        Confirmation Modal
                    </Button>
                    <Loader style={{ height: '150px' }} />
                </Grid>
            </Grid>

            <ReportItemModal open={reportModalOpen} onClose={() => setReportModalOpen(false)} />

            <ConfirmationModal open={confirmationModalOpen} onClose={() => setConfirmationModalOpen(false)} />

            <Grid spacing={4} container style={{ marginTop: '60px' }} justifyContent="center">
                <Grid item xs={10} md={4}>
                    <WidgetWrapper>
                        <TagsWidget title="Tags Widget" tagList={tags} />
                        <CheckboxWidget title="Checkbox Widget" items={checkboxes} style={{ marginTop: '2rem' }} />
                    </WidgetWrapper>
                </Grid>
                <Grid item xs={10} md={4}>
                    <LoginForm />
                </Grid>
                <Grid item xs={10} md={4}>
                    <SignupForm />
                </Grid>
            </Grid>

            <Grid spacing={2} container style={{ marginTop: '60px' }} justifyContent="center">
                <Grid item xs={10} md={6}>
                    <AuthCard form="login" />
                </Grid>
                <Grid item xs={10} md={6}></Grid>
            </Grid>
        </Container>
    );
};

export default Home;
