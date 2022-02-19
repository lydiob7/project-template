import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core';

import { CallButton, CallDialog } from 'custom-components';

const useStyles = makeStyles((theme) => ({
    root: {}
}));

const CallModule = ({ classes }) => {
    const internalClasses = useStyles();

    const [isCallModalOpen, setIsCallModalOpen] = useState(false);

    return (
        <div className={internalClasses.root}>
            <CallButton className={classes?.button} onClick={() => setIsCallModalOpen(true)} />
            <CallDialog open={isCallModalOpen} onClose={() => setIsCallModalOpen(false)} />
        </div>
    );
};

export default CallModule;
