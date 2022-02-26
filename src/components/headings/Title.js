import React from 'react';
import clsx from 'clsx';

import { Box, makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        color: theme.palette.text.primary,
        marginTop: '2vh'
    },
    title: {
        textTransform: 'capitalize',
        marginBottom: 0,
        fontWeight: '700',
        textAlign: 'center'
    },
    subTitle: {
        marginTop: '15px',
        maxWidth: '700px',
        lineHeight: 'inherit',
        textAlign: 'center'
    }
}));

export default function Title({ className, heading = 'h2', title, size, subtitle, subtitleSize, style, ...props }) {
    const internalClasses = useStyles();

    return (
        <div className={clsx(internalClasses.root, className)} style={style} {...props}>
            <Box>
                <Typography
                    variant={heading}
                    className={clsx(internalClasses.title, size === 'small' ? 'fs-700' : 'fs-900')}
                >
                    {title}
                </Typography>
                {subtitle && (
                    <Typography
                        variant="body1"
                        color="textSecondary"
                        className={clsx(internalClasses.subTitle, subtitleSize === 'large' ? 'fs-300' : 'fs-200')}
                    >
                        {subtitle}
                    </Typography>
                )}
            </Box>
        </div>
    );
}
