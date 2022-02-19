import React from 'react';
import { Link } from 'react-router-dom';

import { makeStyles, Typography } from '@material-ui/core';

import { TitleDecoration } from 'custom-components';

const useStyles = makeStyles((theme) => ({
    root: {
        '& ul': {
            marginTop: '2rem',
            '& li': {
                display: 'inline-block',
                textTransform: 'capitalize',
                margin: '5px',
                fontWeight: 500,
                '& a': {
                    border: '1px solid rgba(128, 137, 150, 0.2)',
                    color: 'inherit',
                    borderRadius: '4px',
                    transition: 'all 0.2s',
                    padding: '3px 10px'
                },
                '&:hover a': {
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.background.default,
                    borderColor: theme.palette.primary.main
                }
            }
        }
    }
}));

function TagsWidget({ title, tagList }) {
    const classes = useStyles();

    return (
        <>
            <div className={classes.root}>
                <Typography variant="h5">{title}</Typography>
                <TitleDecoration />
                <ul>
                    {tagList?.map((item, i) => {
                        return (
                            <li key={i}>
                                <Link to={item.url}>{item.text}</Link>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </>
    );
}

export default TagsWidget;
