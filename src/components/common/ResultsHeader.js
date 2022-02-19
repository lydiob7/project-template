import React from 'react';

import {
    ArrowBackIos as ArrowBackIosIcon,
    ArrowForwardIos as ArrowForwardIosIcon,
    FirstPage as FirstPageIcon,
    LastPage as LastPageIcon,
    List as ListIcon,
    ViewModule as ViewModuleIcon
} from '@material-ui/icons';
import { Grid, IconButton, makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    controlsContainer: {
        justifyContent: 'center',
        [theme.breakpoints.up('md')]: {
            justifyContent: 'flex-end'
        }
    },
    root: {
        border: '1px solid rgba(128, 137, 150, 0.2)',
        borderRadius: '4px',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        zIndex: 999,
        padding: '10px 20px',
        '& p': {
            padding: '12px'
        }
    },
    resultsText: {
        textAlign: 'center',
        [theme.breakpoints.up('md')]: {
            textAlign: 'left'
        }
    },
    viewModeBtn: {
        '&:focus': {
            outline: 'none'
        }
    }
}));

function ResultsHeader({
    className,
    changePage,
    style,
    id,
    pagination = {
        currentPage: 0,
        firstIndex: 0,
        firstPage: 0,
        lastIndex: 0,
        lastPage: 0,
        nextPage: 0,
        previousPage: 0,
        totalResults: 0
    },
    viewMode,
    onListViewClick = () => {},
    onGridViewClick = () => {}
}) {
    const classes = useStyles();

    return (
        <div className={className} id={id} style={{ flex: 1, ...style }}>
            <Grid container className={classes.root} item xs={12}>
                <Grid item xs={12} md={viewMode || changePage ? 6 : 12}>
                    <Typography className={classes.resultsText} variant="body1" color="textSecondary">
                        Showing {pagination.firstIndex} to {pagination.lastIndex} of {pagination.totalResults} entries
                    </Typography>
                </Grid>

                {changePage && (
                    <>
                        <Grid
                            container
                            item
                            xs={12}
                            sm={viewMode ? 6 : 12}
                            md={viewMode ? 4 : 6}
                            className={classes.controlsContainer}
                        >
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <div>
                                    <Typography style={{ padding: 0 }} variant="body2" color="textSecondary">
                                        Page {pagination?.currentPage || 0} of {pagination?.lastPage || 0}
                                    </Typography>
                                </div>
                                <div>
                                    <IconButton
                                        disabled={
                                            pagination?.firstPage === 0 ||
                                            pagination?.firstPage === pagination?.currentPage ||
                                            pagination.totalResults === 0
                                        }
                                        onClick={() => changePage(pagination?.firstPage)}
                                    >
                                        <FirstPageIcon />
                                    </IconButton>
                                    <IconButton
                                        disabled={pagination?.previousPage === 0 || pagination.totalResults === 0}
                                        onClick={() => changePage(pagination?.previousPage)}
                                    >
                                        <ArrowBackIosIcon style={{ fontSize: '1rem' }} />
                                    </IconButton>
                                    <IconButton
                                        disabled={pagination?.nextPage === 0 || pagination.totalResults === 0}
                                        onClick={() => changePage(pagination?.nextPage)}
                                    >
                                        <ArrowForwardIosIcon style={{ fontSize: '1rem' }} />
                                    </IconButton>
                                    <IconButton
                                        disabled={
                                            pagination?.lastPage === 0 ||
                                            pagination?.lastPage === pagination?.currentPage ||
                                            pagination.totalResults === 0
                                        }
                                        onClick={() => changePage(pagination?.lastPage)}
                                    >
                                        <LastPageIcon />
                                    </IconButton>
                                </div>
                            </div>
                        </Grid>
                    </>
                )}

                {viewMode && (
                    <Grid
                        container
                        item
                        xs={12}
                        sm={changePage ? 6 : 12}
                        md={changePage ? 2 : 6}
                        className={classes.controlsContainer}
                    >
                        <IconButton className={classes.viewModeBtn} onClick={onListViewClick}>
                            <ListIcon fontSize="large" color={viewMode === 'list' ? 'primary' : 'disabled'} />
                        </IconButton>
                        <IconButton className={classes.viewModeBtn} onClick={onGridViewClick}>
                            <ViewModuleIcon fontSize="large" color={viewMode === 'grid' ? 'primary' : 'disabled'} />
                        </IconButton>
                    </Grid>
                )}
            </Grid>
        </div>
    );
}

export default ResultsHeader;
