import React from 'react';
import { makeStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
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
        padding: '20px 20px',
        '& .generic-nav': {
            display: 'flex',
            justifyContent: 'center',
            '& li div': {
                display: 'block',
                color: theme.palette.primary.main,
                marginRight: '4px',
                fontSize: '20px',
                width: '40px',
                height: '40px',
                backgroundColor: 'rgba(255, 107, 107, 0.1)',
                lineHeight: '39px',
                textAlign: 'center',
                borderRadius: '50%',
                cursor: 'pointer',
                '&.active': {
                    backgroundColor: theme.palette.primary.main,
                    color: '#fff'
                }
            }
        },
        '& .showing__text': {
            textAlign: 'center',
            flex: 5,
            color: '#808996'
        },

        '& .generic-nav li a': {
            backgroundColor: theme.palette.primary.main,
            color: '#fff',
            '&.active': {
                background: 'rgba(255, 107, 107, 0.1)',
                color: theme.palette.primary.main
            }
        }
    },
    viewModeBtn: {
        '&:focus': {
            outline: 'none'
        }
    }
}));

function ResultsHeader({
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
        <>
            <Grid className={classes.root} item xs={12}>
                <p className="showing__text text-left">
                    Showing {pagination.firstIndex} to {pagination.lastIndex} of {pagination.totalResults} entries
                </p>
                {viewMode && (
                    <ul className="generic-nav">
                        <li>
                            <IconButton className={classes.viewModeBtn} onClick={onListViewClick}>
                                <ListIcon fontSize="large" color={viewMode === 'list' ? 'primary' : 'default'} />
                            </IconButton>
                        </li>
                        <li>
                            <IconButton className={classes.viewModeBtn} onClick={onGridViewClick}>
                                <ViewModuleIcon fontSize="large" color={viewMode === 'grid' ? 'primary' : 'default'} />
                            </IconButton>
                        </li>
                    </ul>
                )}
            </Grid>
        </>
    );
}

export default ResultsHeader;
