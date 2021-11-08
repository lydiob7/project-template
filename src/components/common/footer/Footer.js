import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Copyright from './Copyright';
import CopyrightMenu from './CopyrightMenu';
import SocialProfile from 'components/other/account/SocialProfile';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: '8vh',
        marginBottom: '2vh'
    }
}));

function Footer() {
    const classes = useStyles();
    const sectiondata = useSelector(({ ui }) => ui.textContent);

    return (
        <footer className={classes.root}>
            <Container maxWidth="lg">
                <Grid container justifyContent="space-between" alignItems="center">
                    <Grid item sm={12} md={5}>
                        <Copyright
                            rightsOwner={sectiondata.general.creator}
                            rightsOwnerWebsite={sectiondata.general.creatorWebsite}
                        />
                    </Grid>
                    <Grid item sm={12} md={4}>
                        <CopyrightMenu menus={sectiondata.footerdata.copyright.menus} />
                    </Grid>
                    <Grid item sm={12} md={3}>
                        <SocialProfile socials={sectiondata.footerdata.sociallinks} />
                    </Grid>
                </Grid>
            </Container>
        </footer>
    );
}

export default Footer;
