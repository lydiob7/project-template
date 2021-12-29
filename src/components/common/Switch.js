import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';

const AntSwitch = withStyles((theme) => ({
    root: {
        width: '40px',
        height: '24px',
        padding: 0,
        display: 'flex'
    },
    switchBase: {
        padding: 2,
        color: theme.palette.grey[500],
        '&$checked': {
            transform: 'translateX(16px)',
            color: theme.palette.common.white,
            '& + $track': {
                opacity: 1,
                backgroundColor: theme.palette.primary.main,
                borderColor: theme.palette.primary.main
            }
        }
    },
    thumb: {
        width: '16px',
        height: '16px',
        margin: '2px',
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
    return <AntSwitch {...props} />;
};

export default CustomSwitch;
