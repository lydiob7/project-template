import { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import { hideMessage } from 'store/messageSlice';

import { amber } from '@material-ui/core/colors';
import { IconButton, makeStyles, Snackbar, SnackbarContent, Typography } from '@material-ui/core';
import {
    CheckCircleOutline as CheckCircleOutlineIcon,
    CloseOutlined as CloseOutlinedIcon,
    ErrorOutline as ErrorOutlineIcon,
    InfoOutlined as InfoOutlinedIcon,
    ReportProblemOutlined as ReportProblemOutlinedIcon
} from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    headerFixed: {
        marginTop: '60px'
    },
    root: {},
    messageContainer: {
        display: 'flex',
        alignItems: 'center',
        '& .MuiTypography-root': {
            margin: '0 16px'
        }
    },
    success: {
        backgroundColor: theme.palette.primary.dark,
        color: '#FFFFFF'
    },
    error: {
        backgroundColor: theme.palette.error.dark,
        color: theme.palette.getContrastText(theme.palette.error.dark)
    },
    info: {
        backgroundColor: theme.palette.secondary.dark,
        color: '#FFFFFF'
    },
    warning: {
        backgroundColor: amber[600],
        color: '#FFFFFF'
    }
}));

const variantIcon = {
    success: CheckCircleOutlineIcon,
    warning: ReportProblemOutlinedIcon,
    error: ErrorOutlineIcon,
    info: InfoOutlinedIcon
};

function ToastMessage({ fixed }) {
    const dispatch = useDispatch();
    const state = useSelector(({ messages }) => messages.state);
    const options = useSelector(({ messages }) => messages.options);

    const classes = useStyles();

    const Icon = variantIcon[options.variant];

    return (
        <Snackbar
            {...options}
            open={state}
            onClose={() => dispatch(hideMessage())}
            classes={{
                root: clsx(classes.root, fixed && classes.headerFixed)
            }}
            ContentProps={{
                variant: 'body2',
                headlineMapping: {
                    body1: 'div',
                    body2: 'div'
                }
            }}
        >
            <SnackbarContent
                className={clsx(classes[options.variant])}
                message={
                    <div className={classes.messageContainer}>
                        {variantIcon[options.variant] && <Icon />}
                        <Typography>{options.message}</Typography>
                    </div>
                }
                action={[
                    <IconButton key="close" aria-label="Close" color="inherit" onClick={() => dispatch(hideMessage())}>
                        <CloseOutlinedIcon />
                    </IconButton>
                ]}
            />
        </Snackbar>
    );
}

export default memo(ToastMessage);
