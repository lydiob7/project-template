import { Suspense } from 'react';
import { useSelector } from 'react-redux';
import clsx from 'clsx';

import { green } from '@material-ui/core/colors';
import { Avatar, Container, Icon, makeStyles, Typography } from '@material-ui/core';

import { GeneralSettingsTab } from 'custom-components';

import defaultBgImage from 'assets/images/header-bg.png';
import fallBackProfileImage from 'assets/images/profile.jpg';

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
    topBg: {
        position: 'relative',
        height: '120px',
        background: `url("${defaultBgImage}")!important`,
        backgroundSize: 'cover!important',
        backgroundPosition: 'center center!important'
    },
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

function SettingsPage() {
    const classes = useStyles();

    const user = useSelector(({ auth }) => auth?.user?.data);

    return (
        <div>
            <header className={classes.topBg}></header>

            <Container component="main" maxWidth="lg">
                <div className={classes.profileInformation}>
                    <div>
                        <Avatar className={clsx(classes.avatar)} src={user.photoURL || fallBackProfileImage} />
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
                </div>

                <Suspense fallback={<loading />}>
                    <div>
                        <GeneralSettingsTab user={user} />
                    </div>
                </Suspense>
            </Container>
        </div>
    );
}

export default SettingsPage;
