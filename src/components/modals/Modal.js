import React from 'react';
import clsx from 'clsx';

import { Container, IconButton, makeStyles, Paper, Typography } from '@material-ui/core';

import { Close as CloseIcon, ExpandLess as ExpandLessIcon, Minimize as MinimizeIcon } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    blink: {
        animation: '$blink 1.8s infinite',
        '& .MuiSvgIcon-root': {
            animation: '$blink 1.8s infinite'
        }
    },
    dialogControlBtns: {
        position: 'absolute',
        top: '0',
        right: '40px',
        zIndex: '9999',
        [theme.breakpoints.up('md')]: {
            top: '20px'
        }
    },
    minimizedBox: {
        position: 'fixed',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 20px',
        minWidth: '200px',
        maxWidth: '300px',
        bottom: '0',
        left: '50%',
        backgroundColor: theme.palette.secondary.dark,
        cursor: 'pointer',
        transform: 'translateX(-50%)',
        [theme.breakpoints.up('md')]: {
            // bottom: '0'
        },
        [theme.breakpoints.up('lg')]: {
            right: '100px',
            left: 'auto',
            transform: 'translateX(0)',
            minWidth: '350px',
            maxWidth: '400px'
        },
        '& .btnWrapper': {
            display: 'flex'
        }
    },
    minimizedBoxBtn: {
        padding: '12px 0 12px 12px'
    },
    minimizedBoxTitle: {
        textTransform: 'capitalize'
    },
    paper: {
        position: 'relative'
    },
    root: {
        display: 'grid',
        placeContent: 'center',
        position: 'fixed',
        zIndex: '2',
        width: '100vw',
        height: '100vh',
        top: 0,
        left: 0,
        backgroundColor: 'rgba(0,0,0,.3)'
    },
    rootMinimized: {
        visibility: 'hidden',
        transform: 'translateX(-9999px)'
    },
    wrapWord: {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
    },

    '@keyframes blink': {
        '0%': {
            backgroundColor: theme.palette.secondary.dark
        },
        '10%': {
            backgroundColor: theme.palette.primary.main,
            color: 'white'
        },
        '80%': {
            backgroundColor: theme.palette.primary.main,
            color: 'white'
        },
        '100%': {
            backgroundColor: theme.palette.secondary.dark
        }
    }
}));

const Modal = ({
    classes,
    children,
    isActive,
    maxWidth = 'xs',
    minimized,
    onMinimize = () => {},
    open,
    onClose,
    title
}) => {
    const internalClasses = useStyles();

    const handleClose = (ev) => {
        if (ev) ev.stopPropagation();
        if (onClose) {
            if (minimized) onMinimize();
            onClose();
        }
    };

    if (!open) return null;

    return (
        <>
            <div
                className={clsx(internalClasses.root, classes?.root, minimized ? internalClasses.rootMinimized : null)}
                onClick={handleClose}
            >
                <Container maxWidth={maxWidth} onClick={(ev) => ev.stopPropagation()} className={internalClasses.paper}>
                    <div className={internalClasses.dialogControlBtns}>
                        <IconButton onClick={() => onMinimize()}>
                            <MinimizeIcon />
                        </IconButton>
                        <IconButton onClick={handleClose}>
                            <CloseIcon />
                        </IconButton>
                    </div>

                    {children}
                </Container>
            </div>

            {minimized && (
                <Paper
                    onClick={() => onMinimize()}
                    className={clsx(internalClasses.minimizedBox, isActive ? internalClasses.blink : null)}
                >
                    <Typography
                        variant="body1"
                        className={clsx(internalClasses.minimizedBoxTitle, internalClasses.wrapWord)}
                    >
                        {title}
                    </Typography>
                    <div className="btnWrapper">
                        <IconButton className={internalClasses.minimizedBoxBtn}>
                            <ExpandLessIcon fontSize="large" />
                        </IconButton>
                        <IconButton onClick={handleClose} className={internalClasses.minimizedBoxBtn}>
                            <CloseIcon />
                        </IconButton>
                    </div>
                </Paper>
            )}
        </>
    );
};

export default Modal;
