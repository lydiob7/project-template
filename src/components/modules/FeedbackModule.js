import React, { useState } from 'react';
import clsx from 'clsx';

import { makeStyles } from '@material-ui/core';
import { ChatOutlined as ChatOutlinedIcon } from '@material-ui/icons';

import { Button, FeedbackModal } from 'custom-components';

const useStyles = makeStyles((theme) => ({
    icon: {
        marginRight: '5px'
    },
    root: {}
}));

const AppointmentFeedback = ({ buttonText, className, dialogTitle, disabled, onSubmit = () => {}, ...otherProps }) => {
    const classes = useStyles();

    const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);

    return (
        <div>
            <Button
                className={clsx(classes.root, className)}
                {...otherProps}
                color="secondary"
                onClick={(ev) => {
                    ev.stopPropagation();
                    setIsFeedbackModalOpen(true);
                }}
                disabled={disabled}
            >
                <ChatOutlinedIcon fontSize="small" className={classes.icon} />
                {buttonText}
            </Button>

            <FeedbackModal
                title={dialogTitle}
                onSubmit={onSubmit}
                open={isFeedbackModalOpen}
                onClose={() => setIsFeedbackModalOpen(false)}
            />
        </div>
    );
};

export default AppointmentFeedback;
