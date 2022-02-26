import { useState, Suspense } from 'react';
import { Prompt, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import clsx from 'clsx';
import { updateUserInformation } from 'auth/store/userSlice';
import firebaseService from 'services/firebaseService';

import { green } from '@material-ui/core/colors';
import { Edit as EditIcon } from '@material-ui/icons';
import {
    Avatar,
    Container,
    Divider,
    Fab,
    Icon,
    IconButton,
    makeStyles,
    Tab,
    Tabs,
    Typography
} from '@material-ui/core';

import { ConfirmationModal, KeyInfoTab, OtherGeneralTab } from 'custom-components';

import defaultBgImage from 'assets/images/header-bg.png';
import fallBackProfileImage from 'assets/images/profile.jpg';
import { parsePath } from 'utils/helpers';

function ProfilePage() {
    const dispatch = useDispatch();

    const [isDataChanged, setIsDataChanged] = useState(false);
    const [isPromtOpen, setIsPromtOpen] = useState(false);
    const [loading, setLoading] = useState(null);
    const [selectedTab, setSelectedTab] = useState(0);
    const [tabToMove, setTabToMove] = useState(0);

    const textProvider = useSelector(({ ui }) => ui.textContent.profilePage);
    const user = useSelector(({ auth }) => auth?.user?.data);

    const useStyles = makeStyles((theme) => ({
        avatar: {
            border: `4px solid ${theme.palette.background.default}`,
            marginTop: '-50px',
            width: '100px',
            height: '100px'
        },
        bgImageLabel: {
            position: 'absolute',
            right: '20px',
            top: '10px',
            zIndex: 10
        },
        editButton: {
            backgroundColor: theme.palette.type === 'light' ? '#DDDDDD' : '#333333',
            color: theme.palette.type === 'light' ? '#333333' : '#DDDDDD'
        },
        hiddenInput: {
            position: 'absolute',
            zIndex: 10,
            opacity: 0,
            cursor: 'pointer',
            display: 'block',
            width: '100%',
            height: '100%'
        },
        incompleteProfile: {
            margin: '0 2rem 2rem 2rem',
            color: theme.palette.error.main
        },
        profileImageLabel: {
            position: 'absolute',
            right: 0,
            bottom: 0,
            zIndex: 10
        },
        profileInformation: {
            width: '100%',
            padding: '0 24px',
            paddingBottom: '24px',
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            alignItems: 'center',
            [theme.breakpoints.up('md')]: {
                flexDirection: 'row'
            }
        },
        profileEmail: {
            [theme.breakpoints.up('md')]: {
                padding: '0 16px'
            }
        },
        profileName: {
            display: 'flex',
            alignItems: 'center',
            [theme.breakpoints.up('md')]: {
                padding: '8px 16px 0 16px'
            },
            '& .MuiTypography-h4': {
                fontSize: '24px',
                fontWeight: '600',
                marginRight: '16px',
                [theme.breakpoints.up('md')]: {
                    fontSize: '32px'
                }
            }
        },
        profileNameWrapper: {
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            alignItems: 'center',
            justifyContent: 'space-between',
            textAlign: 'center',
            [theme.breakpoints.up('md')]: {
                textAlign: 'left',
                flexDirection: 'row'
            }
        },
        tab: {
            fontSize: '14px',
            fontWeight: 600,
            minHeight: '40px',
            minWidth: '64px',
            margin: '0 16px'
        },
        tabsDivider: {
            width: '100%',
            height: '100%',
            borderRadius: '1000px',
            opacity: 0.5
        },
        tabsIndicator: {
            display: 'flex',
            justifyContent: 'center',
            background: 'transparent',
            width: '100%',
            height: '100%'
        },
        tabsWrapper: {
            width: '100%',
            padding: '0 16px',
            minHeight: '40px',
            '& .MuiTabs-flexContainer': {
                justifyContent: 'center',
                [theme.breakpoints.up('sm')]: {
                    justifyContent: 'flex-start'
                }
            }
        },
        topBg: (props) => ({
            position: 'relative',
            height: '120px',
            background: `url("${props.bg}")!important`,
            backgroundSize: 'cover!important',
            backgroundPosition: 'center center!important'
        }),
        layoutHeader: {
            background: 'none',
            height: 320,
            minHeight: 320,
            [theme.breakpoints.down('md')]: {
                height: 240,
                minHeight: 240
            }
        }
    }));

    const classes = useStyles({
        bg: loading === 'bg' ? `${process.env.PUBLIC_URL}/assets/images/spinners/loading.gif` : defaultBgImage
    });

    function handleTabChange(event, value) {
        if (isDataChanged && event !== 'force') {
            setTabToMove(value);
            return setIsPromtOpen(true);
        }
        setSelectedTab(value);
    }

    async function handleFileChange(e, type) {
        try {
            if (e.target.files[0]) {
                setLoading(type);
                const imgToLoad = e.target.files[0];
                const uploadedPicture = await firebaseService.uploadPicture(imgToLoad);
                onSubmit(uploadedPicture, type);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(null);
        }
    }

    const onSubmit = async (values, type) => {
        let updatedUser = { ...user.data };
        if (type && type === 'bg') {
            updatedUser = { ...updatedUser, bgURL: values };
        } else {
            updatedUser = { ...updatedUser, photoURL: values };
        }
        dispatch(updateUserInformation(updatedUser));
    };

    return (
        <div>
            <Prompt when={isDataChanged} message={() => textProvider.unsavedChangesMessage} />

            <ConfirmationModal
                actionText={textProvider.unsavedChangesActionBtn}
                confirmationType=""
                open={isPromtOpen}
                onClose={() => setIsPromtOpen(false)}
                onSubmit={() => {
                    setIsPromtOpen(false);
                    setIsDataChanged(false);
                    handleTabChange('force', tabToMove);
                }}
                message={textProvider.unsavedChangesMessage}
            />

            <header>
                <form className={classes.topBg}>
                    {/* <label htmlFor="photoURL" className={classes.bgImageLabel}>
                    <input
                        onChange={(value) => handleFileChange(value, 'bg')}
                        id="photoURL"
                        name="photoURL"
                        className={classes.hiddenInput}
                        accept="image/*"
                        type="file"
                    />
                    <Fab className={classes.editButton} size="small" aria-label="edit">
                        <EditIcon />
                    </Fab>
                </label> */}
                </form>
            </header>

            <Container component="main" maxWidth="lg">
                <div className={classes.profileInformation}>
                    <div>
                        <Avatar className={clsx(classes.avatar)} src={user.photoURL || fallBackProfileImage} />
                        <form style={{ position: 'relative' }}>
                            <label htmlFor="photoURL" className={classes.profileImageLabel}>
                                <input
                                    onChange={(value) => handleFileChange(value, 'profile')}
                                    id="photoURL"
                                    name="photoURL"
                                    className={classes.hiddenInput}
                                    accept="image/*"
                                    type="file"
                                />
                                <Fab className={classes.editButton} size="small" aria-label="edit">
                                    <EditIcon />
                                </Fab>
                            </label>
                        </form>
                    </div>
                    <div className={classes.profileNameWrapper}>
                        <div>
                            <div className={classes.profileName}>
                                <Typography variant="h2" className="fs-500" color="inherit">
                                    {user?.displayName}
                                </Typography>
                                {user?.isApproved && (
                                    <Icon fontSize="large" style={{ color: green[500] }}>
                                        check_circle_outline_rounded
                                    </Icon>
                                )}
                            </div>
                            <Typography className={classes.profileEmail} variant="body1" color="textSecondary">
                                {user?.work?.occupation || user?.email}
                            </Typography>
                        </div>
                    </div>
                    <Link to={parsePath('/settings')}>
                        <IconButton>
                            <Icon>settings_outlined</Icon>
                        </IconButton>
                    </Link>
                </div>

                <Tabs
                    value={selectedTab}
                    onChange={handleTabChange}
                    indicatorColor="primary"
                    textColor="inherit"
                    variant="scrollable"
                    scrollButtons="off"
                    className={classes.tabsWrapper}
                    classes={{ indicator: classes.tabsIndicator }}
                    TabIndicatorProps={{
                        children: <Divider className={classes.tabsDivider} />
                    }}
                >
                    <Tab className={classes.tab} disableRipple label={textProvider.otherTab.generalInformation.title} />
                    <Tab className={classes.tab} disableRipple label={textProvider.otherTab.title} />
                </Tabs>
                <Suspense fallback={<loading />}>
                    <div>{selectedTab === 0 && <KeyInfoTab setIsDataChanged={setIsDataChanged} user={user} />}</div>
                    <div>
                        {selectedTab === 1 && <OtherGeneralTab setIsDataChanged={setIsDataChanged} user={user} />}
                    </div>
                </Suspense>
            </Container>
        </div>
    );
}

export default ProfilePage;
