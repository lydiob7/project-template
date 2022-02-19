import React from 'react';

import { withStyles, Switch } from '@material-ui/core';

const AntSwitch = withStyles((theme) => ({
    root: {
        width: 40,
        height: 24,
        padding: 0,
        display: 'flex'
    },
    switchBase: {
        padding: 2,
        color: theme.palette.grey[500],
        '&$checked': {
            transform: 'translateX(12px)',
            color: theme.palette.common.white,
            '& + $track': {
                opacity: 1,
                backgroundColor: theme.palette.primary.main,
                borderColor: theme.palette.primary.main
            }
        }
    },
    thumb: {
        width: '12px',
        height: '12px',
        boxShadow: 'none'
    },
    track: {
        border: `1px solid ${theme.palette.grey[500]}`,
        borderRadius: 1000,
        opacity: 1,
        backgroundColor: theme.palette.common.white
    },
    checked: {}
}))(Switch);

const CustomSwitch = ({ ...props }) => {
    return <AntSwitch size="small" {...props} />;
};

export default CustomSwitch;
