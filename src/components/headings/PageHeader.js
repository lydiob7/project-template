import React, { useState } from 'react';

import { Container, Divider, Grid, makeStyles, Typography } from '@material-ui/core';
import { OutlinedFlagRounded as OutlinedFlagRoundedIcon } from '@material-ui/icons';

import { Button, ReportItemModal } from 'custom-components';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: 'calc(80px + 100px) 0 100px 0',
        position: 'relative',
        zIndex: 1,
        color: theme.palette.text.primary,
        overflow: 'hidden',
        [theme.breakpoints.up('sm')]: {
            padding: 'calc(80px + 80px) 0 80px 0'
        }
    },
    button: {
        margin: '0 10px'
    }
}));

function PageHeader({
    categories,
    title,
    abstract,
    websiteURL,
    primaryBtn = true,
    primaryBtnText = 'Visit Website',
    secondaryBtn = true,
    secondaryBtnText = 'Report'
}) {
    const classes = useStyles();

    const [modalOpened, setModalOpened] = useState(false);

    const handleReportSubmit = (ev) => {
        console.log(ev.target?.values);
    };

    return (
        <>
            <header className={classes.root}>
                <div className="breadcrumb-wrap">
                    <Container maxWidth="lg">
                        <Grid container spacing={4} alignItems="center">
                            <Grid item xs={12} md={9}>
                                {categories && categories[0] && (
                                    <Typography variant="body1">{categories[0].title}</Typography>
                                )}
                                <Typography variant="h3">{title}</Typography>

                                <Typography variant="body1">{abstract}</Typography>
                            </Grid>
                            <Grid item xs={12} md={3}>
                                {primaryBtn && (
                                    <Button className={classes.button} href={websiteURL} target="_blank">
                                        {primaryBtnText}
                                    </Button>
                                )}

                                {secondaryBtn && (
                                    <Button
                                        className={classes.button}
                                        onClick={() => setModalOpened(true)}
                                        variant="outlined"
                                        color="secondary"
                                    >
                                        <i>
                                            <OutlinedFlagRoundedIcon />
                                        </i>{' '}
                                        {secondaryBtnText}
                                    </Button>
                                )}
                            </Grid>
                        </Grid>
                    </Container>
                </div>

                <ReportItemModal
                    open={modalOpened}
                    onClose={() => setModalOpened(false)}
                    onSubmit={handleReportSubmit}
                />
            </header>
            <Divider />
        </>
    );
}

export default PageHeader;
