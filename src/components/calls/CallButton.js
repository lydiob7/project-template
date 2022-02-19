import React from 'react';
import { useSelector } from 'react-redux';
import clsx from 'clsx';

import { makeStyles } from '@material-ui/core';
import { Phone as PhoneIcon } from '@material-ui/icons/Phone';

import { Button } from 'custom-components';

const useStyles = makeStyles((theme) => ({
    button: {
        fontSize: '1rem'
    },
    icon: {
        marginRight: '10px'
    },
    root: {}
}));

const CallButton = ({ className, ...props }) => {
    const classes = useStyles();

    const textProvider = useSelector(({ ui }) => ui.textContent.callModule);

    return (
        <div className={clsx(classes.root, className)} {...props}>
            <Button className={classes.button}>
                <PhoneIcon className={classes.icon} />
                {textProvider?.buttonText}
            </Button>
        </div>
    );
};

export default CallButton;
