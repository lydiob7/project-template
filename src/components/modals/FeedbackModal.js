import React from 'react';
import { makeStyles } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import ChatOutlinedIcon from '@material-ui/icons/ChatOutlined';
import Dialog from '@material-ui/core/Dialog';
import Toolbar from '@material-ui/core/Toolbar';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import Button from 'components/common/Button';

const useStyles = makeStyles((theme) => ({
    container: {},
    form: {
        display: 'flex',
        flexDirection: 'column',
        padding: '20px 40px',
        alignItems: 'flex-end'
    },
    textArea: {
        minWidth: '250px',
        maxWidth: '100%',
        margin: '16px 0 24px 0',
        [theme.breakpoints.up('md')]: {
            minWidth: '500px'
        }
    }
}));

const FeedbackModal = ({ onSubmit = () => {}, onClose, open, title }) => {
    const classes = useStyles();

    const handleSubmit = (ev) => {
        ev?.preventDefault();
        onSubmit(ev);
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm">
            <div className={classes.container}>
                {title && (
                    <AppBar position="static" elevation={0} color="secondary">
                        <Toolbar className="flex w-full">
                            <ChatOutlinedIcon style={{ marginRight: '20px' }} />
                            <Typography variant="subtitle1" color="inherit">
                                {title}
                            </Typography>
                        </Toolbar>
                    </AppBar>
                )}

                <form className={classes.form} onSubmit={handleSubmit}>
                    <TextField
                        multiline
                        label="Write a Feedback"
                        minRows="6"
                        className={classes.textArea}
                        variant="outlined"
                        name="message"
                        placeholder="Write some feedback for your past appointment"
                        required
                    />

                    <Button className={classes.submitBtn} type="submit">
                        Send message
                    </Button>
                </form>
            </div>
        </Dialog>
    );
};

export default FeedbackModal;
