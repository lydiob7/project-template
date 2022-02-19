import React from 'react';
import { useSelector } from 'react-redux';

import { Container, Grid, makeStyles } from '@material-ui/core';

import { Copyright, CopyrightMenu, SocialProfile } from 'custom-components';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '2vh 0',
        marginTop: '5vh'
    },
    container: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        [theme.breakpoints.up('md')]: {
            flexDirection: 'row',
            justifyContent: 'space-between'
        }
    }
}));

function Footer() {
    const classes = useStyles();
    const appInformation = useSelector(({ ui }) => ui.appInformation);
    const footer = useSelector(({ ui }) => ui.footer);

    if (!footer?.isVisible) return null;

    return (
        <footer className={classes.root}>
            <Container maxWidth="lg">
                <Grid className={classes.container} container>
                    <Grid item sm={12} md={5}>
                        <Copyright
                            rightsOwner={appInformation?.creator}
                            rightsOwnerWebsite={appInformation?.creatorWebsite}
                            version={process.env.REACT_APP_VERSION}
                        />
                    </Grid>
                    {footer?.isMenuItemsListVisible && (
                        <Grid item sm={12} md={4}>
                            <CopyrightMenu menus={footer?.menuItems} />
                        </Grid>
                    )}
                    {footer?.isSocialLinksListVisible && (
                        <Grid item sm={12} md={3}>
                            <SocialProfile socials={footer?.socialLinks} />
                        </Grid>
                    )}
                </Grid>
            </Container>
        </footer>
    );
}

export default Footer;
