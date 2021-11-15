import React from 'react';
import { makeStyles } from '@material-ui/core';
import Modal from '@material-ui/core/Modal';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import OutlinedFlagRoundedIcon from '@material-ui/icons/OutlinedFlagRounded';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import SendIcon from '@material-ui/icons/Send';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        display: 'flex',
        alignItems: 'center',
        '& svg': {
            marginRight: '16px'
        }
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        '& label': {
            alignSelf: 'flex-start'
        }
    },
    textArea: {
        width: '100%',
        margin: '16px 0'
    },
    closeBtn: {
        position: 'absolute',
        top: 10,
        right: 10,
        '&:focus': {
            outline: 'none'
        }
    },
    submitBtn: {
        display: 'flex',
        alignItems: 'center',
        '& .MuiSvgIcon-root': {
            marginRight: '8px'
        }
    }
}));

const ReportItemModal = ({ open, onClose, onSubmit = () => {}, ...rest }) => {
    const classes = useStyles();

    const handleSubmit = (ev) => {
        ev?.preventDefault();
        onSubmit(ev);
    };

    return (
        <>
            <Modal className={classes.root} open={open} onClose={onClose}>
                <Container maxWidth="xs">
                    <Paper {...rest} component={Grid} container spacing={6}>
                        <Grid style={{ position: 'relative' }} item xs={12}>
                            <IconButton className={classes.closeBtn} onClick={onClose}>
                                <CloseOutlinedIcon />
                            </IconButton>
                            <Typography className={classes.title} variant="h5">
                                <OutlinedFlagRoundedIcon />
                                Report this Listing
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <form className={classes.form} onSubmit={handleSubmit}>
                                <label>Write Message</label>
                                <TextField
                                    multiline
                                    minRows="4"
                                    className={classes.textArea}
                                    variant="outlined"
                                    name="message"
                                    placeholder="What's wrong with this listing?"
                                    required
                                />

                                <Button className={classes.submitBtn} type="submit">
                                    <SendIcon />
                                    Send message
                                </Button>
                            </form>
                        </Grid>
                    </Paper>
                </Container>
            </Modal>
        </>
    );
};

export default ReportItemModal;
