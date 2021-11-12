import React from 'react';
import { makeStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ListIcon from '@material-ui/icons/List';
import ViewModuleIcon from '@material-ui/icons/ViewModule';

const useStyles = makeStyles((theme) => ({
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
    viewModeBtn: {
        '&:focus': {
            outline: 'none'
        }
    }
}));

function ResultsHeader({
    className,
    style,
    id,
    pagination = {
        firstIndex: 0,
        lastIndex: 0,
        totalResults: 0
    },
    viewMode,
    onListViewClick = () => {},
    onGridViewClick = () => {}
}) {
    const classes = useStyles();

    return (
        <div className={className} id={id} style={style}>
            <Grid container className={classes.root} item xs={12}>
                <Grid item xs={viewMode ? 6 : 12}>
                    <Typography variant="body1" color="textSecondary">
                        Showing {pagination.firstIndex} to {pagination.lastIndex} of {pagination.totalResults} entries
                    </Typography>
                </Grid>
                {viewMode && (
                    <Grid container item xs={6} justifyContent="flex-end">
                        <IconButton className={classes.viewModeBtn} onClick={onListViewClick}>
                            <ListIcon fontSize="large" color={viewMode === 'list' ? 'primary' : 'default'} />
                        </IconButton>
                        <IconButton className={classes.viewModeBtn} onClick={onGridViewClick}>
                            <ViewModuleIcon fontSize="large" color={viewMode === 'grid' ? 'primary' : 'default'} />
                        </IconButton>
                    </Grid>
                )}
            </Grid>
        </div>
    );
}

export default ResultsHeader;
