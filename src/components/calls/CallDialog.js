import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import clsx from 'clsx';
import { useTimer } from 'use-timer';

import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import CallEndIcon from '@material-ui/icons/CallEnd';
import CallIcon from '@material-ui/icons/Call';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import MicNoneOutlinedIcon from '@material-ui/icons/MicNoneOutlined';
import MicOffOutlinedIcon from '@material-ui/icons/MicOffOutlined';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Typography from '@material-ui/core/Typography';

import { parsePath, parseSeconds } from 'utils/helpers';

const useStyles = makeStyles((theme) => ({
    actionButton: {
        margin: '0 5px',
        [theme.breakpoints.up('sm')]: {
            margin: '0 20px'
        }
    },
    assistantName: {
        margin: '40px 0 20px 0',
        fontWeight: '500',
        fontSize: '1.2rem'
    },
    avatar: {
        height: '30vh',
        width: '30vh',
        backgroundColor: theme.palette.background.paper,
        boxShadow: `0 0 1px ${theme.palette.primary.main}`,
        '& img': {
            height: '60%',
            width: 'auto'
        }
    },
    callButton: {
        color: theme.palette.background.paper
    },
    callTimeText: {},
    dialogContent: {
        marginBottom: '20px'
    },
    endCallBtn: {
        background: theme.palette.error.main,
        '&:hover': {
            background: theme.palette.error.dark
        }
    },
    root: {
        padding: '20px 0 40px 0',
        background: theme.palette.background.default,
        overflowY: 'scroll',
        [theme.breakpoints.up('md')]: {
            padding: '8vh 0'
        }
    },
    startCallBtn: {
        background: theme.palette.success.main,
        '&:hover': {
            background: theme.palette.success.dark
        }
    },
    text: {
        textAlign: 'center'
    },
    title: {
        marginBottom: '20px'
    }
}));

const CallDialog = ({ open, onClose = () => {} }) => {
    const classes = useStyles();
    const { time, start, pause, reset } = useTimer();

    const [isMicSilenced, setIsMicSilenced] = useState(false);
    const [isCallOngoing, setIsCallOngoing] = useState(false);
    const [isCalling, setIsCalling] = useState(false);

    const appLogo = useSelector(({ ui }) => ui.appInformation.appLogo);
    const text = useSelector(({ ui }) => ui.textContent?.callModule?.callDialog);

    const startCall = () => {
        reset();
        setIsCalling(true);
        setTimeout(() => {
            setIsCallOngoing(true);
            setIsCalling(false);
            start();
        }, 2000);
    };
    const endCall = () => {
        setIsCallOngoing(false);
        pause();
    };

    return (
        <Dialog
            open={open}
            onClose={() => {
                onClose();
                reset();
            }}
            fullWidth
            maxWidth="lg"
        >
            <Grid container className={classes.root}>
                <Grid item xs={12}>
                    <DialogContent className={classes.dialogContent}>
                        <Grid item xs={12}>
                            <Typography variant="h5" className={clsx(classes.text, classes.title)}>
                                {text?.title}
                            </Typography>
                        </Grid>
                        <Grid container item xs={12} justifyContent="center">
                            <Avatar className={classes.avatar} src={parsePath(appLogo)} />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body1" className={clsx(classes.text, classes.assistantName)}>
                                {text?.medicalAssistantName}
                            </Typography>
                            <Typography variant="body2" className={clsx(classes.text, classes.callTimeText)}>
                                {isCalling ? `${text?.calling}...` : parseSeconds(time)}
                            </Typography>
                        </Grid>
                    </DialogContent>
                </Grid>
                <Grid item container xs={12} justifyContent="center">
                    <DialogActions>
                        <Fab className={classes.actionButton} color="primary">
                            <MoreVertIcon />
                        </Fab>
                        {isMicSilenced ? (
                            <Fab
                                onClick={() => setIsMicSilenced(false)}
                                className={classes.actionButton}
                                color="primary"
                            >
                                <MicOffOutlinedIcon />
                            </Fab>
                        ) : (
                            <Fab
                                onClick={() => setIsMicSilenced(true)}
                                className={classes.actionButton}
                                color="primary"
                            >
                                <MicNoneOutlinedIcon />
                            </Fab>
                        )}
                        <Fab
                            onClick={startCall}
                            disabled={isCallOngoing || isCalling}
                            className={clsx(classes.actionButton, classes.startCallBtn)}
                        >
                            <CallIcon className={classes.callButton} />
                        </Fab>
                        <Fab
                            onClick={endCall}
                            disabled={!isCallOngoing && !isCalling}
                            className={clsx(classes.actionButton, classes.endCallBtn)}
                        >
                            <CallEndIcon className={classes.callButton} />
                        </Fab>
                    </DialogActions>
                </Grid>
            </Grid>
        </Dialog>
    );
};

export default CallDialog;
